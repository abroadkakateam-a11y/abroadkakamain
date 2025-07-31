"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

// shadcn components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Trash,
  Upload,
  ChevronRight,
  ChevronLeft,
  Loader,
  LoaderCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { BACKEND_URL, FRONTEND_API } from "@/config/config";
import { useSelector } from "react-redux";
import { UserState } from "@/types/userstate";

interface Country {
  _id: string;
  name: string;
}

interface Highlight {
  label: string;
  value: string;
  _id?: string;
}

interface UniversityFormData {
  name: string;
  university: string;
  country: string;
  location?: string;
  tagline?: string;
  coverImage?: File | null;
  logo?: File | null;
  established?: number;
  highlights?: Highlight[];
  about?: string;
  programs?: string[];
  duration?: string;
  medium?: string;
  gpaRequired?: string;
  feesUSD?: string;
  feesINR?: string;
  feeStructure?: any[];
  hostelCost?: string;
  approvedBy?: string[];
  facilities?: string[];
  eligibility?: string[];
  admissionSteps?: string[];
  documents?: string[];
  reviews?: any[];
  faqs?: any[];
  comparison?: any[];
}

interface UniversityData {
  _id: string;
  name: string;
  university: string;
  country: {
    _id: string;
    name: string;
    code: string;
  };
  location?: string;
  tagline?: string;
  coverImage?: string;
  logo?: string;
  established?: string | number;
  highlights?: Highlight[];
  about?: string;
  programs?: string[];
  duration?: string;
  medium?: string;
  gpaRequired?: string;
  feesUSD?: string;
  feesINR?: string;
  feeStructure?: any[];
  hostelCost?: string;
  approvedBy?: string[];
  facilities?: string[];
  eligibility?: string[];
  admissionSteps?: string[];
  documents?: string[];
  reviews?: any[];
  faqs?: any[];
  comparison?: any[];
}

