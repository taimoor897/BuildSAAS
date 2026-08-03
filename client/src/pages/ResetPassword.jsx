import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert(res.data.message);

      navigate("/");

    } catch (err) {
      alert(
        err.response?.data?.message || "Reset failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          <input
            type="password"
            required
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 p-3 text-white"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>

      </div>

    </div>
  );
}