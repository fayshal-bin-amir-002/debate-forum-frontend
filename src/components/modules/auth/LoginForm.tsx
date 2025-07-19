"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/ui/PasswordInput";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";
import { GoogleIcon } from "@/assets/GoogleIcon";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address." }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be minimum 6 characters long." }),
});

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: callbackUrl,
      });

      if (res?.ok) {
        toast.success(res?.status || "Login successful");
      } else {
        toast.error("Login failed. Please check credentials.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    }
  }

  async function handleGoogleLogin() {
    try {
      signIn("google", {
        callbackUrl: callbackUrl,
      });
    } catch (error: any) {
      toast.error(error?.message || "Google login failed");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-6 w-full mx-auto max-w-md"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    {...field}
                    value={field?.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="off"
                    placeholder="******"
                    {...field}
                    value={field?.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3">
            <div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Login
                {isSubmitting && <ButtonLoader />}
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <hr className="flex-grow border-gray-300" />
              <span className="text-sm text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2"
            >
              <GoogleIcon />
              Continue with Google
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
