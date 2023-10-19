"use client"

import { useTransition } from "react"
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


const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  image: z.any()
  .refine(
    (file) => file?.size <= 500000, 
    `Max image size is 5MB.`
    )
  .refine(
    (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  )
})

export function PublishForm() {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: new File([], "")
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const imageData = new FormData();
    imageData.set("image", values.image);
    const imageResponse = await fetch("/api/image_upload",
      {
        method: "POST",
        body: imageData,
      }
    );
    const imageResponseJson = await imageResponse.json();
    console.log(imageResponseJson.url);

    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publication title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                Publication title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Image"
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
/>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
