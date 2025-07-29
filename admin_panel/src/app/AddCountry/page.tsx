"use client";

import { useState, ChangeEvent, FormEvent, DragEvent, JSX } from "react";
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

export default function CreateCountryForm(): JSX.Element {
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
      console.log(formData.name);
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("code", formData.code);
      submitData.append("currency", formData.currency);
      submitData.append("continent", formData.continent);
      submitData.append("description", formData.description);

      if (formData.flag) {
        submitData.append("flag", formData.flag);
      }
      // API call with proper typing
      const response: AxiosResponse<CountryResponse> = await axios.post(
        `${BACKEND_URL}/api/country`,
        submitData,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
            "api-key": FRONTEND_API,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset form
      setFormData({
        name: "",
        code: "",
        currency: "",
        continent: "",
        flag: null,
        description: "",
      });

      toast.success("Country created");
      // Clear preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error("Error creating country:", error);
      toast.error("Error creating country. Please try again.");
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

  return (
    <div className="min-h-screen text-black p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold mb-8 text-center">
            Create Country
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
                      Drop flag image here or click to browse
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
                    <span>Creating...</span>
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
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      />
                    </svg>
                    <span>Create Country</span>
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
