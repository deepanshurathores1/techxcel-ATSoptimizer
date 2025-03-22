"use client";

import Carousel  from "@/components/ui/Carousel";
import Card  from "@/components/ui/Card"; // Ensure this is correctly imported

const Analysis = () => {
    const resumeTemplates = [
        {
            src: "/images/temp1.avif",
            title: "Professional Resume",
            category: "Traditional",
            content: (
                <div className="space-y-4">
                    <p>Perfect for corporate and traditional industries. This template emphasizes professionalism and clarity.</p>
                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                        Use Template
                    </button>
                </div>
            )
        },
        {
            src: "/images/temp2.avif",
            title: "Creative Resume",
            category: "Modern",
            content: (
                <div className="space-y-4">
                    <p>Ideal for creative professionals. Stands out while maintaining professionalism.</p>
                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                        Use Template
                    </button>
                </div>
            )
        },
        {
            src: "/images/temp3.avif",
            title: "Executive Resume",
            category: "Premium",
            content: (
                <div className="space-y-4">
                    <p>Designed for senior professionals and executives. Highlights leadership and achievements.</p>
                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                        Use Template
                    </button>
                </div>
            )
        },
        {
            src: "/images/temp4.avif",
            title: "Simple Resume",
            category: "Minimal",
            content: (
                <div className="space-y-4">
                    <p>Clean and minimal design. Perfect for those who prefer simplicity and directness.</p>
                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                        Use Template
                    </button>
                </div>
            )
        },
        {
            src: "/images/temp5.avif",
            title: "Simple Resume",
            category: "Minimal",
            content: (
                <div className="space-y-4">
                    <p>Clean and minimal design. Perfect for those who prefer simplicity and directness.</p>
                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                        Use Template
                    </button>
                </div>
            )
        },
        {
            src: "/images/temp6.avif",
            title: "Simple Resume",
            category: "Minimal",
            content: (
                <div className="space-y-4">
                    <p>Clean and minimal design. Perfect for those who prefer simplicity and directness.</p>
                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                        Use Template
                    </button>
                </div>
            )
        },
    ];

    const carouselItems = resumeTemplates.map((template, index) => (
        <Card 
            key={index} 
            src={template.src} 
            title={template.title} 
            category={template.category} 
            content={template.content} 
            layout={true} 
        />
    ));

    return (
        <div className="relative flex flex-col items-center justify-center w-full min-h-screen">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 px-4">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug">
                    Our ATS friendly <br />
                    <span className="font-subheading italic">Resume templates</span>
                </h2>
                <p className="text-base md:text-lg text-accent-foreground/80 mt-4">
                    Explore a variety of customizable resume templates and gain detailed insights 
                    into how your resume aligns with industry standards and job requirements.
                </p>
            </div>

            <div className="w-full">
                <Carousel items={carouselItems} />
            </div>
        </div>
    );
};

export default Analysis;
