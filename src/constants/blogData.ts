export interface BlogData {
    id: number;
    title: string;
    date: string;
    readTime: string;
    desc: string;
    tags: string[];
    link: string;
    image: string;
}

export const blogs: BlogData[] = [
    {
        id: 1,
        title: "Why I Started to Code",
        date: "Feb 05, 2026",
        readTime: "10 min read",
        desc: "In this article, I will share my journey of starting to code and how it has changed my life.",
        tags: ["Myself", "life", "Journey"],
        link: "https://medium.com/@piyushdubeydemo/why-i-started-to-code-ee28649f5a62", // Link to your real post
        image: "Why i started to code.png"
    },
    {
        id: 2,
        title: "Understanding React 19 Actions",
        date: "Jan 20, 2026",
        readTime: "8 min read",
        desc: "Breaking down the React 19 Actions: Automatic async state management, simpler code.",
        tags: ["React", "JavaScript", "Frontend"],
        link: "https://medium.com/@piyushdubeydemo/understanding-react-19-actions-14d6f2fc25e6",
        image: "react19.png"
        },
];
