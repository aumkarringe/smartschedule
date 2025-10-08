import { Users, Calendar, TrendingUp, Clock } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCandidates, mockInterviews } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

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
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your recruitment pipeline.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Candidates"
          value={stats.totalCandidates}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          gradient
        />
        <StatsCard
          title="Active Interviews"
          value={stats.activeInterviews}
          change="Scheduled this week"
          changeType="neutral"
          icon={Calendar}
        />
        <StatsCard
          title="Offers Extended"
          value={stats.offersExtended}
          change="+2 this week"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatsCard
          title="Avg Time to Hire"
          value={stats.avgTimeToHire}
          change="-3 days improvement"
          changeType="positive"
          icon={Clock}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Candidates */}
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle>Recent Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-gradient-card p-4 transition-all hover:shadow-soft"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      {candidate.name.split(" ").map((n) => n[0]).join("")}
                    </div>
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.length > 0 ? (
                upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="rounded-lg border border-border bg-gradient-card p-4 transition-all hover:shadow-soft"
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
                      <Badge className="bg-primary/10 text-primary">
                        {interview.type}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No upcoming interviews scheduled
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
