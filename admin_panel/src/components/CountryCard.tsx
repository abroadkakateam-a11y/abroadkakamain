"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Flag, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { BACKEND_URL, FRONTEND_API } from "@/config/config";
import { useSelector } from "react-redux";
import { UserState } from "@/types/userstate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CountryCardProps {
  _id: string;
  name: string;
  code: string;
  currency: string;
  continent: string;
  flagUrl?: string;
  description?: string;
  onEdit?: () => void;
  universitiesLink?: string; // New prop for navigation
}

export default function CountryCard({
  _id,
  name,
  code,
  currency,
  continent,
  flagUrl,
  description,
  onEdit,
  universitiesLink,
}: CountryCardProps) {
  const router = useRouter();
  const user = useSelector((state: { user: UserState }) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);

  async function onDelete() {
    setIsDeleting(true);
    try {
      await axios.delete(`${BACKEND_URL}/api/country/${_id}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
          "api-key": FRONTEND_API,
        },
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting country:", error);
      // You might want to show a toast notification here
    } finally {
      setIsDeleting(false);
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if universitiesLink is provided and the click isn't on an action button
    if (
      universitiesLink &&
      !(e.target as HTMLElement).closest(".action-buttons")
    ) {
      router.push(universitiesLink);
    }
  };

  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white/80 backdrop-blur-sm cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        {/* Flag Section */}
        <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-lg">
          {flagUrl ? (
            <Image
              src={flagUrl || "/placeholder.svg"}
              alt={`${name} flag`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Flag className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-white/90 text-gray-700 font-medium"
            >
              {code}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Continent:</span>
              <span>{continent}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="font-medium">Currency:</span>
              <span>{currency}</span>
            </div>
          </div>

          {description && (
            <div className="border-t pt-4 mb-4">
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {description}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t action-buttons">
            <Link href={`/Update/Country/${_id}`} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  onEdit?.();
                }}
                className="w-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors bg-transparent"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => e.stopPropagation()} // Prevent card click
                  className="flex-1 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors bg-transparent"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the country "{name}" and remove all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDelete}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
