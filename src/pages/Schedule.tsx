import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockInterviews } from "@/data/mockData";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { Calendar, Clock, Video, Phone, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Schedule = () => {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getInterviewsForDay = (day: Date) => {
    return mockInterviews.filter(
      (interview) =>
        interview.status === "scheduled" && isSameDay(interview.date, day)
    );
  };

  const getInterviewIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video;
      case "phone":
        return Phone;
      case "onsite":
        return Building;
      default:
        return Calendar;
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      video: "bg-primary/10 text-primary border-primary/20",
      phone: "bg-accent/10 text-accent border-accent/20",
      onsite: "bg-success/10 text-success border-success/20",
      technical: "bg-warning/10 text-warning border-warning/20",
    };
    return colors[type as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-gradient">Interview Schedule</h1>
        <p className="text-muted-foreground mt-2">
          Manage and view all scheduled interviews with interactive calendar
        </p>
      </motion.div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day, dayIndex) => {
          const dayInterviews = getInterviewsForDay(day);
          const isToday = isSameDay(day, today);

          return (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: dayIndex * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card
                className={cn(
                  "shadow-soft transition-all hover:shadow-strong relative overflow-hidden group",
                  isToday && "ring-2 ring-primary animate-glow"
                )}
              >
                {isToday && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-primary opacity-5"
                    animate={{ opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">
                    <div className="flex flex-col gap-1">
                      <motion.span 
                        className="text-muted-foreground font-normal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: dayIndex * 0.05 + 0.1 }}
                      >
                        {format(day, "EEE")}
                      </motion.span>
                      <motion.span
                        className={cn(
                          "text-2xl font-bold",
                          isToday && "text-gradient"
                        )}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          delay: dayIndex * 0.05 + 0.2,
                          stiffness: 200
                        }}
                      >
                        {format(day, "d")}
                      </motion.span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {dayInterviews.length > 0 ? (
                    dayInterviews.map((interview, index) => {
                      const Icon = getInterviewIcon(interview.type);
                      return (
                        <motion.div
                          key={interview.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: dayIndex * 0.05 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="rounded-lg border border-border bg-gradient-card p-3 space-y-2 transition-all hover:shadow-soft cursor-pointer relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          
                          <div className="flex items-start justify-between gap-2 relative z-10">
                            <p className="text-sm font-semibold line-clamp-2">
                              {interview.candidateName}
                            </p>
                            <Badge className={cn("text-xs shrink-0 border", getTypeColor(interview.type))}>
                              <Icon className="h-3 w-3 mr-1" />
                              {interview.type}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-xs text-muted-foreground relative z-10">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{format(interview.date, "HH:mm")}</span>
                              <span>({interview.duration}m)</span>
                            </div>
                            <p className="line-clamp-1">{interview.position}</p>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      className="text-xs text-muted-foreground text-center py-4"
                    >
                      No interviews
                    </motion.p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* All Upcoming Interviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="shadow-soft hover:shadow-strong transition-all relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              All Upcoming Interviews
              <motion.div
                className="h-2 w-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockInterviews
                .filter((i) => i.status === "scheduled")
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((interview, index) => {
                  const Icon = getInterviewIcon(interview.type);
                  return (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 8 }}
                      className="flex items-start gap-4 rounded-lg border border-border bg-gradient-card p-4 transition-all hover:shadow-medium cursor-pointer relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      <motion.div 
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 relative z-10"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div className="flex-1 space-y-2 relative z-10">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold">{interview.candidateName}</p>
                            <p className="text-sm text-muted-foreground">
                              {interview.position}
                            </p>
                          </div>
                          <Badge className={cn("border", getTypeColor(interview.type))}>
                            {interview.type}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{format(interview.date, "MMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>
                              {format(interview.date, "HH:mm")} ({interview.duration}m)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Interviewers:
                          </span>
                          {interview.interviewers.map((interviewer, i) => (
                            <motion.div
                              key={interviewer}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                            >
                              <Badge variant="secondary" className="text-xs">
                                {interviewer}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Schedule;
