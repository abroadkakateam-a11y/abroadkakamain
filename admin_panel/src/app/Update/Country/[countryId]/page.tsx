"use client";

import { useState, useEffect, ChangeEvent, FormEvent, DragEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { BACKEND_URL, FRONTEND_API } from "@/config/config";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Image from "next/image";
import { UserState } from "@/types/userstate";

interface FormData {
  name: string;
  code: string;
  currency: string;
  continent: string;
  flag: File | null;
  description: string;
}

interface Country {
  name: string;
  code: string;
  currency: string;
  continent: string;
  flagImage?: { secure_url: string };
  description: string;
}

interface RootState {
  user: UserState;
}

export default function UpdateCountryForm() {
  const { countryId } = useParams();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    code: "",
    currency: "",
    continent: "",
    flag: null,
    description: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res: AxiosResponse<Country> = await axios.get(
          `${BACKEND_URL}/api/country/${countryId}`,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
              "api-key": FRONTEND_API,
            },
          }
        );

        const country = res.data;
        setFormData({
          name: country.name,
          code: country.code,
          currency: country.currency,
          continent: country.continent,
          flag: null,
          description: country.description,
        });

        if (country.flagImage?.secure_url) {
          setPreviewUrl(country.flagImage.secure_url);
        }
      } catch (error) {
        console.error("Error fetching country:", error);
        toast.error("Failed to load country data");
      }
    };

    if (countryId) fetchCountry();
  }, [countryId]);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, flag: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  function removeFile() {
    setFormData((prev) => ({ ...prev, flag: null }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("code", formData.code);
      submitData.append("currency", formData.currency);
      submitData.append("continent", formData.continent);
      submitData.append("description", formData.description);
      if (formData.flag) {
        submitData.append("flag", formData.flag);
      }

      await axios.put(`${BACKEND_URL}/api/country/${countryId}`, submitData, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
          "api-key": FRONTEND_API,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Country updated successfully");
      router.push("/admin/countries"); // redirect to country list
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

  return (
    <form onSubmit={handleSubmit}>
      {/* same form layout as CreateCountryForm */}
      {/* You can copy the entire form body and just reuse handlers & state */}
      {/* Replace the title with "Update Country" */}
      {/* Reuse previewUrl and removeFile for image preview */}
    </form>
  );
}
