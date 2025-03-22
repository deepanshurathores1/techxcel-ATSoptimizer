/* eslint-disable @typescript-eslint/no-unused-vars */

import Wrapper from "@/components/global/wrapper";
import Analysis from "@/components/marketing/analysis";
import CTA from "@/components/marketing/cta";
import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import Pricing from "@/components/marketing/pricing";
import Faq from "@/components/marketing/faq";

const HomePage = () => {
    return (
        <Wrapper className="py-20 relative">
            <Hero />
            
            <Features />
            
            {/* <Analysis /> */}
            <Faq />
            
            <Pricing />

            <CTA />
        </Wrapper>
    )
};

export default HomePage
