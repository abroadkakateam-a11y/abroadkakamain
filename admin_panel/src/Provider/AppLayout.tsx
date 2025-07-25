"use client";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import axios from "axios";
import { Navbar } from "@/components/Header";
import { UserState } from "@/types/userstate";

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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}Auth/refresh`,
          { refreshToken: token }
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
  /*
  if (!user.isAuthenticated) {
    router.push("/Signin");
  }
    */
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
