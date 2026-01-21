import KanbanBoard from "../components/board/KanbanBoard";

export default function Board() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Project Board</h1>
      <KanbanBoard />
    </div>
  );
}
