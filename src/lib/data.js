const PROJECTS_KEY = "portfolio_projects";
const BLOGS_KEY = "portfolio_blogs";
const SETTINGS_KEY = "portfolio_settings";
const defaultSettings = {
    name: "Lakshya Asnani",
    title: "Full-Stack Developer",
    bio: "I craft beautiful digital experiences that blend aesthetics with functionality. Passionate about clean code, intuitive design, and pushing creative boundaries.",
    avatar: "",
    email: "lakshya.asnani25@gmail.com",
    socials: { github: "https://github.com/LAKSHYA2517", twitter: "https://twitter.com", linkedin: "https://www.linkedin.com/in/lakshya-asnani/" },
};
const defaultProjects = [
    {
        id: "1", title: "Mortagage AI Assisment", description: "RAG system that ingests mortgage documents",
        content: "loan applications, closing disclosures, promissory notes, title reports",
        category: "Web App", image: "https://private-user-images.githubusercontent.com/183131208/558863495-554205d9-0739-4a90-b17f-312c7d4a102d.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzU1NjI1OTcsIm5iZiI6MTc3NTU2MjI5NywicGF0aCI6Ii8xODMxMzEyMDgvNTU4ODYzNDk1LTU1NDIwNWQ5LTA3MzktNGE5MC1iMTdmLTMxMmM3ZDRhMTAyZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNDA3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDQwN1QxMTQ0NTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jM2FjOTQ1MTI0YmZhMjVlOGY5MjFiN2VmNjA2NGU2OTMxODdiYzc0ZGYwYjU1MmRkYjJhYTI1NGFhOTNkMjJiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.a3chNjc_jjprcHm7RF4I8IuHmR2RAT8M77JJw2C-gaA", tags: ["React", "Node.js", "Stripe"], link: "#", featured: true,
        createdAt: "2024-01-15", updatedAt: "2024-01-15",
    },
    {
        id: "2", title: "Task Management Dashboard", description: "Collaborative project management tool",
        content: "A Kanban-style task management tool with real-time collaboration, drag-and-drop, and analytics.",
        category: "Web App", image: "https://camo.githubusercontent.com/1a237fbd2a2ecb50a8c2a38cb5b4ed0157b6a172920c30be502acf15fae8cd67/68747470733a2f2f6465762d746f2d75706c6f6164732e73332e616d617a6f6e6177732e636f6d2f75706c6f6164732f61727469636c65732f6831326d3766767638367a30797274746f7230702e504e47", tags: ["React", "TypeScript", "WebSocket"], link: "#", featured: true,
        createdAt: "2024-02-10", updatedAt: "2024-02-10",
    },
    {
        id: "3", title: "Brand Identity - Zenith", description: "Complete brand identity for a tech startup",
        content: "Logo design, brand guidelines, marketing materials, and web presence for Zenith Technologies.",
        category: "Design", image: "https://cdn.dribbble.com/userupload/15117063/file/original-57642017af0b62d10aa2270191366e78.jpg?resize=752x&vertical=center", tags: ["Branding", "UI/UX", "Figma"], link: "#", featured: false,
        createdAt: "2024-03-05", updatedAt: "2024-03-05",
    },
    {
        id: "4", title: "Weather App", description: "Beautiful weather visualization with forecasts",
        content: "A weather application with stunning visualizations, 7-day forecasts, and location-based alerts.",
        category: "Mobile", image: "https://cdn.dribbble.com/userupload/33730339/file/original-6178ac76d6b35889e5552064e3f155ee.png?resize=752x&vertical=center", tags: ["React Native", "API", "Charts"], link: "#", featured: true,
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
