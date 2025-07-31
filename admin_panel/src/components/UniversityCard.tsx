"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  DollarSign,
  IndianRupee,
  School,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { BACKEND_URL, FRONTEND_API } from "@/config/config";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { UserState } from "@/types/userstate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface Country {
  _id: string;
  name: string;
  code: string;
}

interface Highlight {
  label: string;
  value: string;
  _id: string;
}

interface University {
  _id: string;
  name: string;
  university: string;
  country: Country;
  location: string;
  tagline: string;
  coverImage?: string;
  logo?: string;
  about: string;
  duration: string;
  feesUSD: string;
  feesINR: string;
  createdAt: string;
  highlights: Highlight[];
}

interface UniversityCardProps {
  university: University;
}

export function UniversityCard({ university }: UniversityCardProps) {
  const user = useSelector((state: { user: UserState }) => state.user);
  const router = useRouter();
  async function handleDelete() {
    try {
      await axios.delete(`${BACKEND_URL}/api/universities/${university._id}`, {
        headers: {
          "api-key": FRONTEND_API,
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      router.back();
    } catch (error: any) {
      console.error(error);
    }
  }
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 justify-between">
      <div className="relative h-48 w-full">
        <Image
          src={university.coverImage || "/coverPlaceholder.svg"}
          alt={`${university.university} cover`}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>

      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 min-w-[64px] rounded-full border-2 border-white shadow-md">
            <Image
              src={university.logo || "/placeholder.svg"}
              alt={`${university.university} logo`}
              fill
              className="object-cover rounded-full"
            />
          </div>

          <div>
            <CardTitle className="text-xl font-bold">
              {university.university}
            </CardTitle>
            <CardDescription className="text-md">
              {university.name}
            </CardDescription>
            <Badge variant="outline" className="mt-2">
              {university.country.code.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {university.tagline && (
          <p className="italic text-gray-600">"{university.tagline}"</p>
        )}

        {university.about && (
          <p className="text-gray-700 line-clamp-3">{university.about}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {university.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-sm">{university.location}</span>
            </div>
          )}

          {university.duration && (
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-sm">Duration: {university.duration}</span>
            </div>
          )}

          {university.feesUSD && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <span className="text-sm">Fees (USD): {university.feesUSD}</span>
            </div>
          )}

          {university.feesINR && (
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-gray-500" />
              <span className="text-sm">Fees (INR): {university.feesINR}</span>
            </div>
          )}
        </div>

        {university.highlights?.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Highlights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {university.highlights.map((highlight) => (
                <div key={highlight._id} className="bg-gray-50 p-2 rounded">
                  <p className="font-medium text-sm">{highlight.label}</p>
                  <p className="text-sm text-gray-600">{highlight.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 justify-end">
        <Button variant="outline" className="flex-1 " asChild>
          <Link href={`/University/${university._id}`}>View Details</Link>
        </Button>
        <Button variant="secondary" className="flex-1 " asChild>
          <Link href={`/Update/University/${university._id}`}>Edit</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger className="flex-1 items-center text-red-600 text-md mx-2 z-50">
            <Button
              variant="outline"
              size="sm"
              className="w-full hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure you want to delete ?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className=" flex bg-red-600 text-md"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
