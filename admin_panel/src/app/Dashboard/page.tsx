"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BACKEND_URL, FRONTEND_API } from "@/config/config";
import { useSelector } from "react-redux";
import { UserState } from "@/types/userstate";
import axios from "axios";
import { toast } from "sonner";

interface Country {
  _id: string;
  name: string;
  code: string;
  currency: string;
  continent: string;
  description?: string;
  flagImage?: {
    public_id?: string;
    url?: string;
  };
}

interface University {
  _id: string;
  name: string;
  university: string;
  country: {
    _id: string;
    name: string;
  };
  location: string;
  tagline?: string;
  coverImage?: string;
  logo?: string;
  established?: number;
  programs: string[];
}

export default function Dashboard() {
  const router = useRouter();
  const user = useSelector((state: { user: UserState }) => state.user);
  const [countries, setCountries] = useState<Country[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"countries" | "universities">(
    "countries"
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [countriesRes, universitiesRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/country`, {
            headers: { "api-key": FRONTEND_API as string },
          }),
          axios.get(`${BACKEND_URL}/api/universities`, {
            headers: { "api-key": FRONTEND_API as string },
          }),
        ]);

        setCountries(countriesRes.data.data.countries);
        setUniversities(universitiesRes.data.data.universities);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCountry = async (id: string) => {
    if (confirm("Are you sure you want to delete this country?")) {
      try {
        const response = await axios.delete(
          `${BACKEND_URL}/api/countries/${id}`,
          {
            headers: {
              "api-key": FRONTEND_API as string,
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        toast.success("Deleted successfully");
        setCountries(countries.filter((country) => country._id !== id));
        // Also remove universities from this country
        setUniversities(universities.filter((uni) => uni.country._id !== id));
      } catch (error) {
        toast.error("Error Deleting  Country please try again");
        console.error("Error deleting country:", error);
      }
    }
  };

  const handleDeleteUniversity = async (id: string) => {
    if (confirm("Are you sure you want to delete this university?")) {
      try {
        const response = await axios.delete(`/api/universities/${id}`, {
          headers: {
            "api-key": FRONTEND_API as string,
            authorization: `Bearer ${user.accessToken}`,
          },
        });
        toast.success("Deleted University");
      } catch (error) {
        toast.error("Error Deleting  Country please try again");
        console.error("Error deleting university:", error);
      }
    }
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.continent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUniversities = universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.programs.some((program) =>
        program.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "countries"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("countries")}
          >
            Countries ({countries.length})
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "universities"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("universities")}
          >
            Universities ({universities.length})
          </button>
        </div>

        {/* Search and Add New */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                router.push(
                  activeTab === "countries" ? "/Countries" : "/Universities"
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>

              {activeTab === "countries" ? "All Countries" : "All Universities"}
            </button>
            <button
              onClick={() =>
                router.push(
                  activeTab === "countries" ? "/AddCountry" : "/AddCollege"
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New {activeTab === "countries" ? "Country" : "University"}
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : activeTab === "countries" ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Continent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Currency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <tr key={country._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {country.flagImage?.url ? (
                          <img
                            src={country.flagImage.url}
                            alt={`${country.name} flag`}
                            className="h-8 w-12 object-cover"
                          />
                        ) : (
                          <div className="h-8 w-12 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                            No flag
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {country.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {country.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {country.continent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {country.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            router.push(`/Update/Country/${country._id}`)
                          }
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCountry(country._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No countries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Programs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUniversities.length > 0 ? (
                  filteredUniversities.map((university) => (
                    <tr key={university._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {university.logo ? (
                          <img
                            src={university.logo}
                            alt={`${university.name} logo`}
                            className="h-10 w-10 object-contain"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                            No logo
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Link
                          href={`/University/${university._id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {university.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {university.university}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {university.country.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {university.programs
                            .slice(0, 3)
                            .map((program, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              >
                                {program}
                              </span>
                            ))}
                          {university.programs.length > 3 && (
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              +{university.programs.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            router.push(`/University/${university._id}`)
                          }
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/Update/University/${university._id}`)
                          }
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUniversity(university._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No universities found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
