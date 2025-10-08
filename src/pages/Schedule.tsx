import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockInterviews } from "@/data/mockData";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { Calendar, Clock, MapPin, Video, Phone, Building } from "lucide-react";
import { cn } from "@/lib/utils";

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
      video: "bg-primary/10 text-primary",
      phone: "bg-accent/10 text-accent",
      onsite: "bg-success/10 text-success",
      technical: "bg-warning/10 text-warning",
    };
    return colors[type as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Interview Schedule</h1>
        <p className="text-muted-foreground mt-2">
          Manage and view all scheduled interviews
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const dayInterviews = getInterviewsForDay(day);
          const isToday = isSameDay(day, today);

          return (
            <Card
              key={day.toISOString()}
              className={cn(
                "shadow-soft transition-all hover:shadow-medium",
                isToday && "ring-2 ring-primary"
              )}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground font-normal">
                      {format(day, "EEE")}
                    </span>
                    <span
                      className={cn(
                        "text-2xl font-bold",
                        isToday && "text-primary"
                      )}
                    >
                      {format(day, "d")}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {dayInterviews.length > 0 ? (
                  dayInterviews.map((interview) => {
                    const Icon = getInterviewIcon(interview.type);
                    return (
                      <div
                        key={interview.id}
                        className="rounded-lg border border-border bg-gradient-card p-3 space-y-2 transition-all hover:shadow-soft"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold line-clamp-2">
                            {interview.candidateName}
                          </p>
                          <Badge className={cn("text-xs shrink-0", getTypeColor(interview.type))}>
                            <Icon className="h-3 w-3 mr-1" />
                            {interview.type}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{format(interview.date, "HH:mm")}</span>
                            <span>({interview.duration}m)</span>
                          </div>
                          <p className="line-clamp-1">{interview.position}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    No interviews
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* All Upcoming Interviews */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>All Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockInterviews
              .filter((i) => i.status === "scheduled")
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((interview) => {
                const Icon = getInterviewIcon(interview.type);
                return (
                  <div
                    key={interview.id}
                    className="flex items-start gap-4 rounded-lg border border-border bg-gradient-card p-4 transition-all hover:shadow-soft"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold">{interview.candidateName}</p>
                          <p className="text-sm text-muted-foreground">
                            {interview.position}
                          </p>
                        </div>
                        <Badge className={getTypeColor(interview.type)}>
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
                        {interview.interviewers.map((interviewer) => (
                          <Badge key={interviewer} variant="secondary" className="text-xs">
                            {interviewer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;
