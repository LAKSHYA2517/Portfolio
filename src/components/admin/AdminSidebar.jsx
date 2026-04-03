import { LayoutDashboard, FolderOpen, FileText, BarChart3, Palette, Eye, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from "@/components/ui/sidebar";
const menuItems = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Projects", url: "/admin/projects", icon: FolderOpen },
    { title: "Blog Posts", url: "/admin/blogs", icon: FileText },
    { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    { title: "Theme", url: "/admin/theme", icon: Palette },
];
export function AdminSidebar() {
    const { state } = useSidebar();
    const collapsed = state === "collapsed";
    const location = useLocation();
    const isActive = (path) => path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(path);
    return (<Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (<SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider">
              Portfolio Admin
            </SidebarGroupLabel>)}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (<SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/admin"} className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4"/>
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className="hover:bg-sidebar-accent" activeClassName="">
                    <Eye className="mr-2 h-4 w-4"/>
                    {!collapsed && <span>View Portfolio</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>);
}
