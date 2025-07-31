"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL, FRONTEND_API } from "@/config/config";
import { useSelector } from "react-redux";
import type { UserState } from "@/types/userstate";

import { Loader2, Globe } from "lucide-react";
import CountryCard from "@/components/CountryCard";
import Link from "next/link";

interface Country {
  _id: string;
  name: string;
  code: string;
  currency: string;
  continent: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  flagImage?: { public_id: string; url: string };
}

export default function CountriesPage() {
  const user = useSelector((state: { user: UserState }) => state.user);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/country`, {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
            "api-key": FRONTEND_API,
          },
        });
        setCountries(res.data.data.countries);
      } catch (err) {
        console.error("Error fetching countries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [user.accessToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Explore Countries
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing countries from around the world with detailed
            information about their culture, currency, and more.
          </p>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-500 text-lg">Loading countries...</p>
          </div>
        ) : countries.length === 0 ? (
          <div className="text-center py-20">
            <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No countries found.</p>
            <p className="text-gray-400 text-sm mt-2">
              Check back later for updates.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold text-blue-600">
                  {countries.length}
                </span>{" "}
                countries
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {countries.map((country) => (
                <CountryCard
                  key={country._id}
                  _id={country._id}
                  name={country.name}
                  code={country.code}
                  currency={country.currency}
                  continent={country.continent}
                  description={country.description}
                  flagUrl={country.flagImage?.url}
                  universitiesLink={`/Universities/${country._id}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
