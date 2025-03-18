"use server";

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

        return res.json();
    } catch (error: any) {
        return Error(error)
    }

}

export const getAllCategories = async () => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`)
        return res.json()

    } catch (error: any) {
        return Error(error)
    }

}