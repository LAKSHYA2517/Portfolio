import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
const monthlyViews = [
    { month: "Jan", views: 1200 }, { month: "Feb", views: 1800 }, { month: "Mar", views: 2100 },
    { month: "Apr", views: 1900 }, { month: "May", views: 2400 }, { month: "Jun", views: 2847 },
];
const weeklyVisitors = [
    { day: "Mon", visitors: 120 }, { day: "Tue", visitors: 180 }, { day: "Wed", visitors: 150 },
    { day: "Thu", visitors: 210 }, { day: "Fri", visitors: 190 }, { day: "Sat", visitors: 90 }, { day: "Sun", visitors: 70 },
];
const trafficSources = [
    { name: "Direct", value: 35 }, { name: "Social", value: 30 },
    { name: "Search", value: 25 }, { name: "Referral", value: 10 },
];
const COLORS = ["hsl(38, 92%, 50%)", "hsl(220, 25%, 15%)", "hsl(220, 15%, 60%)", "hsl(220, 15%, 80%)"];
export default function Analytics() {
    return (<div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-heading font-bold">Analytics</h2>
        <p className="text-muted-foreground">Track your portfolio performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Monthly Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)"/>
                <XAxis dataKey="month" tick={{ fontSize: 12 }}/>
                <YAxis tick={{ fontSize: 12 }}/>
                <Tooltip />
                <Bar dataKey="views" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Weekly Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyVisitors}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)"/>
                <XAxis dataKey="day" tick={{ fontSize: 12 }}/>
                <YAxis tick={{ fontSize: 12 }}/>
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="hsl(220, 25%, 15%)" strokeWidth={2} dot={{ fill: "hsl(38, 92%, 50%)" }}/>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={trafficSources} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                  {trafficSources.map((_, i) => <Cell key={i} fill={COLORS[i]}/>)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Top Pages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
            { page: "/", views: 1240 }, { page: "/projects/e-commerce", views: 580 },
            { page: "/blog/scalable-react", views: 420 }, { page: "/projects/task-management", views: 310 },
            { page: "/blog/clean-code", views: 290 },
        ].map((item) => (<div key={item.page} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="text-sm font-body">{item.page}</span>
                <span className="text-sm font-medium text-accent">{item.views}</span>
              </div>))}
          </CardContent>
        </Card>
      </div>
    </div>);
}
