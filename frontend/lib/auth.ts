import { fetchApi } from './api';

const API_BASE_URL = 'https://ticket-website-backend-production.up.railway.app';

// Hàm utility cho việc quản lý authentication

/**
 * Kiểm tra xem người dùng đã đăng nhập hay chưa
 */
export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem("isLoggedIn") === "true";
};

/**
 * Lấy tên người dùng đã đăng nhập
 */
export const getUserName = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem("userName");
};

/**
 * Lấy loại tài khoản người dùng
 */
export const getUserType = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem("userType");
};

/**
 * Lấy ID người dùng đã đăng nhập
 */
export const getUserId = (): string | null => {
  if (typeof window === 'undefined') return null;
  // Kiểm tra từ cả sessionStorage và cookie
  const fromSession = sessionStorage.getItem("userId");
  
  // Nếu không có trong session, thử lấy từ cookie
  if (!fromSession) {
    return getCookie("userId");
  }
  
  return fromSession;
};

/**
 * Hàm trợ giúp để lấy giá trị cookie
 */
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

/**
 * Hàm trợ giúp để đặt cookie
 */
const setCookie = (name: string, value: string, days: number = 1): void => {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
};

/**
 * Lưu thông tin đăng nhập
 */
const saveLoginInfo = (userName: string, userType: string, userId: string) => {
  sessionStorage.setItem("isLoggedIn", "true");
  sessionStorage.setItem("userName", userName);
  sessionStorage.setItem("userType", userType);
  sessionStorage.setItem("userId", userId);
};

/**
 * Xóa thông tin đăng nhập
 */
const clearLoginInfo = () => {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("userName");
  sessionStorage.removeItem("userType");
  sessionStorage.removeItem("userId");
};

/**
 * Thực hiện đăng nhập
 */
export const login = async (
  userName: string, 
  password: string
): Promise<{success: boolean, message: string, userType?: string, userId?: string}> => {
  try {
    console.log("Đang đăng nhập với:", userName);
    
    const response = await fetch(`${API_BASE_URL}/dang-nhap`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        password: password,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Đăng nhập thất bại');
    }
    
    const data = await response.json();
    console.log("Đăng nhập thành công, userId:", data.userId);
    saveLoginInfo(data.userName, data.userType, data.userId || "3");
    return {
      success: true,
      message: "Đăng nhập thành công",
      userType: data.userType,
      userId: data.userId
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Không thể kết nối đến server"
    };
  }
};

/**
 * Thực hiện đăng xuất
 */
export const logout = async (): Promise<{success: boolean, message: string}> => {
  try {
    await fetchApi('/dang-xuat', {
      method: 'POST',
    });
    
    clearLoginInfo();
    
    return {
      success: true,
      message: "Đăng xuất thành công"
    };
  } catch (error) {
    console.error("Logout error:", error);
    
    // Vẫn xóa dữ liệu ngay cả khi gọi API thất bại
    clearLoginInfo();
    
    return {
      success: false,
      message: "Không thể kết nối đến server"
    };
  }
}; 