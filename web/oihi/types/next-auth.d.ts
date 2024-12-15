import { DefaultSession } from "next-auth";

// 扩展 Session 和 User 类型
declare module "next-auth" {
  interface User {
    nickname: string; // 昵称
    id: string;
    token: string;  // token
  }

  interface Session {
    user: User & DefaultSession["user"];  // 合并 DefaultSession 的 user 属性
  }
}
