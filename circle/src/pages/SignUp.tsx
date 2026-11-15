import {
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { inputProps } from "../utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import AuthServices from "../services/authServices";
import { signUpSchema } from "../schemas/signUpSchema";

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Mawada",
      email: "mawada@gmail.com",
      dateOfBirth: "2005-08-20",
      gender: "female",
      password: "Mawada123@",
      rePassword: "Mawada123@",
    },
    resolver: zodResolver(signUpSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function signup(values: any) {
    try {
      setIsLoading(true);
      setMessage("");

      console.log("Form values:", values);

      const response = await AuthServices.signup(values);

      console.log("Response:", response);

      setMessage("Account created successfully!");
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
          Create your account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Join Circle and connect with others
        </p>

        <form
          onSubmit={handleSubmit(signup)}
          className="flex flex-col gap-4"
        >
          <Input
            {...register("name")}
            {...inputProps()}
            label="Username"
            placeholder="Enter your username"
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
          />

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
            {...register("dateOfBirth")}
            {...inputProps()}
            label="Date of Birth"
            type="date"
            errorMessage={errors.dateOfBirth?.message}
            isInvalid={!!errors.dateOfBirth}
          />

          <Select
            {...register("gender")}
            {...inputProps()}
            label="Gender"
            placeholder="Select your gender"
            errorMessage={errors.gender?.message}
            isInvalid={!!errors.gender}
          >
            <SelectItem key="male">Male</SelectItem>
            <SelectItem key="female">Female</SelectItem>
          </Select>

          <Input
            {...register("password")}
            {...inputProps()}
            label="Password"
            placeholder="Enter your password"
            type="password"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />

          <Input
            {...register("rePassword")}
            {...inputProps()}
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            errorMessage={errors.rePassword?.message}
            isInvalid={!!errors.rePassword}
          />

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>

          {message && (
            <p className="text-center text-sm">
              {message}
            </p>
          )}
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-primary cursor-pointer font-medium">
            Sign In
          </span>
        </p>

      </div>
    </div>
  );
}