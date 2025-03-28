"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createCategory = async (data: FieldValues) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
            method: "POST",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value
            },
            body: data
        })
        revalidateTag("CATEGORY")
        return res.json();
    } catch (error: any) {
        return Error(error)
    }

}

export const getAllCategories = async () => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
            next: {
                tags: ["CATEGORY"]
            }
        })
        return res.json()

    } catch (error: any) {
        return Error(error)
    }

}


// Delete Category

export const deleteCategory = async (categoryId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`, {
            method: "DELETE",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value
            },
    
        })
        revalidateTag("CATEGORY")
        return res.json()  
    } catch (error : any) {
        return Error(error)
    }
}