import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { userLogin } from "../api/authApis";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  username: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const { login } = useAuth();
  const navigate = useNavigate()

  const [loginError, setLoginError] = useState<string>("");

  const onSubmit = async (data: LoginForm) => {
    setLoginError(""); // reset previous error
    try {
      const res = await userLogin(data.username, data.password);
      console.log("Login success:", res);

      // Store tokens
      localStorage.setItem("access_token", res.access);
      localStorage.setItem("refresh_token", res.refresh);
      login({ username: res.role, role: res.username });

      // Redirect or do something on success
      navigate("/");

    } catch (err: any) {
      console.log("Login failed:", err.detail || err.message);
      setLoginError(err.detail || "Invalid username or password .");
    }
  };

  return (
    <div className="mt-9 max-w-sm rounded-lg mx-auto">
      <h1 className="font-medium mb-4">Enter your email to join or sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Username Field */}
        <div>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-2 py-1 rounded text-black bg-blue-50 text-[11px] focus:outline-none focus:bg-blue-200 font-medium"
            {...register("username", { required: "Username is required!" })}
          />
          {errors.username && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-2 py-1 rounded text-black bg-blue-50 text-[11px] focus:outline-none focus:bg-blue-200 font-medium"
            {...register("password", { required: "Password is required!" })}
          />
          {errors.password && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-4 rounded hover:bg-gray-700"
          >
            Login
          </button>
        </div>

        {/* Display Login Error */}
        {loginError && (
          <div className="flex items-start">
            <p className="text-red-500 text-[11px] mt-1 font-semibold">
              {loginError}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
