import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, FileText, Eye, TrendingUp } from "lucide-react";
import { getProjects, getBlogs } from "@/lib/data";
export default function Dashboard() {
    const projects = getProjects();
    const blogs = getBlogs();
    const publishedBlogs = blogs.filter((b) => b.published);
    const stats = [
        { label: "Total Projects", value: projects.length, icon: FolderOpen, change: "+2 this month" },
        { label: "Blog Posts", value: publishedBlogs.length, icon: FileText, change: "+1 this week" },
        { label: "Page Views", value: "2,847", icon: Eye, change: "+12% vs last month" },
        { label: "Engagement", value: "68%", icon: TrendingUp, change: "+5% vs last month" },
    ];
    return (<div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground font-body">Welcome back! Here's an overview of your portfolio.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (<Card key={stat.label} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-body font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-accent"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {projects.slice(0, 3).map((p) => (<div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium font-body text-sm">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                </div>
                <span className="text-xs text-muted-foreground">{p.createdAt}</span>
              </div>))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {blogs.slice(0, 3).map((b) => (<div key={b.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium font-body text-sm">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.published ? "Published" : "Draft"}</p>
                </div>
                <span className="text-xs text-muted-foreground">{b.createdAt}</span>
              </div>))}
          </CardContent>
        </Card>
      </div>
    </div>);
}
