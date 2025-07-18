"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),

  category: z.string().trim().min(1, { message: "Category is required" }),

  tags: z.string().trim().min(1, { message: "At least one tag is required" }),

  duration: z
    .number()
    .min(1, { message: "Minimum duration is 1 hour" })
    .max(24, { message: "Maximum duration is 24 hours" }),

  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(200, { message: "Description can't exceed 200 characters" }),
});

import { IUserProps } from "@/types/user";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";
import { createDebate } from "@/services/debate";
import { useRouter } from "next/navigation";

const CreateDebateForm = ({ session }: { session: IUserProps | null }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      tags: "",
      duration: 0,
      description: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const tags = values?.tags?.split(",");

    const payload = {
      ...values,
      tags,
      userEmail: session?.user?.email,
    };

    try {
      const res = await createDebate(payload);
      if (res?.success) {
        form.reset();
        toast.success(res?.message);
        router.push(`/debates/${res?.data?.id}`);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!");
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8 max-w-3xl mx-auto p-6 md:p-8 lg:p-10 bg-gray-50 rounded-lg shadow-md dark:bg-gray-800"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="text"
                        {...field}
                        value={field?.value || ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="text"
                        {...field}
                        value={field?.value || ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. tag1, tag2, tag3"
                        type="text"
                        {...field}
                        value={field?.value || ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (Hour)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder=""
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? null : Number(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="resize-none"
                    {...field}
                    value={field?.value || ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            Submit {isSubmitting && <ButtonLoader />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateDebateForm;
