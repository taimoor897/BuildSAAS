import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layout/AuthLayout";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { loginUser } from "../../pages/services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      setError("");
  
      const data = await loginUser(form);
  
      login(data.user, data.token);
  
      if (data.user.role === "Worker") {
        navigate("/inventory");
      } else {
        navigate("/dashboard");
      }
  
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <h1 className="mb-2 text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-gray-500">
          Sign in to BuildPilot AI
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@email.com"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          <Button type="submit">
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">

<Link
  to="/forgot-password"
  className="text-slate-500 hover:text-blue-600 hover:underline"
>
  Forgot Password?
</Link>

<p>
  Don't have an account?{" "}
  <Link
    to="/register"
    className="font-semibold text-blue-600 hover:underline"
  >
    Register
  </Link>
</p>

</div>
      </Card>
    </AuthLayout>
  );
}