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

  // Public routes that don't require authentication
  const publicRoutes = ["/Signin"];
  const isPublicRoute = publicRoutes.includes(path);

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

  // Authentication check that runs when user state or pathname changes
  useEffect(() => {
    // Don't redirect if still loading or on a public route
    if (isLoading || isPublicRoute) {
      return;
    }

    // Redirect to signin if not authenticated
    if (!user.isAuthenticated) {
      router.push("/Signin");
    }
  }, [user.isAuthenticated, isLoading, path, router, isPublicRoute]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user.isAuthenticated && !isPublicRoute) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col gap-2">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
