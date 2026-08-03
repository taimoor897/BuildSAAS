import { Bot } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-8 text-white shadow-lg">

      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
          <Bot size={28} />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[4px] text-blue-200">
            Intelligent Construction Platform
          </p>

          <h2 className="text-3xl font-bold">
            BuildPilot AI
          </h2>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-2xl font-semibold leading-relaxed">
          Plan smarter.
          <br />
          Build faster.
          <br />
          Deliver with confidence.
        </h3>

        <p className="max-w-md text-blue-100 leading-7">
          Your intelligent construction management platform for projects,
          teams, inventory, reports, client updates, and AI-powered
          assistance—all in one place.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
          🏗 Projects
        </span>

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
          👷 Workforce
        </span>

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
          📦 Inventory
        </span>

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
          🤖 AI Assistant
        </span>
      </div>

    </div>
  );
}