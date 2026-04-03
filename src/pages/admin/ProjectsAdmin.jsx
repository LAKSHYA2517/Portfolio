import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getProjects, saveProjects, generateId } from "@/lib/data";
import { toast } from "sonner";
const CATEGORIES = ["Web App", "Mobile", "Design", "API", "Open Source"];
const emptyProject = {
    title: "", description: "", content: "", category: "Web App",
    image: "", tags: [], link: "", featured: false,
};
export default function ProjectsAdmin() {
    const [projects, setProjects] = useState(getProjects);
    const [editing, setEditing] = useState(null);
    const [open, setOpen] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const handleSave = () => {
        if (!editing?.title?.trim()) {
            toast.error("Title is required");
            return;
        }
        const now = new Date().toISOString().split("T")[0];
        let updated;
        if (editing.id) {
            updated = projects.map((p) => p.id === editing.id ? { ...p, ...editing, updatedAt: now } : p);
        }
        else {
            const newProject = { ...emptyProject, ...editing, id: generateId(), createdAt: now, updatedAt: now };
            updated = [newProject, ...projects];
        }
        saveProjects(updated);
        setProjects(updated);
        setOpen(false);
        setEditing(null);
        toast.success(editing.id ? "Project updated" : "Project created");
    };
    const handleDelete = (id) => {
        const updated = projects.filter((p) => p.id !== id);
        saveProjects(updated);
        setProjects(updated);
        toast.success("Project deleted");
    };
    const addTag = () => {
        if (tagInput.trim() && editing) {
            setEditing({ ...editing, tags: [...(editing.tags || []), tagInput.trim()] });
            setTagInput("");
        }
    };
    const removeTag = (index) => {
        if (editing) {
            setEditing({ ...editing, tags: (editing.tags || []).filter((_, i) => i !== index) });
        }
    };
    return (<div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold">Projects</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditing({ ...emptyProject }); setTagInput(""); }}>
              <Plus className="mr-2 h-4 w-4"/> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading">{editing?.id ? "Edit" : "New"} Project</DialogTitle>
            </DialogHeader>
            {editing && (<div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Title</Label>
                    <Input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}/>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={editing.category || "Web App"} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Input value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })}/>
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea rows={5} value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })}/>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Image URL</Label>
                    <Input value={editing.image || ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })}/>
                  </div>
                  <div>
                    <Label>Link</Label>
                    <Input value={editing.link || ""} onChange={(e) => setEditing({ ...editing, link: e.target.value })}/>
                  </div>
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add a tag..."/>
                    <Button type="button" variant="secondary" onClick={addTag}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(editing.tags || []).map((tag, i) => (<Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => removeTag(i)}>
                        {tag} ×
                      </Badge>))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editing.featured || false} onCheckedChange={(v) => setEditing({ ...editing, featured: v })}/>
                  <Label>Featured project</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </div>)}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (<Card key={project.id} className="card-hover">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-semibold">{project.title}</h3>
                  {project.featured && <Badge className="accent-gradient text-accent-foreground">Featured</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{project.category}</Badge>
                  {project.tags.slice(0, 3).map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button variant="ghost" size="icon" onClick={() => { setEditing(project); setTagInput(""); setOpen(true); }}>
                  <Pencil className="h-4 w-4"/>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                  <Trash2 className="h-4 w-4 text-destructive"/>
                </Button>
              </div>
            </CardContent>
          </Card>))}
      </div>
    </div>);
}
