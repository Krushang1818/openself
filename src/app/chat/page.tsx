"use client";

import { useResumeStore } from "@/store/resume-store";
import { TamboProvider } from "@tambo-ai/react";
import { TamboMcpProvider } from "@tambo-ai/react/mcp";

import { components, tools } from "@/lib/tambo";

import { FullResume, ResumeActionBar } from "@/components/resume";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";

function ResumePreview() {
  const { resumeData } = useResumeStore();

  return (
    <div className="flex-1 overflow-auto">
      {resumeData && <ResumeActionBar resume={resumeData} />}

      <div className="p-4">
        <FullResume resume={resumeData} />
      </div>
    </div>
  );
}

export default function ChatPage() {
  // Load MCP server configurations
  const mcpServers = useMcpServers();

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
    >
      <TamboMcpProvider mcpServers={mcpServers}>
        <main className="flex h-[calc(100vh-var(--header-height))] divide-x divide-border bg-gray-50">
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

          {/* Resume Preview */}
          <ResumePreview />
        </main>
      </TamboMcpProvider>
    </TamboProvider>
  );
}
