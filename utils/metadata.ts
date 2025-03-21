import { Metadata } from "next";

interface MetadataProps {
    title?: string;
    description?: string;
    icons?: Metadata["icons"];
    noIndex?: boolean;
    keywords?: string[];
    author?: string;
    twitterHandle?: string;
    type?: "website" | "article" | "profile";
    locale?: string;
    alternates?: Record<string, string>;
    publishedTime?: string;
    modifiedTime?: string;
}

export const generateMetadata = ({
    title = `ATS Optimizer - AI-Powered Resume Builder & Analyzer`,
    description = `Boost your job search with ATS Optimizer. Create ATS-friendly resumes, optimize keywords, and enhance your chances of getting hired with AI-powered insights. Build a winning resume today!`,
    icons = [
        {
            rel: "icon",
            url: "/icons/icon-dark.png",
            media: "(prefers-color-scheme: light)",
        },
        {
            rel: "icon",
            url: "/icons/icon.png",
            media: "(prefers-color-scheme: dark)",
        },
    ],
    
    keywords = [
        "ATS resume builder",
        "resume analyzer",
        "AI resume optimization",
        "job application tips",
        "resume keyword optimization",
        "resume scoring tool",
        "AI-powered job search",
        "resume formatting guide",
        "cover letter generator",
        "AI-driven career tools"
    ],
    author = process.env.NEXT_PUBLIC_AUTHOR_NAME || "ATS Optimizer Team",
    
}: MetadataProps = {}): Metadata => {
    const metadataBase = new URL(process.env.NEXT_PUBLIC_APP_URL || "https://atsoptimizer.com");

    return {
        metadataBase,
        title: {
            template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME || "ATS Optimizer"}`,
            default: title
        },
        description,
        keywords,
        authors: [{ name: author }],
        creator: author,
        publisher: process.env.NEXT_PUBLIC_APP_NAME || "ATS Optimizer",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons,
    };
};