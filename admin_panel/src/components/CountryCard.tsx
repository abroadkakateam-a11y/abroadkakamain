"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Flag, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { BACKEND_URL } from "@/config/config";

interface CountryCardProps {
  _id: string;
  name: string;
  code: string;
  currency: string;
  continent: string;
  flagUrl?: string;
  description?: string;
  onEdit?: () => void;
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
}: CountryCardProps) {
  async function onDelete() {
    await axios.delete(`${BACKEND_URL}/api/country/${_id}`);
  }
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white/80 backdrop-blur-sm">
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
          <div className="flex gap-2 pt-4 border-t">
            <Link href={`/Update/Country/${_id}`} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="w-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors bg-transparent"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="flex-1 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
