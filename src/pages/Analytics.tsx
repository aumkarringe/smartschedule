import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCandidates } from "@/data/mockData";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  // Pipeline distribution data
  const pipelineData = [
    { status: "Applied", count: mockCandidates.filter((c) => c.status === "applied").length },
    { status: "Screening", count: mockCandidates.filter((c) => c.status === "screening").length },
    { status: "Interview", count: mockCandidates.filter((c) => c.status === "interview").length },
    { status: "Offer", count: mockCandidates.filter((c) => c.status === "offer").length },
    { status: "Hired", count: mockCandidates.filter((c) => c.status === "hired").length },
  ];

  // Conversion rates (mock data)
  const conversionData = [
    { stage: "Applied → Screening", rate: 65 },
    { stage: "Screening → Interview", rate: 45 },
    { stage: "Interview → Offer", rate: 30 },
    { stage: "Offer → Hired", rate: 85 },
  ];

  // Time to hire trend (mock data)
  const timeToHireData = [
    { month: "Aug", days: 22 },
    { month: "Sep", days: 20 },
    { month: "Oct", days: 19 },
    { month: "Nov", days: 18 },
    { month: "Dec", days: 17 },
    { month: "Jan", days: 18 },
  ];

  // Position distribution
  const positionData = [
    { name: "Frontend", value: 2, color: "hsl(var(--primary))" },
    { name: "Backend", value: 1, color: "hsl(var(--accent))" },
    { name: "Full Stack", value: 1, color: "hsl(var(--success))" },
    { name: "Design", value: 1, color: "hsl(var(--warning))" },
    { name: "Product", value: 1, color: "hsl(262 83% 58%)" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track recruitment metrics and performance indicators
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pipeline Distribution */}
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle>Candidate Pipeline Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="status"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Rates */}
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle>Stage Conversion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  type="number"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  unit="%"
                />
                <YAxis
                  type="category"
                  dataKey="stage"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  width={150}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="rate" fill="hsl(var(--success))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Time to Hire Trend */}
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle>Time to Hire Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeToHireData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="days"
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--accent))", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Position Distribution */}
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle>Candidates by Position</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={positionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {positionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Summary */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Overall Conversion Rate</p>
              <p className="text-3xl font-bold text-success">12.5%</p>
              <p className="text-sm text-muted-foreground">
                Applied to Hired ratio
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Average Time to Hire</p>
              <p className="text-3xl font-bold text-primary">18 days</p>
              <p className="text-sm text-muted-foreground">
                3 days better than target
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Offer Acceptance Rate</p>
              <p className="text-3xl font-bold text-accent">85%</p>
              <p className="text-sm text-muted-foreground">
                Above industry average
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
