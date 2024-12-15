"use server";

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SilderSession } from "./nav/silder-session"
import { SilderMass } from "./nav/silder-mass"
import { SilderUser } from "./nav/slider-user"
import { auth } from "@/auth"

const data = {
  navMain: [
    {
      title: "主页",
      url: "/",
    },
  ],
}

export async function ConversationSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const session = await auth()

  const user = session?.user;

  const userId = user?.id ? String(user.id) : "";
  const userName = user?.name || "";
  const nickname = user?.nickname || "";

  return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
        </SidebarHeader>
        <SidebarContent>
          <SilderMass items={data.navMain} />
          <SilderSession userId={userId} />
        </SidebarContent>
        <SidebarFooter>
          {/* 账户 */}
          <SilderUser user={{ id: userId, name: userName, nickname: nickname }} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
  )
}