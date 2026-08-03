import { useState } from "react";
import { createReport } from "../services/siteReportService";

export default function DailyReportModal({
  project,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState({
    workersPresent: "",
    concreteUsed: "",
    completedWork: "",
    issues: "",
    weather: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await createReport({
        projectId: project._id,
        workersPresent: Number(form.workersPresent),
        concreteUsed: form.concreteUsed,
        completedWork: form.completedWork
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        issues: form.issues,
        weather: form.weather,
        notes: form.notes,
      });

      alert("Daily report saved.");

      onSaved?.();
      onClose();

    } catch (err) {
      console.error(err);
      alert("Failed to save report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">

        <h2 className="text-3xl font-bold">
          📝 Daily Site Report
        </h2>

        <p className="mt-2 text-slate-500">
          Record today's construction progress.
        </p>

        <div className="mt-8 space-y-5">

          <input
            name="workersPresent"
            type="number"
            placeholder="Workers Present"
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

          <input
            name="concreteUsed"
            placeholder="Concrete Used (e.g. 45 Bags)"
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

          <input
            name="completedWork"
            placeholder="Completed Work (comma separated)"
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

          <select
            name="weather"
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          >
            <option value="">Select Weather</option>
            <option>Sunny</option>
            <option>Cloudy</option>
            <option>Rainy</option>
            <option>Windy</option>
          </select>

          <textarea
            name="issues"
            placeholder="Issues"
            rows={3}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

          <textarea
            name="notes"
            placeholder="Extra Notes"
            rows={4}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "💾 Save Report"}
          </button>

        </div>

      </div>

    </div>
  );
}