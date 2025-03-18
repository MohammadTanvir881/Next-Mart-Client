"use client"
import { Button } from "@/components/ui/button"
import NMImageUploader from "@/components/ui/core/NMImageUploader"
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createCategory } from "@/services/Category"
import { ICategory } from "@/types"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"




const CreateCategoryModal = () => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const form = useForm();
    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data))
            formData.append("icon", imageFiles[0] as File)

            const res = await createCategory(formData);
            console.log(res)
            if (res?.success) {
                toast.success(res?.message)
            } else {
                toast.error(res?.message)
            }

        } catch (error: any) {
            console.error(error)
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Category</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>

                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 mt-5">

                        <FormField

                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="h-36"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            {
                                imagePreview.length > 0 ?
                                    <ImagePreviewer
                                        setImageFiles={setImageFiles}
                                        imagePreview={imagePreview}
                                        setImagePreview={setImagePreview}
                                        className="w-full">

                                    </ImagePreviewer> :
                                    <NMImageUploader
                                        imageFiles={imageFiles}
                                        setImageFiles={setImageFiles}
                                        setImagePreview={setImagePreview}
                                        label="Upload icon"
                                    ></NMImageUploader>


                            }
                        </div>



                        <Button

                            type="submit"
                            className="mt-5 w-full"
                        >
                            {isSubmitting ? "Creating...." : "Create"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default CreateCategoryModal