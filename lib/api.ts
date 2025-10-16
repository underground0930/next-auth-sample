import axios from "axios";

// APIクライアントの設定
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ユーザー型定義
export type User = {
  id: string;
  name: string;
  email: string;
};

// ログイン認証情報の型
export type LoginCredentials = {
  id: string;
  password: string;
};

// API関数

/**
 * ユーザー情報を取得
 */
export const fetchUser = async (): Promise<User> => {
  const { data } = await apiClient.get<{ user: User }>("/user");
  return data.user;
};

/**
 * ログイン
 */
export const login = async (credentials: LoginCredentials): Promise<void> => {
  await apiClient.post("/login", credentials);
};

/**
 * ログアウト
 */
export const logout = async (): Promise<void> => {
  await apiClient.post("/logout");
};
