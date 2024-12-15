import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginRequest } from "./utils/api/auth";

// 自定义错误类
export class UserDoesNotExistError extends CredentialsSignin {
  code = "AuthError";
  message = "User does not exist - Please check credentials";
  stack = ""; // 屏蔽错误消息
}

// 用户或者密码为空
export class UserOrPasswordEmptyError extends CredentialsSignin {
  code = "AuthError";
  message = "User or password is empty";
  stack = ""; // 屏蔽错误消息
}

export class PasswordInccorectError extends CredentialsSignin {
  code = "AuthError";
  message = "Password is incorrect - Please check credentials";
  stack = ""; // 屏蔽错误消息
}

const providers = [
  Credentials({
    credentials: {
      name: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      try {
        const name = credentials?.name;
        const password = credentials?.password;

        if (typeof name !== "string" || typeof password !== "string") {
          throw new UserOrPasswordEmptyError();
        }

        // 调用 loginRequest 发送登录请求
        const response = await loginRequest(name, password);

        // 登录成功后返回信息
        if (response && response.data) {
          const user = {
            id: response.data.id,
            name: response.data.name,
            nickname: response.data.nickname,
            token: response.data.auth
          }
          return user;
        } else {
          throw new PasswordInccorectError();
        }
      } catch (error) {
        throw new UserDoesNotExistError();
      }
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/auth/signin",
  },

  // 使用 JWT 会话策略
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.accessToken = user.token;
        token.nickname = user.nickname;
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = typeof token.userId === "string" ? token.userId : ""
      session.user.name = token.name ?? ""
      session.user.token = typeof token.accessToken === "string" ? token.accessToken : "";
      session.user.nickname = typeof token.nickname === "string" ? token.nickname : "";
      return session;
    },
  },
});
