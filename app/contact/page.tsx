"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import Nav2 from "@/components/marketing/Nav2";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    // Simulate sending the email (replace with your API call)
    console.log("Email:", email);
    alert("Thank you! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Navbar */}
      <Nav2 />

      {/* Spotlight Effect */}
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)"
        translateY={-200}
        width={560}
        height={1380}
        smallWidth={240}
        duration={7}
        xOffset={100}
      />

      {/* Main Content */}
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-24 md:pt-32">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Stay Connected
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-2xl text-center mx-auto">
          Join our community and be the first to know about updates, new
          features, and exclusive offers.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8"
        >
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="flex-1 bg-neutral-900 border-neutral-700 text-neutral-200 focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 rounded-full py-6 px-6"
          />
          <Button
            type="submit"
            className="w-full md:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold py-6 px-8 rounded-full transition-all duration-200 flex items-center gap-2"
          >
            <Send className="h-5 w-5" />
            Subscribe
          </Button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}