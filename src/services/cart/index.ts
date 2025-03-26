"use server";
import { IOrder } from "@/types/order";
import { cookies } from "next/headers";

// add order to the database
export const createOrder = async (order: IOrder): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};