const PROJECTS_KEY = "portfolio_projects";
const BLOGS_KEY = "portfolio_blogs";
const SETTINGS_KEY = "portfolio_settings";
const defaultSettings = {
    name: "Lakshya Asnani",
    title: "Full-Stack Developer",
    bio: "I craft beautiful digital experiences that blend aesthetics with functionality. Passionate about clean code, intuitive design, and pushing creative boundaries.",
    avatar: "",
    email: "hello@alexrivera.dev",
    socials: { github: "#", twitter: "#", linkedin: "#" },
};
const defaultProjects = [
    {
        id: "1", title: "E-Commerce Platform", description: "A modern shopping experience with real-time inventory",
        content: "Built with React and Node.js, featuring real-time inventory tracking, payment processing, and a beautiful responsive design.",
        category: "Web App", image: "", tags: ["React", "Node.js", "Stripe"], link: "#", featured: true,
        createdAt: "2024-01-15", updatedAt: "2024-01-15",
    },
    {
        id: "2", title: "Task Management Dashboard", description: "Collaborative project management tool",
        content: "A Kanban-style task management tool with real-time collaboration, drag-and-drop, and analytics.",
        category: "Web App", image: "", tags: ["React", "TypeScript", "WebSocket"], link: "#", featured: true,
        createdAt: "2024-02-10", updatedAt: "2024-02-10",
    },
    {
        id: "3", title: "Brand Identity - Zenith", description: "Complete brand identity for a tech startup",
        content: "Logo design, brand guidelines, marketing materials, and web presence for Zenith Technologies.",
        category: "Design", image: "", tags: ["Branding", "UI/UX", "Figma"], link: "#", featured: false,
        createdAt: "2024-03-05", updatedAt: "2024-03-05",
    },
    {
        id: "4", title: "Weather App", description: "Beautiful weather visualization with forecasts",
        content: "A weather application with stunning visualizations, 7-day forecasts, and location-based alerts.",
        category: "Mobile", image: "", tags: ["React Native", "API", "Charts"], link: "#", featured: true,
        createdAt: "2024-03-20", updatedAt: "2024-03-20",
    },
];
const defaultBlogs = [
    {
        id: "1", title: "Building Scalable React Applications",
        excerpt: "Learn the patterns and practices that make React apps maintainable at scale.",
        content: "React applications can grow complex quickly. In this post, I share the architectural patterns I've found most effective for building scalable, maintainable React applications...",
        coverImage: "", published: true, createdAt: "2024-03-01", updatedAt: "2024-03-01",
    },
    {
        id: "2", title: "The Art of Clean Code",
        excerpt: "Why readability matters more than cleverness in software development.",
        content: "Clean code is not about following rules blindly. It's about writing code that communicates intent clearly...",
        coverImage: "", published: true, createdAt: "2024-02-15", updatedAt: "2024-02-15",
    },
];
function getFromStorage(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    }
    catch {
        return fallback;
    }
}
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
export function getProjects() {
    return getFromStorage(PROJECTS_KEY, defaultProjects);
}
export function saveProjects(projects) {
    saveToStorage(PROJECTS_KEY, projects);
}
export function getBlogs() {
    return getFromStorage(BLOGS_KEY, defaultBlogs);
}
export function saveBlogs(blogs) {
    saveToStorage(BLOGS_KEY, blogs);
}
export function getSettings() {
    return getFromStorage(SETTINGS_KEY, defaultSettings);
}
export function saveSettings(settings) {
    saveToStorage(SETTINGS_KEY, settings);
}
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
