"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Category } from "@/interfaces/category"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
    },
  })

  async function onSubmit(form_values: z.infer<typeof formSchema>) {
    if (category) {
      await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/api/categories/" + category.id,
        {
          method: "PUT", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form_values),
        }
      );
    } else {
      await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form_values),
      });
    }
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                Category name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <DialogClose asChild>
            <Button type="submit">Submit</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  )
}
