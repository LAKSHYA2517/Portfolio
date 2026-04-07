const PROJECTS_KEY = "portfolio_projects";
const BLOGS_KEY = "portfolio_blogs";
const SETTINGS_KEY = "portfolio_settings";
const defaultSettings = {
    name: "Lakshya Asnani",
    title: "Full-Stack Developer",
    bio: "I craft beautiful digital experiences that blend aesthetics with functionality. Passionate about clean code, intuitive design, and pushing creative boundaries.",
    avatar: "",
    email: "lakshya.asnani25@gmail.com",
    themeMode: "system",
    socials: { github: "https://github.com/LAKSHYA2517", twitter: "https://twitter.com", linkedin: "https://www.linkedin.com/in/lakshya-asnani/" },
};
const defaultProjects = [
    {
        id: "1", title: "Mortagage AI Assisment", description: "RAG system that ingests mortgage documents",
        content: "loan applications, closing disclosures, promissory notes, title reports",
        category: "Web App", image: "https://cdn.dribbble.com/userupload/16982736/file/original-76d5036ab8b1ebc1f3177e572f7bf599.png?resize=1504x1128&vertical=center", tags: ["React", "Node.js", "Stripe"], link: "#", featured: true,
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
    const stored = getFromStorage(SETTINGS_KEY, defaultSettings);
    return {
        ...defaultSettings,
        ...stored,
        socials: {
            ...defaultSettings.socials,
            ...(stored?.socials || {}),
        },
    };
}
export function saveSettings(settings) {
    saveToStorage(SETTINGS_KEY, settings);
}
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function clampScore(value) {
    return Math.max(35, Math.min(98, Math.round(value)));
}

export function calculateProjectDNA(project) {
    const tagsCount = project.tags?.length || 0;
    const contentLength = (project.content || "").length;
    const hasDemo = Boolean(project.link && project.link !== "#");
    const featuredBoost = project.featured ? 8 : 0;

    const creativity = clampScore(48 + tagsCount * 6 + (project.category === "Design" ? 12 : 0) + featuredBoost);
    const complexity = clampScore(40 + contentLength / 18 + (project.category === "Web App" ? 8 : 4));
    const impact = clampScore(45 + (hasDemo ? 14 : 3) + featuredBoost + (project.description?.length || 0) / 9);
    const execution = clampScore(44 + tagsCount * 5 + (project.image ? 8 : 2));
    const noveltyScore = clampScore((creativity + complexity + impact + execution) / 4);

    let insight = "Balanced technical foundation with room for experimentation.";
    if (noveltyScore > 82) {
        insight = "High innovation signal. This project strongly differentiates your portfolio.";
    }
    else if (noveltyScore > 70) {
        insight = "Strong project DNA. Add one breakthrough feature to push it further.";
    }

    return {
        creativity,
        complexity,
        impact,
        execution,
        noveltyScore,
        insight,
    };
}
