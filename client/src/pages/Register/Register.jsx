import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    role: "Manager",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/~`]).{8,}$/;
  
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validatePassword(form.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }
  
    try {
      setLoading(true);
      setError("");
  
      await registerUser(form);
  
      toast.success("Welcome to BuildPilot AI 🚀");
  
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <h1 className="mb-2 text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-8 text-gray-500">
          Welcome to BuildPilot AI
        </p>

        {error && (
          <div className="mb-5 rounded-lg bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <Input
            label="Full Name"
            name="name"
            placeholder="John Smith"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            placeholder="john@email.com"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Company"
            name="company"
            placeholder="ABC Builders"
            value={form.company}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              Role
            </label>

            <select
  name="role"
  value={form.role}
  onChange={handleChange}
  className="w-full rounded-xl border border-gray-300 p-3"
>
  <option value="Manager">
    Manager
  </option>

  <option value="Worker">
    Worker
  </option>

</select>
          </div>

          <Button type="submit">
            {loading ? "Creating..." : "Create Account"}
          </Button>

        </form>

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-blue-600"
          >
            Login
          </Link>
        </p>

      </Card>
    </AuthLayout>
  );
}