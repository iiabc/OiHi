"use client";

import { MoreHorizontal, Trash2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClientBupiUrl } from "@/utils/api/api";

// 定义会话数据的类型
interface Session {
  id: number;
  title: string;
  date: string;
}

export function SilderSession({
  userId,
}: {
  userId: string;
}) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 请求获取会话列表
    const fetchSessions = async () => {
      if (!userId) return;

      try {
        const response = await fetch(apiClientBupiUrl(`/users/${userId}/sessions`));
        if (response.ok) {
          const data = await response.json();
          setSessions(data);
        }
      } catch (error) {
      }
    };

    fetchSessions();
  }, [userId]);

  // 跳转到动态路由会话页面
  const handleSessionClick = (sessionId: number) => {
    router.push(`/conversation/${sessionId}`);
  };

  // 请求创建新会话
  const createSession = async () => {
    try {
      const response = await fetch(apiClientBupiUrl(`/users/${userId}/sessions`), {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        setSessions((prevSessions) => [
          ...prevSessions,
          {
            id: data.session_id,
            title: "新会话",
            date: new Date().toLocaleString(),
          },
        ]);
      }
    } catch (error) {
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="font-semibold text-lg text-foreground mb-4">
        会话记录
      </SidebarGroupLabel>

      {/* 添加新会话按钮 */}
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
        onClick={createSession}
      >
        <Plus size={16} /> 创建新会话
      </button>

      <SidebarMenu>
        {sessions.map((item) => (
          <SidebarMenuItem key={item.id}>
            {/* 会话按钮区域 */}
            <SidebarMenuButton
              asChild
              className="border border-gray-300 rounded-lg shadow-sm min-h-20"
            >
              <a
                href="#"
                className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                onClick={() => handleSessionClick(item.id)} // 点击会话跳转到聊天页面
              >
                <div className="flex w-full items-center gap-2">
                  <span className="font-semibold">{item.title}</span>
                </div>
                <span className="font-medium mr-auto">{item.date}</span>
              </a>
            </SidebarMenuButton>

            {/* 下拉菜单 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover className="text-gray-500 hover:text-gray-800">
                  <MoreHorizontal />
                  <span className="sr-only">更多</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 bg-white border border-gray-200 shadow-lg rounded-md"
                side="right"
                align="start"
              >
                <DropdownMenuItem className="hover:bg-gray-200">
                  <Trash2 className="text-muted-foreground mr-2" />
                  <span>删除记录</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
