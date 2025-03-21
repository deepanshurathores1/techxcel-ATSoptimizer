import { FEATURES } from "@/constants"
import { cn } from "@/lib"
import Image from "next/image"
import Container from "@/components/global/container"
import { MagicCard } from "@/components/ui/magic-card"
import Nav2 from "@/components/marketing/Nav2"
import Footer from "@/components/marketing/Footer";

const Features = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full py-20">
      {/* Sticky Navbar */}
      <div className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
        <Nav2 />
      </div>

      <Container className="max-w-7xl mt-16"> {/* Adjust margin-top to avoid overlap */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium !leading-tight mt-6">
            AI-Powered Resume Creation <br /> made <span className="font-subheading italic">simple</span>
          </h2>
          <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6 max-w-2xl">
            Transform your job applications with AI-powered automation. Build resumes faster, enhance content quality,
            and optimize for job success in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 relative overflow-visible">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "relative flex flex-col rounded-2xl lg:rounded-3xl bg-card border border-border/50 hover:border-border/100 transition-colors",
                index === 3 && "lg:col-span-2",
                index === 2 && "md:col-span-2 lg:col-span-1",
              )}
            >
              <MagicCard
                gradientFrom="#38bdf8"
                gradientTo="#3b82f6"
                className="p-6 lg:p-8 lg:rounded-3xl"
                gradientColor="rgba(59,130,246,0.1)"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <h3 className="text-2xl font-semibold flex items-center gap-3">
                    <feature.icon className="size-6 text-primary" />
                    {feature.title}
                  </h3>
                </div>
                <p className="text-base text-muted-foreground mb-8">{feature.description}</p>

                <div className="w-full bg-card/50 overflow-hidden rounded-xl">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </MagicCard>
            </div>
          ))}
        </div>
      </Container>
      <Footer/>
    </div>
    
  )
}

export default Features

