import Nav2 from "@/components/marketing/Nav2";
import Footer from "@/components/marketing/Footer";
import { ResumeAnalyzer } from "@/components/ui/ResumeAnalyzer";

export default function AnalyzePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav2 />
      <main className="container mx-auto py-10 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Analyze Your Resume</h1>
        <ResumeAnalyzer />
      </main>
      <Footer />
    </div>
  )
}