import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import toast, { Toaster } from "react-hot-toast";
import loginImage from "../../assets/hero.png";

export const Login = () => {
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.setItem("token", response.data.token);

      toast.custom((t) => (
        <div className="flex min-h-screen justify-center items-center">
          <div
            className={`bg-white shadow-md rounded-lg w-[300px] px-5 py-4 transition-all duration-300 justify-center items-center ${
              t.visible ? "animate-enter" : "animate-leave"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-green-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                Login Berhasil
              </h3>
              <p className="text-sm text-gray-600">
                Selamat, Anda berhasil login.
              </p>
            </div>
          </div>
        </div>
      ));

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.custom((t) => (
        <div className="flex min-h-screen justify-center items-center">
          <div
            className={`bg-white shadow-md rounded-lg w-[300px] px-5 py-4 transition-all duration-300 justify-center items-center ${
              t.visible ? "animate-enter" : "animate-leave"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-red-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                Login Gagal
              </h3>
              <p className="text-sm text-gray-600">
                {error.response?.status === 401
                  ? "Email atau password salah."
                  : "Terjadi kesalahan, coba lagi nanti."}
              </p>
            </div>
          </div>
        </div>
      ));

      setTimeout(() => {
        toast.dismiss();
      }, 1000);
    } finally {
      toast.dismiss();
    }

    setFormData({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Toaster />

      {/* Left - Form Section */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 md:px-16 py-14">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              CodeTech Login
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Silahkan login untuk melanjutkan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <Button
              type="submit"
              buttonName="Sign In"
              className="w-full py-2 text-sm bg-black hover:bg-indigo-700 transition text-white rounded-lg font-medium"
            />
          </form>

          <p className="text-xs text-gray-400 text-center pt-4">
            © 2025 CodeTech. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right - Image (hanya tampil di md ke atas) */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src={loginImage}
          alt="Login visual"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center px-10 text-white bg-opacity-40">
          <div className="text-center max-w-md">
            <div className="text-5xl font-bold mb-4 leading-none">“</div>
            <p className="text-lg font-light italic">
              "Setiap baris kode, setiap desain, adalah bagian dari perubahan.
              Ayo mulai hari ini dengan semangat!"
            </p>
            <p className="mt-4 text-sm">— CodeTech</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
