import { useState } from "react";
import { Link } from "react-router-dom";
import api from "./services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", {
        email,
      });

      alert(res.data.message);

      setEmail("");

    } catch (err) {
      alert(
        err.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="mt-2 text-slate-500">
          Enter your email to receive a reset link.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full rounded-xl border p-3"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 p-3 text-white"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <Link
          to="/"
          className="mt-5 block text-center text-blue-600"
        >
          Back to Login
        </Link>

      </div>

    </div>
  );
}