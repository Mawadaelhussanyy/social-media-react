import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { inputProps } from "../utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../services/authServices";
import { signInSchema } from "../schemas/signInSchema";
import { authContext } from "../contexts/authContext";

export default function SignIn() {
  const { setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "mawada@gmail.com",
      password: "Mawada123@",
    },
    resolver: zodResolver(signInSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function signin(values: any) {
    try {
      setIsLoading(true);
      setMessage("");

      const response = await AuthServices.signin(values);

      localStorage.setItem("token", response.data.token);

      setIsLoggedIn(response.data.token);

      navigate("/");
    } catch (error: any) {
      console.log("Error:", error.response?.data);

      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Sign in to your Circle account
        </p>

        <form
          onSubmit={handleSubmit(signin)}
          className="flex flex-col gap-4"
        >
          <Input
            {...register("email")}
            {...inputProps()}
            label="Email"
            placeholder="Enter your email"
            type="email"
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />

          <Input
            {...register("password")}
            {...inputProps()}
            label="Password"
            placeholder="Enter your password"
            type="password"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          {message && (
            <p className="text-center text-sm">
              {message}
            </p>
          )}
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span className="text-primary cursor-pointer font-medium">
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}