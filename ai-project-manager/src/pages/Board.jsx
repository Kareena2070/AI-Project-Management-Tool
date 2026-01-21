import KanbanBoard from "../components/board/KanbanBoard";
import AIAssistantPanel from "../components/ai/AIAssistantPanel";

export default function Board() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Project Board</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Kanban Board */}
        <div className="lg:col-span-3">
          <KanbanBoard />
        </div>

        {/* AI Assistant */}
        <div>
          <AIAssistantPanel />
        </div>
      </div>
    </div>
  );
}
