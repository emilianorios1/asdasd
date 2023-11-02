"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Brand } from "@/interfaces/backend-interfaces"
import { BoatModel } from "@/interfaces/backend-interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
// Asegúrate de importar la interfaz correcta
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import ImageInputCloudinary from "@/components/ui/image-input-cloudinary"
import { Label } from "@/components/ui/label"
import Image from "next/image"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "model name must be at least 2 characters.",
  }),
  brandId: z.number(),
  engineSize: z.coerce.number(),
  isOutboard: z.string().min(2, {
    message: "Yes or No",
  }),
})

export function DialogBoatModelForm(
  { model,brands }: { model?: BoatModel, brands: Brand[] },
) {
  const router = useRouter()
  let [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      engineSize: 0,
      isOutboard: "",
    },
  })

  useEffect(() => {
    if (open && model) {
      // Reset the form when the dialog opens
      form.reset({
        name: model?.name || "",
        brandId: model?.brandId || NaN,
        engineSize: model?.engineSize || NaN,
        isOutboard: model?.isOutboard || "Yes",
      })
    }
  }, [open, form, model])

  async function onSubmit(form_values: z.infer<typeof formSchema>) {
    console.log(form_values)
    try {
      let response = new Response()
      if (model) {
        response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/api/boatModels/" + model.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form_values),
          }
        )
      } else {
        response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/api/boatModels",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form_values),
          }
        )
      }

      if (!response.ok) {
        const responseData = await response.json()
        toast({
          description: responseData.error,
          title: "Error",
          variant: "destructive",
        })
      } else {
        setOpen(false)
        router.refresh()
        toast({
          title: "Success",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        description: "Unexpected error",
        title: "Error",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>{model ? `Edit` : "Add New"}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {model ? `Edit ${model.name}` : "Add New"}
            </DialogTitle>
            <DialogDescription>
              You are about to {model ? "edit" : "add"}{" "}
              {model ? model.name : "a new model"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
             <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue  placeholder="Select model brand." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[10rem]">
                      {brands.map((brand) => {
                        return (
                          <SelectItem
                            key={brand.id}
                            value={brand.id.toString()}
                          >
                            {brand.name}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="engineSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engine Size</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Engine Size" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isOutboard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is outboard</FormLabel>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Is outboard..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[10rem] overflow-y-scroll">
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <Button type="submit">Submit</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  )
}
