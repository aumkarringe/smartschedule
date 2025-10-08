import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCandidates } from "@/data/mockData";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-gradient">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track recruitment metrics and performance indicators with real-time insights
        </p>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pipeline Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="shadow-soft hover:shadow-strong transition-all overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Candidate Pipeline Distribution
                <motion.div
                  className="h-2 w-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </CardTitle>
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
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[8, 8, 0, 0]}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversion Rates */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="shadow-soft hover:shadow-strong transition-all overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                  <Bar 
                    dataKey="rate" 
                    fill="hsl(var(--success))" 
                    radius={[0, 8, 8, 0]}
                    animationDuration={1200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Time to Hire Trend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="shadow-soft hover:shadow-strong transition-all overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Position Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="shadow-soft hover:shadow-strong transition-all overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    animationDuration={1000}
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
        </motion.div>
      </div>

      {/* Key Metrics Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="shadow-soft hover:shadow-strong transition-all overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Key Performance Indicators
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              >
                <TrendingUp className="h-5 w-5 text-success" />
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                className="space-y-2"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-muted-foreground">Overall Conversion Rate</p>
                <motion.p 
                  className="text-4xl font-bold text-gradient"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.6 }}
                >
                  12.5%
                </motion.p>
                <p className="text-sm text-muted-foreground">
                  Applied to Hired ratio
                </p>
              </motion.div>
              <motion.div
                className="space-y-2"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-muted-foreground">Average Time to Hire</p>
                <motion.p 
                  className="text-4xl font-bold text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.7 }}
                >
                  18 days
                </motion.p>
                <p className="text-sm text-success font-medium">
                  ↓ 3 days better than target
                </p>
              </motion.div>
              <motion.div
                className="space-y-2"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-muted-foreground">Offer Acceptance Rate</p>
                <motion.p 
                  className="text-4xl font-bold text-accent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.8 }}
                >
                  85%
                </motion.p>
                <p className="text-sm text-success font-medium">
                  ↑ Above industry average
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const TrendingUp = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

export default Analytics;
