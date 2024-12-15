import { apiClientSecurityUrl, apiSecurityUrl } from "./api";
import { addAuthHeader } from "./server/token";

// 登录请求
export const loginRequest = async (name: string, password: string) => {
  try {
    const response = await fetch(apiSecurityUrl("/auth/login"), {
      method: "POST",
      headers: await addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        // 用户名
        name,
        // 密码
        password,
      }),
    });

    const data = await response.json();

    if (data.code !== 200) {
      throw new Error("登录失败");
    }

    return data; // 返回后端的响应数据
  } catch (error) {
    throw new Error("服务器认证内部错误");
  }
};

// 注册请求
export const registerRequest = async (
  name: string,
  nickname: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    // 检查密码是否匹配
    if (password !== confirmPassword) {
      return {
        error: "密码不一致",
      }
    }

    const url = apiClientSecurityUrl("/auth/register")
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // 用户名
        name,
        // 昵称
        nickname,
        // 密码
        password
      }),
    });

    const data = await response.json();

    if (data.code === 200) {
      return {
        success: true
      }
    }

    return {
      error: data.msg
    }

  } catch (error) {
    return {
      error: "服务器内部错误"
    }
  }
};

// 登出请求
export const logoutRequest = async (token: string | undefined) => {
  try {
    const response = await fetch(apiSecurityUrl("/auth/logout"), {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();
  
    if (data.code !== 200) {
      return {
        error: "请求登出失败"
      }
    }
  } catch (error) {
    return {
      error: "服务器内部错误"
    }
  }
}
