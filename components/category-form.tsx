"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
type FormData = {
  name: string
}

export function CategoryForm() {
  const {register, handleSubmit, formState: {errors}, watch} = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = data => { 
    console.log(data);
    fetch('http://localhost:3001/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Set the content type to JSON
      },
      body: JSON.stringify( data ),
    })
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col space-y-3 ">
      <Input defaultValue="coupe" {...register("name", {required: true})} />
      {errors.name && "invalid name"}
      <Button type="submit">Agregar</Button>
    </form>
  )
}