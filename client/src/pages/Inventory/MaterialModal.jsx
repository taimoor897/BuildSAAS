import { useEffect, useState } from "react";
import {
  createMaterial,
  updateMaterial,
} from "../services/materialService";

export default function MaterialModal({
  open,
  onClose,
  onCreated,
  material,
  project,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "Bags",
    costPerUnit: "",
    supplier: "",
    lowStockLimit: 20,
  });

  useEffect(() => {
    if (material) {
      setForm({
        name: material.name || "",
        category: material.category || "",
        quantity: material.quantity || "",
        unit: material.unit || "Bags",
        costPerUnit: material.costPerUnit || "",
        supplier: material.supplier || "",
        lowStockLimit: material.lowStockLimit || 20,
      });
    } else {
      setForm({
        name: "",
        category: "",
        quantity: "",
        unit: "Bags",
        costPerUnit: "",
        supplier: "",
        lowStockLimit: 20,
      });
    }
  }, [material]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!project?._id) {
      alert("Project not loaded.");
      return;
    }
  
    const materialData = {
      project: project._id,
      ...form,
      quantity: Number(form.quantity),
      costPerUnit: Number(form.costPerUnit),
      lowStockLimit: Number(form.lowStockLimit),
    };
  
  
    try {
  
      if (material) {
  
        await updateMaterial(
          material._id,
          materialData
        );
  
      } else {
  
        await createMaterial(materialData);
  
      }
  
  
      onCreated();
      onClose();
  
  
    } catch (err) {
  
      console.error(err);
      alert("Failed to save material.");
  
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            {material ? "Edit Material" : "Add Material"}
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-slate-400 hover:text-black"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 md:grid-cols-2"
        >

          <input
            name="name"
            placeholder="Material Name"
            value={form.name}
            onChange={handleChange}
            className="rounded-xl border p-3"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="rounded-xl border p-3"
          >
            <option>Bags</option>
            <option>Kg</option>
            <option>Tons</option>
            <option>Pieces</option>
            <option>Cubic Feet</option>
            <option>Liters</option>
          </select>

          <input
            type="number"
            name="costPerUnit"
            placeholder="Cost Per Unit"
            value={form.costPerUnit}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="supplier"
            placeholder="Supplier"
            value={form.supplier}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            name="lowStockLimit"
            placeholder="Low Stock Limit"
            value={form.lowStockLimit}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <div className="md:col-span-2 flex justify-end gap-4 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-6 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              {material ? "Update Material" : "Add Material"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}