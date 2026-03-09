"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (mode: "signIn" | "signUp") => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const action =
      mode === "signIn"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { error } = await action;

    setIsSubmitting(false);

    if (!error) {
      router.push("/messages");
    } else {
      setErrorMessage(error.message);
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-lg ring-1 ring-slate-200 backdrop-blur">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Welcome to GeoMessage
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with your email to see your messages.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void handleAuth("signIn");
          }}
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-800"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-800"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <div className="mt-4 flex flex-col gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              className="w-full"
              onClick={() => void handleAuth("signUp")}
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
