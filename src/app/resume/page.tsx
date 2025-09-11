"use client";

import { useState } from "react";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { TamboMcpProvider } from "@tambo-ai/react/mcp";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InteractableFullResume } from "@/components/resume/full-resume";

export default function ResumePage() {
  // Load MCP server configurations
  const mcpServers = useMcpServers();

  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
    >
      <TamboMcpProvider mcpServers={mcpServers}>
        <div className="flex h-screen bg-gray-50">
          {/* Chat Sidebar */}
          <div
            className={`${
              isChatOpen ? "w-80" : "w-0"
            } border-r border-gray-200 bg-white transition-all duration-300 flex flex-col relative`}
          >
            {isChatOpen && (
              <>
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Resume Builder
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Try: &quot;Add my name as John Doe&quot; or &quot;Add React
                    to my skills&quot;
                  </p>
                </div>

                <div className="flex-1 overflow-hidden p-4">
                  <MessageThreadFull contextKey="resume-builder" />
                </div>
              </>
            )}

            {/* Toggle Button */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-r-lg p-2 hover:bg-gray-50"
            >
              {isChatOpen ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              {/* Download Button */}
              {/* <div className="mb-6 flex justify-end">
                <DownloadButton resume={resume} />
              </div> */}

              <InteractableFullResume resume={null} />
            </div>
          </div>
        </div>
      </TamboMcpProvider>
    </TamboProvider>
  );
}
