import { apiGet, apiPost } from "@/lib/api";
import { API_ENDPOINTS } from "@/const";

export interface User {
  id: number;
  userId: string;
  userName: string;
}

export interface SignUpData {
  userId: string;
  userPassword: string;
  userCheckPassword: string;
  userName: string;
  userPhone: string;
  authCode?: string;
}

/**
 * 현재 로그인한 사용자 정보 조회
 */
export async function getMe(): Promise<User> {
  return apiGet<User>(API_ENDPOINTS.AUTH.ME);
}

/**
 * 회원가입
 */
export async function signUp(data: SignUpData): Promise<void> {
  return apiPost<void>(API_ENDPOINTS.AUTH.SIGN_UP, data);
}

