"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiClientBupiUrl } from "@/utils/api/api";

// 定义消息的类型
type Message = {
  id: number;
  content: string;
  role: "AI" | "User"; // 消息的发送者
};

const ChatConversation = ({ params }: { params: { sessionId: string } }) => {
  const { sessionId } = params; // 获取动态路由的 sessionId
  const { data: session } = useSession(); // 获取当前会话数据
  const [messages, setMessages] = useState<Message[]>([]);
  const { control, handleSubmit, reset } = useForm<{ message: string }>({
    defaultValues: { message: "" },
  });
  const [isSending, setIsSending] = useState(false); // 标记请求是否正在发送

  // 确保用户已登录并且会话信息可用
  if (!session?.user?.id) {
    return <div>加载用户信息...</div>;
  }

  const userId = session.user.id; // 获取当前用户的 ID

  // 获取消息列表
  useEffect(() => {
    // 确保 sessionId 和 userId 在有效时才执行
    if (!sessionId || !userId) return;
  
    const fetchMessages = async () => {
      try {
        const response = await fetch(apiClientBupiUrl(`/users/${userId}/sessions/${sessionId}/messages`));
        if (response.ok) {
          const data = await response.json();
          setMessages(data); // 更新消息
        }
      } catch (error) {

      }
    };
  
    fetchMessages();
  }, [sessionId, userId]);

  // 处理发送消息
  const onSubmit = async (data: { message: string }) => {
  if (!data.message) return;

  // 开始发送请求，禁用按钮
  setIsSending(true);

  // 发送消息到后端
  try {
    const response = await fetch(apiClientBupiUrl(`/users/${userId}/sessions/${sessionId}/messages`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: data.message,
      }),
    });

    if (response.ok) {
      // 获取返回的完整消息列表（包括用户和 AI 消息）
      const newMessages: Message[] = await response.json();
      setMessages(newMessages);  // 更新消息列表

      // 清空输入框
      reset({ message: "" });
    }
  } catch (error) {
  } finally {
    // 无论请求成功与否，都会在请求结束后启用按钮
    setIsSending(false);
  }
};


  return (
    <div className="flex flex-col gap-4 p-4">
      <Card className="w-2/3 mx-auto rounded-xl bg-muted/50 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Oí Hi ! 😯👋 AI</CardTitle>
          <CardDescription>请与我们的智能助手进行对话！</CardDescription>
        </CardHeader>
      </Card>

      <Card className="w-2/3 mx-auto rounded-xl bg-muted/50 overflow-hidden">
        <CardContent>
          <ScrollArea className="h-[60vh] overflow-y-auto">
            <div className="flex flex-col gap-4 m-10">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "AI" ? "justify-start" : "justify-end"}`}
                >
                  <div className="max-w-xs p-4 rounded-xl bg-white shadow-md">
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="w-2/3 mx-auto rounded-xl bg-muted/50 overflow-hidden">
        <CardFooter>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4 flex gap-2 items-center">
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="输入消息..."
                  className="flex-1"
                  required
                />
              )}
            />
            <Button type="submit" className="w-auto" disabled={isSending}>
              发送
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatConversation;
