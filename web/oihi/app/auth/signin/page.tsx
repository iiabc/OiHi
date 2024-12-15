"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { BentoAuth } from "@/components/content/auth-bento";
import { registerRequest } from "@/utils/api/auth";

export default function SigninPage() {
  const form = useForm();
  const registerForm = useForm();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    // 如果是凭证登录
    if (data.password) {
      try {
        const res = await signIn("credentials", {
          redirectTo: "/",
          name: data.name,
          password: data.password,
          redirect: false,
        });

        if (res?.error) {
          form.reset({
            name: data.name,
            password: "",
          });
          toast({
            title: "登录失败",
            description: "用户名或密码错误",
            variant: "destructive",
            duration: 3000,
          });
        } else {
          router.refresh() // 解决未跳转问题
          router.push("/conversation");
        }
      } catch (error) {
        toast({
          title: "服务器发生错误",
          description: "未知错误",
          variant: "destructive",
        });
      }
    }
  };

  const onSubmitRegister = async (data: any) => {
    const { name, nickname, password, confirmPassword } = data;
    try {
      const response = await registerRequest(name, nickname, password, confirmPassword);
      if (response.error) {
        toast({
          title: "注册失败",
          description: response.error,
          variant: "destructive",
          duration: 3000,
        });
      } else if (response.success) {
        toast({
          title: "注册成功",
          description: "您的账户已成功创建，请前往登录页面登录",
          duration: 5000,
        })
      }else {
        toast({
          title: "服务器内部错误",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "注册失败",
        description: "服务器内部错误",
        variant: "destructive",
        duration: 3000,
      });
    }
    registerForm.reset({
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* 左侧 */}
      <div className="hidden sm:flex sm:w-1/2 flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-blue-500 p-8">
        <BentoAuth />
      </div>

      {/* 右侧 */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-8">
        <Tabs defaultValue="login" className="w-full sm:w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="login"
              className="border-b-2 border-transparent hover:border-b-2 hover:border-indigo-500"
            >
              登录
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="border-b-2 border-transparent hover:border-b-2 hover:border-indigo-500"
            >
              注册
            </TabsTrigger>
          </TabsList>

          {/* 登录卡 */}
          <TabsContent value="login">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>登录</CardTitle>
                <CardDescription>
                  欢迎回来！请输入您的用户名和密码以登录
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>用户名</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="输入用户名"
                              type="text"
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>密码</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="输入密码"
                              type="password"
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">
                      登录
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          {/* 注册卡 */}
          <TabsContent value="register">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>注册</CardTitle>
                <CardDescription>
                  创建一个新帐户以开始使用我们的服务
                </CardDescription>
              </CardHeader>
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onSubmitRegister)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>用户名</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="输入用户名"
                              type="text"
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="nickname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>昵称</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="输入昵称"
                              type="text"
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>密码</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="输入密码"
                              type="password"
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>确认密码</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="确认密码"
                              type="password"
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">
                      注册
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
