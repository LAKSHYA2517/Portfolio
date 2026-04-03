import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getBlogs, saveBlogs, generateId } from "@/lib/data";
import { toast } from "sonner";
const emptyBlog = {
    title: "", excerpt: "", content: "", coverImage: "", published: false,
};
export default function BlogsAdmin() {
    const [blogs, setBlogs] = useState(getBlogs);
    const [editing, setEditing] = useState(null);
    const [open, setOpen] = useState(false);
    const handleSave = () => {
        if (!editing?.title?.trim()) {
            toast.error("Title is required");
            return;
        }
        const now = new Date().toISOString().split("T")[0];
        let updated;
        if (editing.id) {
            updated = blogs.map((b) => b.id === editing.id ? { ...b, ...editing, updatedAt: now } : b);
        }
        else {
            const newBlog = { ...emptyBlog, ...editing, id: generateId(), createdAt: now, updatedAt: now };
            updated = [newBlog, ...blogs];
        }
        saveBlogs(updated);
        setBlogs(updated);
        setOpen(false);
        setEditing(null);
        toast.success(editing.id ? "Blog post updated" : "Blog post created");
    };
    const handleDelete = (id) => {
        const updated = blogs.filter((b) => b.id !== id);
        saveBlogs(updated);
        setBlogs(updated);
        toast.success("Blog post deleted");
    };
    return (<div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing({ ...emptyBlog })}>
              <Plus className="mr-2 h-4 w-4"/> New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading">{editing?.id ? "Edit" : "New"} Blog Post</DialogTitle>
            </DialogHeader>
            {editing && (<div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}/>
                </div>
                <div>
                  <Label>Excerpt</Label>
                  <Input value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}/>
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea rows={10} value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })}/>
                </div>
                <div>
                  <Label>Cover Image URL</Label>
                  <Input value={editing.coverImage || ""} onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}/>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editing.published || false} onCheckedChange={(v) => setEditing({ ...editing, published: v })}/>
                  <Label>Published</Label>
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
        {blogs.map((blog) => (<Card key={blog.id} className="card-hover">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-semibold">{blog.title}</h3>
                  <Badge variant={blog.published ? "default" : "secondary"}>
                    {blog.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{blog.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-1">{blog.createdAt}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button variant="ghost" size="icon" onClick={() => { setEditing(blog); setOpen(true); }}>
                  <Pencil className="h-4 w-4"/>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)}>
                  <Trash2 className="h-4 w-4 text-destructive"/>
                </Button>
              </div>
            </CardContent>
          </Card>))}
      </div>
    </div>);
}