export default function UpdateUniversityPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [currentTab, setCurrentTab] = useState("basic");
  const [universityData, setUniversityData] = useState<UniversityData | null>(
    null
  );
  const router = useRouter();
  const params = useParams();
  const universityId = params.id;
  const user = useSelector((state: { user: UserState }) => state.user);

  const tabs = ["basic", "media", "academics", "other"];
  const tabLabels = {
    basic: "Basic Info",
    media: "Media",
    academics: "Academics",
    other: "Other Details",
  };

  const form = useForm<UniversityFormData>({
    defaultValues: {
      name: "",
      university: "",
      country: "",
      location: "",
      tagline: "",
      coverImage: null,
      logo: null,
      established: undefined,
      highlights: [],
      about: "",
      programs: [],
      duration: "",
      medium: "",
      gpaRequired: "",
      feesUSD: "",
      feesINR: "",
      feeStructure: [],
      hostelCost: "",
      approvedBy: [],
      facilities: [],
      eligibility: [],
      admissionSteps: [],
      documents: [],
      reviews: [],
      faqs: [],
      comparison: [],
    },
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/country`, {
          headers: { "api-key": FRONTEND_API },
        });
        setCountries(response.data.data.countries);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };

    const fetchUniversityData = async () => {
      try {
        setFetchingData(true);
        const response = await axios.get(
          `${BACKEND_URL}/api/universities/${universityId}`,
          {
            headers: {
              "api-key": FRONTEND_API,
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        );

        const data = response.data.data.university;
        setUniversityData(data);

        // Pre-populate the form with existing data
        const formData: UniversityFormData = {
          name: data.name || "",
          university: data.university || "",
          country: data.country?._id || "",
          location: data.location || "",
          tagline: data.tagline || "",
          coverImage: null, // Files can't be pre-populated
          logo: null, // Files can't be pre-populated
          established: data.established ? Number(data.established) : undefined,
          highlights: data.highlights || [],
          about: data.about || "",
          programs: data.programs || [],
          duration: data.duration || "",
          medium: data.medium || "",
          gpaRequired: data.gpaRequired || "",
          feesUSD: data.feesUSD || "",
          feesINR: data.feesINR || "",
          feeStructure: data.feeStructure || [],
          hostelCost: data.hostelCost || "",
          approvedBy: data.approvedBy || [],
          facilities: data.facilities || [],
          eligibility: data.eligibility || [],
          admissionSteps: data.admissionSteps || [],
          documents: data.documents || [],
          reviews: data.reviews || [],
          faqs: data.faqs || [],
          comparison: data.comparison || [],
        };

        // Reset form with fetched data
        form.reset(formData);
      } catch (error) {
        console.error("Failed to fetch university data", error);
        toast.error("Failed to fetch university data");
      } finally {
        setFetchingData(false);
      }
    };

    fetchCountries();
    if (universityId && user.accessToken) {
      fetchUniversityData();
    }
  }, [universityId, user.accessToken, form, router]);

  const onSubmit = async (data: UniversityFormData) => {
    setLoading(true);
    try {
      // If there are files to upload, use FormData
      if (data.coverImage || data.logo) {
        const formData = new FormData();

        // Handle file uploads
        if (data.coverImage) {
          formData.append("coverImage", data.coverImage);
        }
        if (data.logo) {
          formData.append("logo", data.logo);
        }

        // Convert established to number if it exists
        const processedData = {
          ...data,
          established: data.established ? Number(data.established) : undefined,
          // Filter out empty highlights
          highlights:
            data.highlights?.filter((h) => h.label.trim() && h.value.trim()) ||
            [],
        };

        // Add all other data, handling arrays properly
        Object.entries(processedData).forEach(([key, value]) => {
          if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            key !== "coverImage" &&
            key !== "logo"
          ) {
            if (Array.isArray(value)) {
              if (value.length > 0) {
                if (key === "highlights") {
                  // Special handling for highlights - send individual fields
                  value.forEach((item, index) => {
                    if (typeof item === "object" && item.label && item.value) {
                      formData.append(
                        `highlights[${index}][label]`,
                        item.label
                      );
                      formData.append(
                        `highlights[${index}][value]`,
                        item.value
                      );
                      if (item.icon) {
                        formData.append(
                          `highlights[${index}][icon]`,
                          item.icon
                        );
                      }
                    }
                  });
                } else {
                  value.forEach((item, index) => {
                    if (typeof item === "object") {
                      formData.append(`${key}[${index}]`, JSON.stringify(item));
                    } else {
                      formData.append(`${key}[${index}]`, String(item));
                    }
                  });
                }
              }
            } else {
              if (key === "established") {
                formData.append(key, value.toString());
              } else {
                formData.append(key, String(value));
              }
            }
          }
        });

        await axios.put(
          `${BACKEND_URL}/api/universities/${universityId}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
              "api-key": FRONTEND_API,
              // Do NOT set Content-Type manually when using FormData
            },
          }
        );
      } else {
        // No files, send as JSON
        const processedData = {
          ...data,
          established: data.established ? Number(data.established) : undefined,
          // Filter out empty highlights and ensure they're objects
          highlights:
            data.highlights?.filter(
              (h) => h.label?.trim() && h.value?.trim()
            ) || [],
          coverImage: undefined,
          logo: undefined,
        };

        await axios.put(
          `${BACKEND_URL}/api/universities/${universityId}`,
          processedData,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
              "api-key": FRONTEND_API,
              "Content-Type": "application/json",
            },
          }
        );
      }

      toast.success("University updated successfully");
      router.push("/");
    } catch (error: any) {
      console.error("Update failed", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update university. Please check required fields."
      );
    } finally {
      setLoading(false);
    }
  };

  const addHighlight = () => {
    const currentHighlights = form.getValues("highlights") || [];
    form.setValue("highlights", [
      ...currentHighlights,
      { label: "", value: "" },
    ]);
  };

  const removeHighlight = (index: number) => {
    const currentHighlights = form.getValues("highlights") || [];
    form.setValue(
      "highlights",
      currentHighlights.filter((_, i) => i !== index)
    );
  };

  const addProgram = () => {
    const currentPrograms = form.getValues("programs") || [];
    form.setValue("programs", [...currentPrograms, ""]);
  };

  const removeProgram = (index: number) => {
    const currentPrograms = form.getValues("programs") || [];
    form.setValue(
      "programs",
      currentPrograms.filter((_, i) => i !== index)
    );
  };

  const goToNextTab = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1]);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1]);
    }
  };

  const isLastTab = currentTab === tabs[tabs.length - 1];
  const isFirstTab = currentTab === tabs[0];

  if (fetchingData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin">
          <LoaderCircle size={64} className="text-blue-400" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin">
          <LoaderCircle size={64} className="text-blue-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        Update University: {universityData?.name}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="other">Other Details</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="University Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="university"
                    rules={{ required: "University is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          University <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="University" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    rules={{ required: "Country is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Country <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country._id} value={country._id}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline</FormLabel>
                        <FormControl>
                          <Input placeholder="Tagline" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="established"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Established Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Established Year"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined
                              )
                            }
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="About the university"
                            {...field}
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormLabel>Highlights</FormLabel>
                    <div className="space-y-4">
                      {form.watch("highlights")?.map((_, index) => (
                        <div key={index} className="flex gap-2 items-end">
                          <FormField
                            control={form.control}
                            name={`highlights.${index}.label`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder="Label" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`highlights.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder="Value" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeHighlight(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addHighlight}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Highlight
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {universityData?.coverImage && (
                              <div className="mb-2">
                                <p className="text-sm text-gray-600 mb-2">
                                  Current Cover Image:
                                </p>
                                <img
                                  src={universityData.coverImage}
                                  alt="Current cover"
                                  className="w-32 h-20 object-cover rounded border"
                                />
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    field.onChange(e.target.files[0]);
                                  }
                                }}
                              />
                              {field.value && (
                                <div className="text-sm text-gray-600">
                                  {field.value.name}
                                </div>
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {universityData?.logo && (
                              <div className="mb-2">
                                <p className="text-sm text-gray-600 mb-2">
                                  Current Logo:
                                </p>
                                <img
                                  src={universityData.logo}
                                  alt="Current logo"
                                  className="w-16 h-16 object-cover rounded border"
                                />
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    field.onChange(e.target.files[0]);
                                  }
                                }}
                              />
                              {field.value && (
                                <div className="text-sm text-gray-600">
                                  {field.value.name}
                                </div>
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academics">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <FormLabel>Programs</FormLabel>
                    <div className="space-y-4">
                      {form.watch("programs")?.map((_, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <FormField
                            control={form.control}
                            name={`programs.${index}`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    placeholder="Program name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeProgram(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addProgram}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Program
                      </Button>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 4 years" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medium</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., English" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gpaRequired"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPA Required</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 3.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="feesUSD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fees (USD)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 20000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="feesINR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fees (INR)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 1500000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hostelCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hostel Cost</FormLabel>
                        <FormControl>
                          <Input placeholder="Hostel cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="other">
              <Card>
                <CardHeader>
                  <CardTitle>Other Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="approvedBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Approved By</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Comma separated values"
                            value={
                              Array.isArray(field.value)
                                ? field.value.join(", ")
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value
                                .split(",")
                                .map((item) => item.trim())
                                .filter((item) => item.length > 0);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="facilities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facilities</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Comma separated values"
                            value={
                              Array.isArray(field.value)
                                ? field.value.join(", ")
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value
                                .split(",")
                                .map((item) => item.trim())
                                .filter((item) => item.length > 0);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eligibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Eligibility</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="One per line"
                            value={
                              Array.isArray(field.value)
                                ? field.value.join("\n")
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value
                                .split("\n")
                                .map((item) => item.trim())
                                .filter((item) => item.length > 0);
                              field.onChange(value);
                            }}
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="admissionSteps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admission Steps</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="One per line"
                            value={
                              Array.isArray(field.value)
                                ? field.value.join("\n")
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value
                                .split("\n")
                                .map((item) => item.trim())
                                .filter((item) => item.length > 0);
                              field.onChange(value);
                            }}
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="documents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Required Documents</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="One per line"
                            value={
                              Array.isArray(field.value)
                                ? field.value.join("\n")
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value
                                .split("\n")
                                .map((item) => item.trim())
                                .filter((item) => item.length > 0);
                              field.onChange(value);
                            }}
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <div className="flex gap-4">
              {!isFirstTab && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousTab}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}

              {!isLastTab && (
                <Button type="button" onClick={goToNextTab}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}

              {isLastTab && (
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update University"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
