import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Github, Twitter, Linkedin, Mail, ExternalLink, Settings } from "lucide-react";
import { getProjects, getBlogs, getSettings } from "@/lib/data";
export default function Index() {
    const settings = getSettings();
    const projects = getProjects();
    const blogs = getBlogs().filter((b) => b.published);
    const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
    const [activeCategory, setActiveCategory] = useState("All");
    const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);
    const featuredProjects = projects.filter((p) => p.featured);
    return (<div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <span className="font-heading font-bold text-xl text-foreground">{settings.name}</span>
          <div className="flex items-center gap-6">
            <a href="#projects" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="#blog" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Blog</a>
            <a href="#contact" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <Link to="/admin">
              <Button variant="ghost" size="icon"><Settings className="h-4 w-4"/></Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl text-center animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6 leading-tight">
            {settings.title}
          </h1>
          <p className="text-lg text-primary-foreground/70 font-body mb-8 max-w-xl mx-auto">
            {settings.bio}
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#projects">
              <Button className="accent-gradient text-accent-foreground font-body font-semibold px-6">
                View My Work <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
            </a>
            <a href="#contact">
              <Button 
                  variant="outline" 
                  className="border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 font-body"
                >
                  Get in Touch
              </Button>
            </a>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            {settings.socials.github && <a href={settings.socials.github} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"><Github className="h-5 w-5"/></a>}
            {settings.socials.twitter && <a href={settings.socials.twitter} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"><Twitter className="h-5 w-5"/></a>}
            {settings.socials.linkedin && <a href={settings.socials.linkedin} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"><Linkedin className="h-5 w-5"/></a>}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (<section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Featured Work</h2>
            <p className="text-muted-foreground font-body mb-10">Handpicked projects I'm most proud of</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (<Card key={project.id} className="card-hover overflow-hidden group">
                  <div className="h-48 bg-muted flex items-center justify-center">
                    {project.image ? (<img src={project.image} alt={project.title} className="w-full h-full object-cover"/>) : (<span className="text-muted-foreground/40 font-heading text-4xl">{project.title[0]}</span>)}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{project.category}</Badge>
                      <Badge className="accent-gradient text-accent-foreground text-xs">Featured</Badge>
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
                </Card>))}
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
            {filteredProjects.map((project) => (<Card key={project.id} className="card-hover overflow-hidden">
                <div className="h-40 bg-muted flex items-center justify-center">
                  {project.image ? (<img src={project.image} alt={project.title} className="w-full h-full object-cover"/>) : (<span className="text-muted-foreground/40 font-heading text-3xl">{project.title[0]}</span>)}
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="text-xs mb-2">{project.category}</Badge>
                  <h3 className="font-heading font-semibold mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{project.description}</p>
                </CardContent>
              </Card>))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Blog</h2>
          <p className="text-muted-foreground font-body mb-10">Thoughts, tutorials, and insights</p>
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map((post) => (<Card key={post.id} className="card-hover">
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

      {/* Contact */}
      <section id="contact" className="hero-section py-20 px-4">
        <div className="container mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">Let's Work Together</h2>
          <p className="text-primary-foreground/70 font-body mb-8">
            Have a project in mind? I'd love to hear about it.
          </p>
          <a href={`mailto:${settings.email}`}>
            <Button className="accent-gradient text-accent-foreground font-body font-semibold px-8">
              <Mail className="mr-2 h-4 w-4"/> Send an Email
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
