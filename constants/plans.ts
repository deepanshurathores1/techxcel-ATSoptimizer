export type PLAN = {
    id: string;
    title: string;
    desc: string;
    monthlyPrice: number;
    annuallyPrice: number;
    badge?: string;
    buttonText: string;
    features: string[];
    link: string;
};

export const PLANS: PLAN[] = [
    {
        id: "basic",
        title: "Basic",
        desc: "Ideal for job seekers looking to optimize their resumes for ATS compatibility.",
        monthlyPrice: 19,
        annuallyPrice: 199,
        buttonText: "Get Started",
        features: [
            "AI-powered resume analysis",
            "ATS optimization suggestions",
            "Basic resume formatting",
            "Keyword optimization",
            "1 resume scan per month",
            "Email support"
        ],
        link: "#"
    },
    {
        id: "pro",
        title: "Pro",
        desc: "Perfect for professionals who want to enhance their job applications with AI-driven insights.",
        monthlyPrice: 49,
        annuallyPrice: 529,
        badge: "Most Popular",
        buttonText: "Upgrade to Pro",
        features: [
            "Unlimited resume scans",
            "AI-driven resume builder",
            "Advanced keyword optimization",
            "Cover letter suggestions",
            "LinkedIn profile analysis",
            "Priority email support"
        ],
        link: "#"
    },
    // {
    //     id: "enterprise",
    //     title: "Enterprise",
    //     desc: "Tailored for recruitment agencies and career coaches who need AI-powered solutions.",
    //     monthlyPrice: 149,
    //     annuallyPrice: 1589,
    //     badge: "For Teams",
    //     buttonText: "Contact Sales",
    //     features: [
    //         "Bulk resume analysis",
    //         "Custom AI models",
    //         "Multi-user collaboration",
    //         "Advanced applicant tracking integrations",
    //         "Dedicated account manager",
    //         "24/7 priority support"
    //     ],
    //     link: "#"
    // }
];

