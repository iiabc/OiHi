import { auth } from "@/auth";

// 将 Token 附加到请求头中
export const addAuthHeader = async (headers: HeadersInit = {}) => {
  const session = await auth();

  // 获取token
  const token = session?.user?.token;

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};
