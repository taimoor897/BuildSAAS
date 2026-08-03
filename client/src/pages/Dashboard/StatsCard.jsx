import { ArrowUpRight } from "lucide-react";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  change,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h2>

          <div className="mt-3 flex items-center gap-1 text-sm text-green-600">
            <ArrowUpRight size={16} />
            <span>{change}</span>
          </div>
        </div>

        <div className="rounded-xl bg-blue-50 p-3">
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}