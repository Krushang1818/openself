"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { TamboMcpProvider } from "@tambo-ai/react/mcp";
import { FullResume } from "@/components/resume/full-resume";
import { useResumeStore } from "@/store/resume-store";

export default function ChatPage() {
  // Load MCP server configurations
  const mcpServers = useMcpServers();
  const { resumeData } = useResumeStore();

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
    >
      <TamboMcpProvider mcpServers={mcpServers}>
        <main className="flex h-[calc(100vh-var(--header-height))] bg-gray-50">
          {/* Chat */}
          <div className="flex-1 min-w-0 h-full">
            <div className="h-full flex flex-col">
              <MessageThreadFull
                hideHistory
                className="right w-full max-w-none ml-0"
                contextKey="tambo-template"
              />
            </div>
          </div>

          {/* Resume */}
          <div className="flex-1 overflow-auto">
            {/* Download Button */}
            {/* <div className="mb-6 flex justify-end">
                <DownloadButton resume={resume} />
              </div> */}

            <div className="p-4">
              <FullResume resume={resumeData} />
            </div>
          </div>
        </main>
      </TamboMcpProvider>
    </TamboProvider>
  );
}
