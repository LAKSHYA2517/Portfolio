import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Rocket, WandSparkles } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { getProjects, calculateProjectDNA } from "@/lib/data";

export default function NoveltyLab() {
  const projects = getProjects();
  const dnaProjects = projects.map((project) => ({
    project,
    dna: calculateProjectDNA(project),
  }));

  const topProject = [...dnaProjects].sort((a, b) => b.dna.noveltyScore - a.dna.noveltyScore)[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-heading font-bold">Novelty Lab</h2>
          <p className="text-muted-foreground">
            Unique feature: Project DNA scoring for creativity, complexity, impact, and execution.
          </p>
        </div>
        {topProject && (
          <div className="glass-panel rounded-xl px-4 py-3">
            <p className="text-xs text-muted-foreground">Most Innovative</p>
            <p className="text-sm font-semibold">{topProject.project.title}</p>
            <p className="text-xs text-accent">Score {topProject.dna.noveltyScore}/100</p>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-hover spotlight-card">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" /> Novelty Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {dnaProjects.length
                ? Math.round(
                    dnaProjects.reduce((sum, item) => sum + item.dna.noveltyScore, 0) / dnaProjects.length,
                  )
                : 0}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Across all projects</p>
          </CardContent>
        </Card>

        <Card className="card-hover spotlight-card">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Rocket className="h-4 w-4 text-accent" /> Featured Innovation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dnaProjects.filter((p) => p.project.featured).length}</p>
            <p className="text-xs text-muted-foreground mt-1">Featured projects</p>
          </CardContent>
        </Card>

        <Card className="card-hover spotlight-card">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <WandSparkles className="h-4 w-4 text-accent" /> Exploration Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dnaProjects.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Projects analyzed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {dnaProjects.map(({ project, dna }) => {
          const radarData = [
            { metric: "Creativity", value: dna.creativity },
            { metric: "Complexity", value: dna.complexity },
            { metric: "Impact", value: dna.impact },
            { metric: "Execution", value: dna.execution },
          ];

          return (
            <Card key={project.id} className="card-hover overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge className="accent-gradient text-accent-foreground">DNA {dna.noveltyScore}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{project.category}</p>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <Radar dataKey="value" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.35} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  <p className="text-sm"><span className="text-muted-foreground">Creativity:</span> {dna.creativity}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Complexity:</span> {dna.complexity}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Impact:</span> {dna.impact}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Execution:</span> {dna.execution}</p>
                  <p className="text-sm pt-1 text-muted-foreground">{dna.insight}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
