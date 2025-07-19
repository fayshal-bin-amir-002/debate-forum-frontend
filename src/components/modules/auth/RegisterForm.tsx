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
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";
import { GoogleIcon } from "@/assets/GoogleIcon";
import { registerUser } from "@/services/auth";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must be less than 50 characters." }),

  email: z.string().trim().email({ message: "Invalid email address." }),

  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be minimum 6 characters long." }),

  image: z.string().optional(),
});

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await registerUser(values);

      if (res?.success) {
        const loginResult = await signIn("credentials", {
          email: res?.data?.email,
          password: values?.password,
          redirect: true,
          callbackUrl: callbackUrl,
        });

        form.reset();
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.error(err);
    }
  }

  async function handleGoogleRegister() {
    try {
      signIn("google", {
        callbackUrl: callbackUrl,
      });
    } catch (error: any) {
      toast.error(error?.message || "Google register failed");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 w-full mx-auto max-w-md"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field?.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field?.value || ""} />
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

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/image.jpg"
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
                Register
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
              onClick={handleGoogleRegister}
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

export default RegisterForm;
