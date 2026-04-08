import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Github, Twitter, Linkedin, Mail, ExternalLink, Settings, Sparkles, BrainCircuit, Rocket, WandSparkles, Cpu } from "lucide-react";
import { getProjects, getBlogs, getSettings, calculateProjectDNA } from "@/lib/data";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { toast } from "sonner";
export default function Index() {
    const settings = getSettings();
    const projects = getProjects();
    const blogs = getBlogs().filter((b) => b.published);
    const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
    const [activeCategory, setActiveCategory] = useState("All");
    const [messageForm, setMessageForm] = useState({
      name: "",
      email: "",
      message: "",
    });
    const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);
    const featuredProjects = projects.filter((p) => p.featured);
    const dnaProjects = projects.map((project) => ({
        project,
        dna: calculateProjectDNA(project),
    }));
    const noveltyLeaders = [...dnaProjects].sort((a, b) => b.dna.noveltyScore - a.dna.noveltyScore).slice(0, 3);
    const techFrequency = projects.reduce((acc, project) => {
      (project.tags || []).forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    const techStack = Object.entries(techFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
    const currentHour = new Date().getHours();
    const dayMood = currentHour < 12 ? "Morning Build Energy" : currentHour < 18 ? "Afternoon Product Sprint" : "Night Creative Lab";
    const emailSubject = encodeURIComponent("Collaboration Opportunity");
    const emailBody = encodeURIComponent("Hi Lakshya,%0A%0AI saw your portfolio and would like to discuss a collaboration/project.%0A%0AProject details:%0ATimeline:%0ABudget:%0A%0AThanks,");
    const contactEmailHref = `mailto:${settings.email}?subject=${emailSubject}&body=${emailBody}`;

    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const y = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    const handleDummyMessageSubmit = (e) => {
      e.preventDefault();
      if (!messageForm.name.trim() || !messageForm.email.trim() || !messageForm.message.trim()) {
        toast.error("Please fill all fields before sending.");
        return;
      }

      toast.success("Demo message sent! (No backend connected)");
      setMessageForm({ name: "", email: "", message: "" });
    };

    return (<div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b glass-panel">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <span className="font-heading font-bold text-xl text-foreground text-shimmer">{settings.name}</span>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("blog")}
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
            <ThemeModeToggle />
            <Link to="/admin">
              <Button variant="ghost" size="icon"><Settings className="h-4 w-4"/></Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl animate-slide-up glass-panel rounded-[2rem] py-12 px-6 md:px-12 spotlight-card relative overflow-hidden">
          <div className="absolute -top-16 -left-16 h-44 w-44 rounded-full bg-primary/15 blur-2xl" />
          <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-accent/20 blur-2xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <Badge className="mb-5 accent-gradient text-accent-foreground">
                <Sparkles className="h-3.5 w-3.5 mr-1" /> {dayMood}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
                {settings.title}
              </h1>
              <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl">
                {settings.bio}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href={contactEmailHref}>
                  <Button className="accent-gradient text-accent-foreground font-body font-semibold px-6 mesh-button">
                    Collaborate With Me<ArrowRight className="ml-2 h-4 w-4"/>
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-4 mt-8">
                {settings.socials.github && <a href={settings.socials.github} className="text-muted-foreground hover:text-foreground transition-colors"><Github className="h-5 w-5"/></a>}
                {settings.socials.twitter && <a href={settings.socials.twitter} className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-5 w-5"/></a>}
                {settings.socials.linkedin && <a href={settings.socials.linkedin} className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="h-5 w-5"/></a>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Out-of-Box Novelty */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Project DNA Constellation</h2>
            <p className="text-muted-foreground font-body">
              Out-of-the-box feature: each project is treated like a product organism and mapped by Creativity, Complexity, Impact, and Execution.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {noveltyLeaders.map(({ project, dna }, index) => {
                const ring = `conic-gradient(hsl(var(--accent)) ${dna.noveltyScore}%, hsl(var(--muted)) ${dna.noveltyScore}% 100%)`;
                return (<Card key={project.id} className="card-hover neu-surface overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Rank #{index + 1}</p>
                      <h3 className="font-heading font-semibold text-lg leading-tight">{project.title}</h3>
                    </div>
                    <div className="h-14 w-14 rounded-full p-[6px]" style={{ background: ring }}>
                      <div className="h-full w-full rounded-full neu-inset flex items-center justify-center text-xs font-semibold">
                        {dna.noveltyScore}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="neu-inset p-2 rounded-lg">Creativity: {dna.creativity}</div>
                    <div className="neu-inset p-2 rounded-lg">Complexity: {dna.complexity}</div>
                    <div className="neu-inset p-2 rounded-lg">Impact: {dna.impact}</div>
                    <div className="neu-inset p-2 rounded-lg">Execution: {dna.execution}</div>
                  </div>

                  <p className="text-xs text-muted-foreground">{dna.insight}</p>
                </CardContent>
              </Card>);
            })}
          </div>
        </div>
      </section>

      {/* Creative Process */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">My Creative Engine</h2>
          <p className="text-muted-foreground font-body mb-8">
            How I move from idea to polished product with measurable outcome.
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
                {
                    title: "Decode Problem",
                    icon: BrainCircuit,
                    text: "I identify hidden constraints and convert them into design opportunities.",
                },
                {
                    title: "Build Core",
                    icon: Rocket,
                    text: "I ship a fast MVP with a stable architecture first, then optimize.",
                },
                {
                    title: "Add Delight",
                    icon: WandSparkles,
                    text: "I add visual identity, micro-interactions, and memorable details.",
                },
                {
                    title: "Scale Impact",
                    icon: Sparkles,
                    text: "I analyze behavior and iterate using data, not assumptions.",
                },
            ].map((step) => (<Card key={step.title} className="card-hover neu-surface">
                <CardContent className="p-5">
                  <div className="h-10 w-10 rounded-xl neu-inset flex items-center justify-center mb-4">
                    <step.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </CardContent>
              </Card>))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (<section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Featured Work</h2>
            <p className="text-muted-foreground font-body mb-10">Handpicked projects I'm most proud of</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => {
                const dna = calculateProjectDNA(project);
                return (<Card key={project.id} className="card-hover overflow-hidden group neu-surface">
                  <div className="h-48 bg-muted flex items-center justify-center">
                    {project.image ? (<img src={project.image} alt={project.title} className="w-full h-full object-cover"/>) : (<span className="text-muted-foreground/40 font-heading text-4xl">{project.title[0]}</span>)}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{project.category}</Badge>
                      <Badge className="accent-gradient text-accent-foreground text-xs">Featured</Badge>
                      <Badge variant="secondary" className="text-xs">Novelty {dna.noveltyScore}</Badge>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground font-body mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                    </div>
                    {project.link && (<a href={project.link} className="inline-flex items-center text-sm font-body text-accent hover:underline">
                        View Project <ExternalLink className="ml-1 h-3 w-3"/>
                      </a>)}
                  </CardContent>
                </Card>);
            })}
            </div>
          </div>
        </section>)}

      {/* All Projects */}
      <section id="projects" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">All Projects</h2>
          <p className="text-muted-foreground font-body mb-8">Browse by category</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (<Button key={cat} variant={activeCategory === cat ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(cat)} className="font-body">
                {cat}
              </Button>))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
                const dna = calculateProjectDNA(project);
                return (<Card key={project.id} className="card-hover overflow-hidden neu-surface">
                <div className="h-40 bg-muted flex items-center justify-center">
                  {project.image ? (<img src={project.image} alt={project.title} className="w-full h-full object-cover"/>) : (<span className="text-muted-foreground/40 font-heading text-3xl">{project.title[0]}</span>)}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{project.category}</Badge>
                    <Badge variant="secondary" className="text-xs">DNA {dna.noveltyScore}</Badge>
                  </div>
                  <h3 className="font-heading font-semibold mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{project.description}</p>
                </CardContent>
              </Card>);
            })}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Blog</h2>
          <p className="text-muted-foreground font-body mb-10">Thoughts, tutorials, and insights</p>
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map((post) => (<Card key={post.id} className="card-hover neu-surface">
                <CardContent className="p-6">
                  <p className="text-xs text-muted-foreground mb-2">{post.createdAt}</p>
                  <h3 className="font-heading font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground font-body mb-4">{post.excerpt}</p>
                  <span className="text-sm font-body text-accent hover:underline cursor-pointer inline-flex items-center">
                    Read more <ArrowRight className="ml-1 h-3 w-3"/>
                  </span>
                </CardContent>
              </Card>))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="h-5 w-5 text-accent" />
            <h2 className="text-3xl font-heading font-bold text-foreground">Tech Stack</h2>
          </div>
          <p className="text-muted-foreground font-body mb-8">
            Technologies extracted from real project data in this portfolio.
          </p>

          {techStack.length > 0 ? (<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {techStack.map((tech) => (<Card key={tech.name} className="card-hover neu-surface">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{tech.name}</h3>
                      <Badge variant="secondary">{tech.count}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Used in {tech.count} project{tech.count > 1 ? "s" : ""}</p>
                  </CardContent>
                </Card>))}
            </div>) : (<div className="neu-surface p-4 rounded-lg text-sm text-muted-foreground">No tech tags found yet. Add tags in admin projects to build your stack list.</div>)}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="hero-section py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">Let's Work Together</h2>
          <p className="text-primary-foreground/70 font-body mb-8">
            Have a project in mind? I'd love to hear about it.
          </p>

          <form onSubmit={handleDummyMessageSubmit} className="neu-surface p-5 md:p-6 rounded-2xl text-left space-y-4 mb-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={messageForm.name}
                  onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Your Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={messageForm.email}
                  onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-muted-foreground">Message</label>
              <textarea
                rows={4}
                placeholder="Write your project idea here..."
                value={messageForm.message}
                onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                className="w-full p-3 rounded-lg"
              />
            </div>

            <Button type="submit" className="w-full accent-gradient text-accent-foreground font-body font-semibold">
              Send
            </Button>
            <p className="text-xs text-muted-foreground text-center">This is a dummy form for demonstration only.</p>
          </form>

          <a href={contactEmailHref}>
            <Button variant="outline" className="font-body font-semibold px-8">
              <Mail className="mr-2 h-4 w-4"/> Send Real Email
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-body">© 2024 {settings.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {settings.socials.github && <a href={settings.socials.github} className="text-muted-foreground hover:text-foreground transition-colors"><Github className="h-4 w-4"/></a>}
            {settings.socials.twitter && <a href={settings.socials.twitter} className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-4 w-4"/></a>}
            {settings.socials.linkedin && <a href={settings.socials.linkedin} className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="h-4 w-4"/></a>}
          </div>
        </div>
      </footer>
    </div>);
}
