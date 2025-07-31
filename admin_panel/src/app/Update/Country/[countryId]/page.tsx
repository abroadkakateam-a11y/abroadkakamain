"use client";

import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  DragEvent,
  JSX,
} from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { BACKEND_URL, FRONTEND_API } from "@/config/config";
import { useSelector } from "react-redux";
import { UserState } from "@/types/userstate";
import { toast } from "sonner";

interface FormData {
  name: string;
  code: string;
  currency: string;
  continent: string;
  flag: File | null;
  description: string;
}

interface RootState {
  user: UserState;
}

interface CountryResponse {
  id: string;
  name: string;
  code: string;
  currency: string;
  continent: string;
  flag?: string;
  description: string;
}

interface CountryApiResponse {
  status: string;
  data: {
    country: {
      _id: string;
      name: string;
      code: string;
      currency: string;
      continent: string;
      description: string;
      flagImage?: {
        public_id: string;
        url: string;
      };
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

export default function UpdateCountryForm(): JSX.Element {
  const router = useRouter();
  const params = useParams();
  const countryId = params.countryId;
  const user = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    code: "",
    currency: "",
    continent: "",
    flag: null,
    description: "",
  });

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingFlagUrl, setExistingFlagUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch country data on component mount
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setIsLoading(true);
        const response: AxiosResponse<CountryApiResponse> = await axios.get(
          `${BACKEND_URL}/api/country/${countryId}`,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
              "api-key": FRONTEND_API,
            },
          }
        );

        const country = response.data.data.country;

        setFormData({
          name: country.name,
          code: country.code,
          currency: country.currency,
          continent: country.continent,
          flag: null, // Don't set existing file, user can upload new one
          description: country.description,
        });

        if (country.flagImage?.url) {
          setExistingFlagUrl(country.flagImage.url);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching country:", err);
        setError("Failed to load country data. Please try again.");
        toast.error("Failed to load country data");
      } finally {
        setIsLoading(false);
      }
    };

    if (countryId && user.accessToken) {
      fetchCountryData();
    }
  }, [countryId, user.accessToken]);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void {
    const { name, value } = e.target;
    setFormData(function (prev) {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFormData(function (prev) {
        return {
          ...prev,
          flag: file,
        };
      });

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }

  function handleDrag(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setFormData(function (prev) {
          return {
            ...prev,
            flag: file,
          };
        });

        // Create preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  }

  function removeFile(): void {
    setFormData(function (prev) {
      return {
        ...prev,
        flag: null,
      };
    });
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("code", formData.code);
      submitData.append("currency", formData.currency);
      submitData.append("continent", formData.continent);
      submitData.append("description", formData.description);

      if (formData.flag) {
        submitData.append("flag", formData.flag);
      }

      // API call for update (assuming PUT method)
      const response: AxiosResponse<CountryResponse> = await axios.patch(
        `${BACKEND_URL}/api/country/${countryId}`,
        submitData,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
            "api-key": FRONTEND_API,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Country updated successfully");

      // Clear preview URL if exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }

      router.push("/");
    } catch (error) {
      console.error("Error updating country:", error);
      toast.error("Error updating country. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const continentOptions: string[] = [
    "Africa",
    "Antarctica",
    "Asia",
    "Europe",
    "North America",
    "Oceania",
    "South America",
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen text-black p-6 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading country data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-black p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold mb-8 text-center">
            Update Country
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter country name"
                required
              />
            </div>

            {/* Code Field */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium mb-2">
                Code *
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter country code (e.g., US, GB, IN)"
                style={{ textTransform: "uppercase" }}
                maxLength={3}
                required
              />
            </div>

            {/* Currency Field */}
            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium mb-2"
              >
                Currency *
              </label>
              <input
                type="text"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter currency (e.g., USD, EUR, INR)"
                style={{ textTransform: "uppercase" }}
                maxLength={3}
                required
              />
            </div>

            {/* Continent Field */}
            <div>
              <label
                htmlFor="continent"
                className="block text-sm font-medium mb-2"
              >
                Continent *
              </label>
              <select
                id="continent"
                name="continent"
                value={formData.continent}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                required
              >
                <option value="">Select continent</option>
                {continentOptions.map(function (continent: string) {
                  return (
                    <option key={continent} value={continent}>
                      {continent}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Flag File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Flag</label>

              {/* Show existing flag if available and no new file selected */}
              {existingFlagUrl && !formData.flag && !previewUrl && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Current flag:</p>
                  <div className="flex justify-center">
                    <div className="relative w-24 h-16 border border-gray-200 rounded overflow-hidden">
                      <Image
                        src={existingFlagUrl}
                        alt="Current flag"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                  dragActive
                    ? "border-blue-500 bg-blue-500 bg-opacity-10"
                    : "border-gray-100 hover:border-gray-200"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="flag"
                  name="flag"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {formData.flag ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">{formData.flag.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {previewUrl && (
                      <div className="flex justify-center">
                        <div className="relative w-24 h-16 border border-gray-100 rounded overflow-hidden">
                          <Image
                            src={previewUrl}
                            alt="Flag preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <svg
                      className="w-8 h-8 mx-auto mb-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm text-gray-400">
                      {existingFlagUrl
                        ? "Drop new flag image here or click to browse"
                        : "Drop flag image here or click to browse"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-vertical"
                placeholder="Enter country description"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Update Country</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
