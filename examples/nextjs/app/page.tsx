"use client"
import { Database, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MiniChart } from "@/components/landing/mini-chart"

const AnimatedDots = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <svg
      width="100%"
      height="100%"
      className="w-full h-full"
      style={{ opacity: 0.07, mixBlendMode: "lighten" }}
    >
      <defs>
        <radialGradient id="dot-red" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444"></stop>
          <stop offset="100%" stopColor="#fff" stopOpacity="0"></stop>
        </radialGradient>
      </defs>
      <g>
        <circle cx="11%" cy="17%" r="120" fill="url(#dot-red)">
          <animate
            attributeName="cy"
            from="17%"
            to="30%"
            dur="7s"
            repeatCount="indefinite"
            direction="alternate"
          ></animate>
        </circle>
        <circle cx="84%" cy="72%" r="110" fill="url(#dot-red)">
          <animate
            attributeName="cy"
            from="72%"
            to="60%"
            dur="8s"
            repeatCount="indefinite"
            direction="alternate"
          ></animate>
        </circle>
        <circle cx="60%" cy="10%" r="70" fill="url(#dot-red)">
          <animate
            attributeName="cx"
            from="60%"
            to="65%"
            dur="6s"
            repeatCount="indefinite"
            direction="alternate"
          ></animate>
        </circle>
      </g>
    </svg>
  </div>
)

export default function Page() {
  return (
    <div className="bg-white text-neutral-900 antialiased">
      <AnimatedDots />
      <div className="relative min-h-screen flex flex-col">
        {/* NAVIGATION */}
        <nav className="flex justify-between items-center px-6 lg:px-16 py-6 w-full z-10">
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#ef4444]">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                <rect
                  x="4"
                  y="8"
                  width="16"
                  height="10"
                  rx="2"
                  fill="currentColor"
                ></rect>
                <path
                  d="M22 8l-10 6L2 8"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
            <span className="ml-3 text-2xl font-semibold tracking-tight text-[#ef4444]">
              Memeburn AI
            </span>
          </div>
          <div className="hidden md:flex gap-9">
            <Link
              href="#"
              className="text-neutral-800 text-base font-medium hover:text-[#ef4444] transition"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-neutral-800 text-base font-medium hover:text-[#ef4444] transition"
            >
              How It Works
            </Link>
            <Link
              href="#"
              className="text-neutral-800 text-base font-medium hover:text-[#ef4444] transition"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-neutral-800 text-base font-medium hover:text-[#ef4444] transition"
            >
              Resources
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#"
              className="px-4 py-2 rounded-lg text-[#ef4444] font-medium hover:bg-red-50 transition"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2 rounded-lg font-medium red-gradient text-white shadow-lg hover:opacity-90 transition"
            >
              Start Free Trial
            </Link>
          </div>
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6 text-[#ef4444]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </nav>

        {/* HERO */}
        <section className="relative flex-1 flex items-center justify-center px-6 lg:px-16 pt-10 md:pt-20 pb-6">
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/10 mb-6">
                AI-Driven Sales Automation
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-6">
                Accelerate Growth with Memeburn AI
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-lg">
                The all-in-one platform to import, enrich, personalize, and
                send cold outreach at scale. Harness AI to automate your sales
                pipeline—with full human control at every step.
              </p>
              <div className="flex flex-col sm:flex-row gap-3-8">
                <Link
                  href="/email-generator"
                  className="px-8 py-4 text-[#ef4444] bg-white border border-[#ef4444]/20 rounded-lg font-medium text-center hover:bg-[#fef2f2] hover:border-[#ef4444]/50 transition"
                >
                  See Memeburn AI in Action
                </Link>
              </div>
              <div className="mb-8 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-neutral-700 text-base">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-1 text-[#ef4444]"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                      <span className="font-medium">Import leads</span> from
                      your CRM or purchased databases
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-1 text-[#ef4444]"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                      <span className="font-medium">
                        AI-powered enrichment
                      </span>{" "}
                      via LinkedIn &amp; company sites
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-1 text-[#ef4444]"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                      <span className="font-medium">
                        Personalized cold emails
                      </span>{" "}
                      with relevant value props
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-1 text-[#ef4444]"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                      <span className="font-medium">Human review</span> &amp;
                      approval before send
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-1 text-[#ef4444]"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                      <span className="font-medium">
                        Send in small batches
                      </span>{" "}
                      (20 at a time) to avoid spam
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5 pt-3 border-t border-neutral-200">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500">
                  <svg
                    className="w-4 h-4 text-[#ef4444]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12l2 2 4-4"></path>
                  </svg>
                  GDPR Compliant
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500">
                  <svg
                    className="w-4 h-4 text-[#ef4444]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12l2 2 4-4"></path>
                  </svg>
                  14-Day Free Trial
                </span>
              </div>
            </div>
            {/* VISUAL / MOCKUP */}
            <div className="relative floating">
              <div className="glass p-4 md:p-6 rounded-2xl shadow-2xl relative">
                <Image
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
                  alt="Memeburn AI Dashboard"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full object-cover border border-[#ef4444]/10"
                />
                {/* Floating Card Top-Left */}
                <div className="absolute left-0 -top-10 shadow-lg rounded-xl backdrop-blur-2xl bg-white px-4 py-3 flex items-center gap-2 border border-[#ef4444]/10 animate-fadeInDown">
                  <Database className="w-5 h-5 text-[#ef4444]" />
                  <span className="text-xs font-medium text-neutral-800">
                    CRM Import
                  </span>
                </div>
                {/* Floating Card Bottom-Right */}
                <div className="absolute right-0 -bottom-10 shadow-lg rounded-xl backdrop-blur-2xl bg-white px-4 py-3 flex items-center gap-2 border border-[#ef4444]/10 animate-fadeInUp">
                  <Users className="w-5 h-5 text-[#ef4444]" />
                  <span className="text-xs font-medium text-neutral-800">
                    AI Enrichment
                  </span>
                </div>
                {/* Mini Chart */}
                <div className="absolute left-1/2 -bottom-16 -translate-x-1/2 bg-white rounded-xl shadow-lg px-5 py-4 border border-[#ef4444]/10 w-60">
                  <div className="text-xs font-medium text-[#ef4444] mb-2">
                    Batch Performance
                  </div>
                  <div>
                    <MiniChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-16 mt-10 mb-8">
          <div className="border-t border-neutral-200 pt-8">
            <p className="text-neutral-400 text-center mb-6">
              Trusted by data-driven sales teams
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-7">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/salesforce-2.svg"
                alt="Salesforce"
                width={100}
                height={28}
                className="h-8 opacity-70"
              />
              <Image
                src="https://cdn.worldvectorlogo.com/logos/hubspot-1.svg"
                alt="HubSpot"
                width={100}
                height={28}
                className="h-8 opacity-70"
              />
              <Image
                src="https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg"
                alt="LinkedIn"
                width={100}
                height={28}
                className="h-8 opacity-70"
              />
              <Image
                src="https://cdn.worldvectorlogo.com/logos/zendesk.svg"
                alt="Zendesk"
                width={100}
                height={28}
                className="h-8 opacity-70"
              />
              <Image
                src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"
                alt="Slack"
                width={100}
                height={28}
                className="h-8 opacity-70"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-auto border-t border-neutral-200 py-8 px-6 lg:px-16 text-center text-sm text-neutral-400">
          © 2024 Memeburn AI. All rights reserved.
        </footer>
      </div>
    </div>
  )
} 