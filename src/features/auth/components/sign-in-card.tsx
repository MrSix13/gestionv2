"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const SignInCard = () => {
  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const loading = toast.loading("Cargando....");
    const promiseMutate = mutate(
      { json: values },
      {
        onSuccess: (data) => {
          toast.dismiss(loading);
          data.status === 404
            ? toast.error(data.message)
            : (toast.success(data.message), router.push("/"));
        },

        onError: (error: any) => {
          toast.dismiss(loading);
          toast.error(error);
        },
      }
    );

    // console.log("promisemutate:", promiseMutate);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardContent className="">
          <Image
            src={"/logo_manager_digital.png"}
            alt="logo"
            width={250}
            height={56}
          />
        </CardContent>
        <CardTitle className="text-2xl">
          Sistema de Gestión
          <CardDescription>Bienvenido</CardDescription>
        </CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Ingresar Correo"
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Ingresar Contraseña"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} size={"lg"} className="w-full">
              Ingresar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
