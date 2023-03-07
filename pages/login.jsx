/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LogInPage = () => {
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.set("username", data.get("username"));
    data.set("password", data.get("password"));
    console.dir(
      `USERNAME: ${data.get("username")} PASSWORD: ${data.get("password")}`
    );
    const res = await signIn("credentials", {
      redirect: false,
      username: data.get("username"),
      password: data.get("password"),
    });

    if (!res.ok) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่พบข้อมูลหรือข้อมูลผู้ใช้งานไม่ถูกต้อง",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => {
          router.reload();
        },
      });
    }

    if (res.ok) {
      toast({
        title: `สวัสดี ${data.get("username")}`,
        description: `ยินดีต้อนรับเข้าสู่ระบบ ${process.env.APP_NAME}.`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => router.push("/"),
      });
    }
  };
  return (
    <>
      <Head>
        <title>เข้าสู่ระบบ</title>
        <meta
          name="description"
          content={`ยินดีต้อนรับเข้าสู่ระบบ ${process.env.APP_NAME}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=rose&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {/* Or{" "}
              <a
                href="#"
                className="font-medium text-rose-600 hover:text-rose-500"
              >
                start your 14-day free trial
              </a> */}
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            method="post"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username-address" className="sr-only">
                  UserName
                </label>
                <input
                  id="username-address"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-rose-600 hover:text-rose-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-rose-500 group-hover:text-rose-400"
                    aria-hidden="true"
                  />
                </span>
                เข้าสู่ระบบ
              </button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
