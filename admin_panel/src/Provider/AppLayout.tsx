"use client";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import axios from "axios";
import { Navbar } from "@/components/Header";
import { UserState } from "@/types/userstate";
import { BACKEND_URL, FRONTEND_API } from "@/config/config";

export default function AppLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: { user: UserState }) => state.user);
  const router = useRouter();

  useEffect(() => {
    const refreshToken = async () => {
      const token = localStorage.getItem("refreshToken");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/auth/refresh`,
          {
            refreshToken: token,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": FRONTEND_API,
            },
          }
        );
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        dispatch(
          setUser({
            accessToken: response.data.data.accessToken,
            user: response.data.data.user,
          })
        );
      } catch (error) {
        console.error("Refresh token error:", error);
        localStorage.removeItem("refreshToken");
      } finally {
        setIsLoading(false);
      }
    };

    refreshToken();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white flex flex-col gap-2">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
