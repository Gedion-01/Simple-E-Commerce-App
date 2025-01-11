"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/lib/auth_handler";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { registerSchema, RegisterFormData } from "@/lib/validation";

function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      reset();
      router.push("/login");
    } catch (err: any) {
      setServerError(err?.response?.data?.message || "Registration failed");
    }
  };

  // Watch password field for password strength indicator
  const password = watch("password", "");

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(password);
  const passwordStrengthLabels = [
    "Too Short",
    "Weak",
    "Fair",
    "Good",
    "Strong",
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className={`mt-1 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Controller
            name="role"
            control={control}
            defaultValue="customer"
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger
                  className={`mt-1 ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your-email@example.com"
            {...register("email")}
            className={`mt-1 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
            className={`mt-1 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {password && (
            <div className="mt-2">
              <p>
                Password Strength:{" "}
                {passwordStrengthLabels[passwordStrength - 1]}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    passwordStrength <= 2
                      ? "bg-red-500"
                      : passwordStrength === 3
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="********"
            {...register("confirmPassword")}
            className={`mt-1 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline">
          Login here
        </a>
      </p>
      <div>
        {serverError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
