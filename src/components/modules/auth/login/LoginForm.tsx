"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Logo from "@/assets/svgs/Logo";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginValidation";
import { loginUser, recaptchaTokenVerify } from "@/services/AuthServices";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/providers/Providers";


export default function LoginForm() {
    const [recaptchaStatus, setRecaptchaStatus] = useState(false);
    const {setIsLoading}= useUser();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath");
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(loginSchema)
    });

    const {
        formState: { isSubmitting },
    } = form;



    const handleRecaptcha = async (value: string | null) => {
        try {
            const res = await recaptchaTokenVerify(value as string);
            if (res?.success) {
                setRecaptchaStatus(true)
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await loginUser(data);
            console.log(res);
            if (res?.success) {
                toast.success(res?.message);
                if (redirect) {
                    router.push(redirect)
                    setIsLoading(true);
                    // window.location.reload();
                } else {
                    router.push("/profile")
                }
            }

            else {
                toast.error(res?.message)
            }
        } catch (error: any) {
            console.log(error);

        }
    };

    return (
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
            <div className="flex items-center space-x-4 ">
                <Logo />
                <div>
                    <h1 className="text-xl font-semibold">Login</h1>
                    <p className="font-extralight text-sm text-gray-600">
                        Join us today and start your journey!
                    </p>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 mt-5">

                    <FormField

                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string} onChange={handleRecaptcha}></ReCAPTCHA>

                    <Button
                        disabled={!recaptchaStatus}
                        type="submit"
                        className="mt-5 w-full"
                    >
                        {isSubmitting ? "Loging in...." : "Login"}
                    </Button>
                </form>
            </Form>
            <p className="text-sm text-gray-600 text-center my-3">
                Do Not Have Any Account ?
                <Link href="/register" className="text-primary">
                    Register
                </Link>
            </p>
        </div>
    );
}