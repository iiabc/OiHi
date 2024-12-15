// middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

/**
 * 认证中间件
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export default auth((req) => {
  // 获取当前访问的路由
  const pathname = req.nextUrl.pathname
  
  // 如果没有认证信息且路由不满足，则重定向到 "/signin"
  if (!req.auth && pathname !== "/" && pathname !== "/auth/signin") {
    const loginUrl = new URL("/auth/signin", req.nextUrl.origin)
    return NextResponse.redirect(loginUrl)
  }
})
