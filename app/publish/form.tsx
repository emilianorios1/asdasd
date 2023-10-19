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
  picture: z.any()
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
      title: ""
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const cloudinaryImageData = new FormData();
    cloudinaryImageData.append("file", values.picture);
    cloudinaryImageData.append("upload_preset", "aakc5a85");
    const uploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/dsw-publications/image/upload",
      {
        method: "POST",
        body: cloudinaryImageData,
      }
    );
    const uploadedImageData = await uploadResponse.json();
    const imageUrl = uploadedImageData.secure_url;
    console.log(imageUrl);
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
          name="picture"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Picture"
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
