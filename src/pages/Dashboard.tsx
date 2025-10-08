import { Users, Calendar, TrendingUp, Clock } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCandidates, mockInterviews } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const Dashboard = () => {
  const stats = {
    totalCandidates: mockCandidates.length,
    activeInterviews: mockInterviews.filter((i) => i.status === "scheduled").length,
    offersExtended: mockCandidates.filter((c) => c.status === "offer").length,
    avgTimeToHire: "18 days",
  };

  const recentCandidates = mockCandidates.slice(0, 5);
  const upcomingInterviews = mockInterviews
    .filter((i) => i.status === "scheduled")
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const getStatusColor = (status: string) => {
    const colors = {
      applied: "bg-muted text-muted-foreground",
      screening: "bg-warning/10 text-warning",
      interview: "bg-primary/10 text-primary",
      offer: "bg-accent/10 text-accent",
      hired: "bg-success/10 text-success",
      rejected: "bg-destructive/10 text-destructive",
    };
    return colors[status as keyof typeof colors] || colors.applied;
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-gradient">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your recruitment pipeline.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Candidates"
          value={stats.totalCandidates}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          gradient
          index={0}
        />
        <StatsCard
          title="Active Interviews"
          value={stats.activeInterviews}
          change="Scheduled this week"
          changeType="neutral"
          icon={Calendar}
          index={1}
        />
        <StatsCard
          title="Offers Extended"
          value={stats.offersExtended}
          change="+2 this week"
          changeType="positive"
          icon={TrendingUp}
          index={2}
        />
        <StatsCard
          title="Avg Time to Hire"
          value={stats.avgTimeToHire}
          change="-3 days improvement"
          changeType="positive"
          icon={Clock}
          index={3}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Candidates */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-soft hover:shadow-strong transition-all overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Recent Candidates
                <motion.div
                  className="h-2 w-2 rounded-full bg-success"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCandidates.map((candidate, index) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    className="flex items-center justify-between rounded-lg border border-border bg-gradient-card p-4 transition-all hover:shadow-soft cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-semibold"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {candidate.name.split(" ").map((n) => n[0]).join("")}
                      </motion.div>
                      <div>
                        <p className="font-semibold">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {candidate.position}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Interviews */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-soft hover:shadow-strong transition-all overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Upcoming Interviews
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                >
                  <Calendar className="h-4 w-4 text-primary" />
                </motion.div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.length > 0 ? (
                  upcomingInterviews.map((interview, index) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: -8, transition: { duration: 0.2 } }}
                      className="rounded-lg border border-border bg-gradient-card p-4 transition-all hover:shadow-soft cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-semibold">
                            {interview.candidateName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {interview.position}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">
                              {formatDistanceToNow(interview.date, {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge className="bg-primary/10 text-primary">
                            {interview.type}
                          </Badge>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-8"
                  >
                    No upcoming interviews scheduled
                  </motion.p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
