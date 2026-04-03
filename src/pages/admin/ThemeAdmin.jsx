import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getSettings, saveSettings } from "@/lib/data";
import { toast } from "sonner";
export default function ThemeAdmin() {
    const [settings, setSettings] = useState(getSettings);
    const handleSave = () => {
        saveSettings(settings);
        toast.success("Settings saved!");
    };
    return (<div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h2 className="text-2xl font-heading font-bold">Theme & Settings</h2>
        <p className="text-muted-foreground">Customize your portfolio appearance and info</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input value={settings.name} onChange={(e) => setSettings({ ...settings, name: e.target.value })}/>
            </div>
            <div>
              <Label>Title</Label>
              <Input value={settings.title} onChange={(e) => setSettings({ ...settings, title: e.target.value })}/>
            </div>
          </div>
          <div>
            <Label>Bio</Label>
            <Textarea rows={3} value={settings.bio} onChange={(e) => setSettings({ ...settings, bio: e.target.value })}/>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Email</Label>
              <Input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })}/>
            </div>
            <div>
              <Label>Avatar URL</Label>
              <Input value={settings.avatar} onChange={(e) => setSettings({ ...settings, avatar: e.target.value })}/>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>GitHub</Label>
            <Input value={settings.socials.github || ""} onChange={(e) => setSettings({ ...settings, socials: { ...settings.socials, github: e.target.value } })}/>
          </div>
          <div>
            <Label>Twitter</Label>
            <Input value={settings.socials.twitter || ""} onChange={(e) => setSettings({ ...settings, socials: { ...settings.socials, twitter: e.target.value } })}/>
          </div>
          <div>
            <Label>LinkedIn</Label>
            <Input value={settings.socials.linkedin || ""} onChange={(e) => setSettings({ ...settings, socials: { ...settings.socials, linkedin: e.target.value } })}/>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">Save Settings</Button>
    </div>);
}
