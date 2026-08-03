import { useEffect, useState } from "react";
import {
  createWorker,
  updateWorker,
} from "../services/workerService";

export default function WorkerModal({
  open,
  onClose,
  onCreated,
  worker,
}) {

  const initialForm = {
    name: "",
    role: "",
    phone: "",
    email: "",
    cnic: "",
    salary: "",
    employmentType: "Monthly",
    assignedProject: "",
    status: "Active",
  };


  const [form, setForm] = useState(initialForm);


  useEffect(() => {

    if(worker){

      setForm({
        name: worker.name || "",
        role: worker.role || "",
        phone: worker.phone || "",
        email: worker.email || "",
        cnic: worker.cnic || "",
        salary: worker.salary || "",
        employmentType: worker.employmentType || "Monthly",
        assignedProject: worker.assignedProject || "",
        status: worker.status || "Active",
      });

    } 
    else {

      setForm(initialForm);

    }

  }, [worker, open]);



  if (!open) return null;



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const workerData = {
        ...form,
        salary: Number(form.salary),
      };


      if(worker){

        await updateWorker(
          worker._id,
          workerData
        );

      }
      else {

        await createWorker(workerData);

      }


      onCreated();

      onClose();


      setForm(initialForm);


    } catch(err){

      console.error(err);

      alert("Failed to save worker");

    }

  };



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

      <div className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">


        <h2 className="mb-6 text-3xl font-bold">

          {worker ? "Edit Worker" : "Add Worker"}

        </h2>



        <form
          onSubmit={handleSubmit}
          className="grid gap-5 md:grid-cols-2"
        >


          <input
            name="name"
            placeholder="Worker Name"
            value={form.name}
            onChange={handleChange}
            className="rounded-xl border p-3"
            required
          />


          <input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="rounded-xl border p-3"
            required
          />


          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />


          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />



          <input
            name="cnic"
            placeholder="CNIC Number"
            value={form.cnic}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />



          <input
            name="salary"
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />



          <input
            name="assignedProject"
            placeholder="Assigned Project"
            value={form.assignedProject}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />



          <select
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            className="rounded-xl border p-3"
          >

            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>

          </select>



          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-xl border p-3"
          >

            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>

          </select>




          <div className="md:col-span-2 flex justify-end gap-3">


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

              {worker ? "Update Worker" : "Save Worker"}

            </button>


          </div>


        </form>


      </div>

    </div>

  );

}