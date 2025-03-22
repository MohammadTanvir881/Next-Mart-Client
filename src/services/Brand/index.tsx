"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createBrand = async (data: FieldValues) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
            method: "POST",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value
            },
            body: data
        })

        revalidateTag("Brand")

        return res.json();
    } catch (error: any) {
        return Error(error)
    }

}

export const getAllBrands = async () => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
            next: {
                tags: ["Brand"]
            }
        })
        return res.json()

    } catch (error: any) {
        return Error(error)
    }

}