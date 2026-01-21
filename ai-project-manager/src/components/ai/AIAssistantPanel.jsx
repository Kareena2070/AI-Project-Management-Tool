import { useState } from "react";

export default function AIAssistantPanel() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const fakeAIResponse = (text) => {
    setLoading(true);
    setResponse("");

    setTimeout(() => {
      setResponse(text);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">🤖 AI Assistant</h2>

      <div className="flex flex-col gap-3 mb-4">
        <button
          onClick={() =>
            fakeAIResponse(
              "AI suggests breaking this task into 3 subtasks: UI Design, API Integration, and Testing."
            )
          }
          className="bg-black text-white px-4 py-2 rounded"
        >
          Generate Tasks from Description
        </button>

        <button
          onClick={() =>
            fakeAIResponse(
              "Sprint Plan: Focus on Kanban board completion on Day 1, AI integration UI on Day 2, and backend APIs on Day 3."
            )
          }
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Sprint Plan
        </button>

        <button
          onClick={() =>
            fakeAIResponse(
              "Progress Summary: 70% tasks completed. Core features are stable. Remaining work includes AI backend integration."
            )
          }
          className="bg-black text-white px-4 py-2 rounded"
        >
          Summarize Progress
        </button>

        <button
          onClick={() =>
            fakeAIResponse(
              "Detected Blockers: 2 tasks are overdue due to missing API dependencies and unclear requirements."
            )
          }
          className="bg-black text-white px-4 py-2 rounded"
        >
          Detect Blockers
        </button>
      </div>

      <div className="bg-gray-100 p-3 rounded min-h-[80px]">
        {loading && <p className="text-gray-500">AI is thinking...</p>}
        {!loading && response && (
          <p className="text-sm text-gray-800">{response}</p>
        )}
        {!loading && !response && (
          <p className="text-sm text-gray-400">
            Click an AI action to see insights.
          </p>
        )}
      </div>
    </div>
  );
}
