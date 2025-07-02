"use client";

import { Navbar } from "@/components/layout/navbar";
import FooterSection from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { VantaBackground } from "@/components/vanta-background";

export default function EmailGeneratorPage() {
  const [formData, setFormData] = useState({
    recipientName: "Neo",
    recipientTitle: "Sekaleli",
    recipientCompany: "NRF-SAIAB",
    yourName: "Mbali Ngulube",
    yourTitle: "Head of AI Product Development",
    yourCompany: "NRF-SAIAB",
    purposeOfEmail: "neosekaleli@gmail.com",
    keyValueProposition: "40% more impressions",
    personalizationPoint: "I saw your recent Denlyn Mall campaign",
    customResearchTopic: "",
    linkedinUrl: "https://www.linkedin.com/in/neosekaleli/",
  });
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerateEmail = async () => {
    setIsLoading(true);
    setGeneratedEmail("");

    try {
      const response = await fetch('/api/multi-agent-workflow/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate email.');
      }

      const data = await response.json();
      setGeneratedEmail(data.email);
      setSearchResults(data.researchResult);

    } catch (error) {
      console.error("Error generating email:", error);
      if (error instanceof Error) {
        setGeneratedEmail(`Error: ${error.message}`);
      } else {
        setGeneratedEmail("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#121212] text-white font-sans">
      <VantaBackground />
      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            
            {/* Left Panel: Email Details */}
            <div className="bg-[#1e1e1e]/80 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Email Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="recipientName" className="text-sm text-gray-400 block mb-1">Recipient Name</label>
                    <Input id="recipientName" value={formData.recipientName} onChange={handleInputChange} className="bg-[#2a2a2a] border-gray-600" />
                  </div>
                  <div>
                    <label htmlFor="recipientTitle" className="text-sm text-gray-400 block mb-1">Recipient Title</label>
                    <Input id="recipientTitle" value={formData.recipientTitle} onChange={handleInputChange} className="bg-[#2a2a2a] border-gray-600" />
                  </div>
                </div>
                <div>
                  <label htmlFor="recipientCompany" className="text-sm text-gray-400 block mb-1">Recipient Company</label>
                  <Input id="recipientCompany" value={formData.recipientCompany} onChange={handleInputChange} className="bg-[#2a2a2a] border-gray-600" />
                </div>
                <div>
                  <label htmlFor="linkedinUrl" className="text-sm text-gray-400 block mb-1">LinkedIn Profile URL</label>
                  <Input id="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} className="bg-[#2a2a2a] border-gray-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="yourName" className="text-sm text-gray-400 block mb-1">Your Name</label>
                    <Input id="yourName" value={formData.yourName} onChange={handleInputChange} className="bg-[#2a2a2a] border-gray-600" />
                  </div>
                   <div>
                    <label htmlFor="yourCompany" className="text-sm text-gray-400 block mb-1">Your Company</label>
                    <Input id="yourCompany" value={formData.yourCompany} onChange={handleInputChange} className="bg-[#2a2a2a] border-gray-600" />
                  </div>
                </div>
                 <div>
                  <label htmlFor="yourTitle" className="text-sm text-gray-400 block mb-1">Your Title</label>
                  <Input id="yourTitle" value={formData.yourTitle} onChange={handleInputChange} className="bg-[#2a2a2a] border-gray-600" />
                </div>
                <div>
                  <label htmlFor="purposeOfEmail" className="text-sm text-gray-400 block mb-1">Purpose of Email</label>
                  <Input id="purposeOfEmail" value={formData.purposeOfEmail} onChange={handleInputChange} className="bg-[#2a2a2a] border-gray-600" />
                </div>
                 <div>
                  <label htmlFor="keyValueProposition" className="text-sm text-gray-400 block mb-1">Key Value Proposition</label>
                  <Input id="keyValueProposition" value={formData.keyValueProposition} onChange={handleInputChange} className="bg-[#2a2a2a] border-gray-600" />
                </div>
                <div>
                  <label htmlFor="personalizationPoint" className="text-sm text-gray-400 block mb-1">Personalization Point</label>
                  <Input id="personalizationPoint" value={formData.personalizationPoint} onChange={handleInputChange} className="bg-[#2a2a2a] border-gray-600" />
                </div>
                <div>
                  <label htmlFor="customResearchTopic" className="text-sm text-gray-400 block mb-1">Custom Research Topic (Optional)</label>
                  <Input id="customResearchTopic" value={formData.customResearchTopic} onChange={handleInputChange} className="bg-[#2a2a2a] border-gray-600" placeholder="e.g., their recent Series B funding" />
                </div>
              </div>
              <Button onClick={handleGenerateEmail} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Email"}
              </Button>
            </div>

            {/* Right Panel */}
            <div className="space-y-8">
              {/* Search Results */}
              <div className="bg-[#1e1e1e]/80 backdrop-blur-sm p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6">Research Results</h2>
                <div className="bg-[#2a2a2a]/80 backdrop-blur-sm rounded p-4 h-64 overflow-y-auto whitespace-pre-wrap text-gray-300">
                  {isLoading ? <div className="text-center text-gray-400">Searching...</div> : searchResults || "Research results will appear here."}
                </div>
              </div>

              {/* Generated Email */}
              <div className="bg-[#1e1e1e]/80 backdrop-blur-sm p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6">Generated Email</h2>
                <div className="bg-[#2a2a2a]/80 backdrop-blur-sm rounded p-4 h-64 overflow-y-auto whitespace-pre-wrap text-gray-300">
                  {isLoading && !searchResults ? <div className="text-center text-gray-400">Waiting for research...</div> : (isLoading ? <div className="text-center text-gray-400">Generating email...</div> : generatedEmail) || "Generated email will appear here."}
                </div>
              </div>
            </div>

          </div>
        </main>
        <FooterSection />
      </div>
    </div>
  );
} 