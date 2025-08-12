'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus, Trash2, Upload } from 'lucide-react';
import { BACKEND_URL, FRONTEND_API } from "@/config/config";
import { useSelector } from 'react-redux';
import { UserState } from '@/types/userstate';
import { useParams, useRouter } from 'next/navigation';

// Reuse the same schema from the create form
const formSchema = z.object({
  name: z.string().min(3).max(100),
  university: z.string().min(3).max(100),
  country: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
  location: z.string().min(2).max(100),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  mapEmbed: z.string().url().optional(),
  tagline: z.string().max(200).optional(),
  coverImage: z.string().url().optional(),
  coverImagePublicId: z.string().optional(),
  logo: z.string().url().optional(),
  logoPublicId: z.string().optional(),
  photos: z.array(z.object({
    url: z.string().url(),
    publicId: z.string().optional(),
    caption: z.string().optional(),
  })).optional(),
  established: z.number().min(1000).max(new Date().getFullYear()).optional(),
  highlights: z.array(z.object({
    label: z.string(),
    value: z.string(),
    icon: z.string().optional(),
  })).optional(),
  about: z.string().max(5000).optional(),
  programs: z.array(z.string().min(2).max(100)).optional(),
  duration: z.string().max(50).optional(),
  medium: z.string().max(50).optional(),
  gpaRequired: z.string().max(20).optional(),
  feesUSD: z.string().max(50).optional(),
  feesINR: z.string().max(50).optional(),
  feeStructure: z.array(z.object({
    year: z.number(),
    tuition: z.number(),
    hostel: z.number(),
  })).optional(),
  hostelCost: z.string().max(50).optional(),
  approvedBy: z.array(z.string().min(2).max(100)).optional(),
  facilities: z.array(z.string().min(2).max(100)).optional(),
  eligibility: z.array(z.string().min(2).max(500)).optional(),
  admissionSteps: z.array(z.string().min(2).max(500)).optional(),
  documents: z.array(z.string().min(2).max(200)).optional(),
  reviews: z.array(z.object({
    name: z.string(),
    image: z.string(),
    rating: z.number().min(1).max(5),
    review: z.string(),
  })).optional(),
  faqs: z.array(z.object({
    q: z.string(),
    a: z.string(),
  })).optional(),
  comparison: z.array(z.any()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Country {
  _id: string;
  name: string;
}

export default function UniversityUpdateForm() {
  const { id: universityId } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<{url: string, publicId: string, caption?: string}[]>([]);
  const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);
  const user = useSelector((state: { user: UserState }) => state.user);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const photoInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      university: "",
      country: "",
      location: "",
      latitude: undefined,
      longitude: undefined,
      mapEmbed: "",
      programs: [],
      highlights: [],
      feeStructure: [],
      photos: [],
      reviews: [],
      faqs: [],
      approvedBy: [],
      facilities: [],
      eligibility: [],
      admissionSteps: [],
      documents: [],
    },
  });

  // Fetch university data and countries
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch countries
        const countriesResponse = await axios.get(`${BACKEND_URL}/api/country`, {
          headers: { "api-key": FRONTEND_API },
        });
        setCountries(countriesResponse.data.data.countries);

        // Fetch university data
        const universityResponse = await axios.get(
          `${BACKEND_URL}/api/universities/${universityId}`,
          {
            headers: {
              "api-key": FRONTEND_API,
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        );

        const universityData = universityResponse.data.data.university;
        
        // Set existing photos and prepare form data
        if (universityData.photos && universityData.photos.length > 0) {
          setExistingPhotos(universityData.photos);
        }

        // Prepare form values
        const formValues: Partial<FormValues> = {
          ...universityData,
          // Convert string arrays that might be stored as newline-separated strings
          eligibility: Array.isArray(universityData.eligibility) 
            ? universityData.eligibility 
            : universityData.eligibility?.split('\n') || [],
          admissionSteps: Array.isArray(universityData.admissionSteps) 
            ? universityData.admissionSteps 
            : universityData.admissionSteps?.split('\n') || [],
          documents: Array.isArray(universityData.documents) 
            ? universityData.documents 
            : universityData.documents?.split('\n') || [],
        };

        // Set form values
        form.reset(formValues as FormValues);
      } catch (error) {
        console.error("Failed to fetch data", error);
        toast.error("Failed to load university data");
        router.push('/admin/universities');
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchData();
  }, [universityId, user.accessToken, form, router]);

  // Field arrays
  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const { fields: feeStructureFields, append: appendFeeStructure, remove: removeFeeStructure } = useFieldArray({
    control: form.control,
    name: "feeStructure",
  });

  const { fields: photoFields, append: appendPhoto, remove: removePhoto } = useFieldArray({
    control: form.control,
    name: "photos",
  });

  const { fields: reviewFields, append: appendReview, remove: removeReview } = useFieldArray({
    control: form.control,
    name: "reviews",
  });

  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT'); // For PUT request using FormData

      // Handle simple string fields
      const simpleFields = [
        'name', 'university', 'country', 'location', 'mapEmbed', 'tagline', 
        'about', 'duration', 'medium', 'gpaRequired', 'feesUSD', 'feesINR', 'hostelCost'
      ];

      simpleFields.forEach(key => {
        const value = data[key as keyof FormValues];
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value.toString());
        }
      });

      // Handle numeric fields
      if (data.latitude !== undefined && data.latitude !== null && !isNaN(data.latitude)) {
        formData.append('latitude', data.latitude.toString());
      }
      if (data.longitude !== undefined && data.longitude !== null && !isNaN(data.longitude)) {
        formData.append('longitude', data.longitude.toString());
      }
      if (data.established !== undefined && data.established !== null && !isNaN(data.established)) {
        formData.append('established', data.established.toString());
      }

      // Handle simple array fields
      const simpleArrayFields = ['programs', 'approvedBy', 'facilities'];
      simpleArrayFields.forEach(key => {
        const value = data[key as keyof FormValues] as string[] | undefined;
        if (value && Array.isArray(value) && value.length > 0) {
          value.forEach((item, index) => {
            if (item && item.trim() !== '') {
              formData.append(`${key}[${index}]`, item);
            }
          });
        }
      });

      // Handle text array fields (split by newlines)
      const textArrayFields = ['eligibility', 'admissionSteps', 'documents'];
      textArrayFields.forEach(key => {
        const value = data[key as keyof FormValues] as string[] | undefined;
        if (value && Array.isArray(value) && value.length > 0) {
          const filteredItems = value.filter(item => item && item.trim() !== '');
          filteredItems.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item.trim());
          });
        }
      });

      // Handle highlights array
      if (data.highlights && data.highlights.length > 0) {
        data.highlights.forEach((highlight, index) => {
          if (highlight.label && highlight.value) {
            formData.append(`highlights[${index}][label]`, highlight.label);
            formData.append(`highlights[${index}][value]`, highlight.value);
            if (highlight.icon) {
              formData.append(`highlights[${index}][icon]`, highlight.icon);
            }
          }
        });
      }

      // Handle feeStructure array with proper number conversion
      if (data.feeStructure && data.feeStructure.length > 0) {
        data.feeStructure.forEach((fee, index) => {
          const year = Number(fee.year);
          const tuition = Number(fee.tuition);
          const hostel = Number(fee.hostel);
          
          if (!isNaN(year)) {
            formData.append(`feeStructure[${index}][year]`, year.toString());
          }
          if (!isNaN(tuition)) {
            formData.append(`feeStructure[${index}][tuition]`, tuition.toString());
          }
          if (!isNaN(hostel)) {
            formData.append(`feeStructure[${index}][hostel]`, hostel.toString());
          }
        });
      }

      // Handle reviews array with proper number conversion
      if (data.reviews && data.reviews.length > 0) {
        data.reviews.forEach((review, index) => {
          if (review.name && review.review) {
            formData.append(`reviews[${index}][name]`, review.name);
            formData.append(`reviews[${index}][image]`, review.image || '');
            
            const rating = Number(review.rating);
            if (!isNaN(rating)) {
              formData.append(`reviews[${index}][rating]`, rating.toString());
            }
            
            formData.append(`reviews[${index}][review]`, review.review);
          }
        });
      }

      // Handle faqs array
      if (data.faqs && data.faqs.length > 0) {
        data.faqs.forEach((faq, index) => {
          if (faq.q && faq.a) {
            formData.append(`faqs[${index}][q]`, faq.q);
            formData.append(`faqs[${index}][a]`, faq.a);
          }
        });
      }

      // Handle photo captions and deletions
      if (data.photos && data.photos.length > 0) {
        data.photos.forEach((photo, index) => {
          if (photo.caption) {
            formData.append(`photoCaptions[${index}]`, photo.caption);
          }
        });
      }

      // Append photos to delete
      if (photosToDelete.length > 0) {
        photosToDelete.forEach((publicId, index) => {
          formData.append(`photosToDelete[${index}]`, publicId);
        });
      }

      // Append files
      if (coverImageFile) {
        formData.append('coverImage', coverImageFile);
      }
      
      if (logoFile) {
        formData.append('logo', logoFile);
      }

      // Handle photos upload
      if (photoFiles.length > 0) {
        photoFiles.forEach((file) => {
          if (file) {
            formData.append('photos', file);
          }
        });
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/universities/${universityId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${user.accessToken}`,
            'api-key': FRONTEND_API,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success('University updated successfully!');
      router.push('/admin/universities');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      const errorMessage = error.response?.data?.message || 'Failed to update university. Please try again.';
      toast.error(errorMessage);
      
      if (error.response?.data?.errors) {
        console.error('Validation errors:', error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // File handlers with delete functionality for existing images
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImageFile(file);
      form.setValue('coverImage', URL.createObjectURL(file));
      // Clear the public ID if changing the image
      form.setValue('coverImagePublicId', '');
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      form.setValue('logo', URL.createObjectURL(file));
      // Clear the public ID if changing the image
      form.setValue('logoPublicId', '');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newPhotoFiles = [...photoFiles];
      newPhotoFiles[index] = file;
      setPhotoFiles(newPhotoFiles);

      const newPhotos = [...(form.getValues('photos') || [])];
      newPhotos[index] = {
        ...newPhotos[index],
        url: URL.createObjectURL(file),
        publicId: '' // Clear public ID for new uploads
      };
      form.setValue('photos', newPhotos);
    }
  };

  const handleDeleteExistingPhoto = (publicId: string, index: number) => {
    // Add to deletion list
    setPhotosToDelete([...photosToDelete, publicId]);
    
    // Remove from form data
    const currentPhotos = [...(form.getValues('photos') || [])];
    currentPhotos.splice(index, 1);
    form.setValue('photos', currentPhotos);
    
    // Remove from existing photos display
    const updatedExistingPhotos = [...existingPhotos];
    updatedExistingPhotos.splice(index, 1);
    setExistingPhotos(updatedExistingPhotos);
  };

  if (isFetchingData) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center">
        <p>Loading university data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Edit University</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Name</FormLabel>
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Official University Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Official University Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.000001"
                        placeholder="e.g., 42.3770"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.000001"
                        placeholder="e.g., -71.1167"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mapEmbed"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Google Maps Embed URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                      <Input placeholder="Short tagline about the university" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>About University</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed description about the university"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Images Section */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverImageChange}
                            ref={coverImageInputRef}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => coverImageInputRef.current?.click()}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            {field.value ? 'Change' : 'Upload'}
                          </Button>
                          {field.value && (
                            <>
                              <img
                                src={field.value}
                                alt="Cover preview"
                                className="h-16 w-16 object-cover rounded"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                  setCoverImageFile(null);
                                  form.setValue('coverImage', '');
                                  form.setValue('coverImagePublicId', '');
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                        {form.getValues('coverImagePublicId') && (
                          <p className="text-sm text-muted-foreground">
                            Current image will be replaced
                          </p>
                        )}
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
                    <FormLabel>University Logo</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoChange}
                            ref={logoInputRef}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => logoInputRef.current?.click()}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            {field.value ? 'Change' : 'Upload'}
                          </Button>
                          {field.value && (
                            <>
                              <img
                                src={field.value}
                                alt="Logo preview"
                                className="h-16 w-16 object-contain rounded"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                  setLogoFile(null);
                                  form.setValue('logo', '');
                                  form.setValue('logoPublicId', '');
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                        {form.getValues('logoPublicId') && (
                          <p className="text-sm text-muted-foreground">
                            Current logo will be replaced
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">University Photos</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendPhoto({ url: '', caption: '' })}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Photo
                  </Button>
                </div>

                {/* Display existing photos with delete option */}
                {existingPhotos.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Existing Photos</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {existingPhotos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo.url}
                            alt={`University photo ${index}`}
                            className="h-32 w-full object-cover rounded"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => photo.publicId && handleDeleteExistingPhoto(photo.publicId, index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          {photo.caption && (
                            <p className="text-xs text-center mt-1 truncate">{photo.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New photos upload section */}
                <div className="space-y-4">
                  {photoFields.map((field, index) => (
                    <div key={field.id} className="flex flex-col md:flex-row gap-4">
                      <FormField
                        control={form.control}
                        name={`photos.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Photo</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-4">
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handlePhotoUpload(e, index)}
                                  ref={(el) => {
                                    if (el) {
                                      photoInputRefs.current[index] = el;
                                    } else {
                                      photoInputRefs.current[index] = null;
                                    }
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => photoInputRefs.current[index]?.click()}
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Upload
                                </Button>
                                {field.value && (
                                  <>
                                    <img
                                      src={field.value}
                                      alt={`Preview ${index}`}
                                      className="h-16 w-16 object-cover rounded"
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      onClick={() => {
                                        const newPhotoFiles = [...photoFiles];
                                        newPhotoFiles.splice(index, 1);
                                        setPhotoFiles(newPhotoFiles);
                                        
                                        const newPhotos = [...(form.getValues('photos') || [])];
                                        newPhotos.splice(index, 1);
                                        form.setValue('photos', newPhotos);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`photos.${index}.caption`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                              <Input placeholder="Photo caption" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Highlights Section */}
          <Card>
            <CardHeader>
              <CardTitle>Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {highlightFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`highlights.${index}.label`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Label</FormLabel>
                          <FormControl>
                            <Input placeholder="Label (e.g., Ranking)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`highlights.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Value</FormLabel>
                          <FormControl>
                            <Input placeholder="Value (e.g., #1 in Country)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`highlights.${index}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Icon name or URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="md:col-start-4 md:place-self-end"
                      onClick={() => removeHighlight(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendHighlight({ label: '', value: '' })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Highlight
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="programs"
                render={() => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Programs Offered</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Medicine', 'Engineering', 'Business', 'Arts', 'Science', 'Law'].map((program) => (
                        <FormField
                          key={program}
                          control={form.control}
                          name="programs"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(program)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), program])
                                      : field.onChange(
                                        field.value?.filter((value) => value !== program)
                                      );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{program}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormLabel>Medium of Instruction</FormLabel>
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
                    <FormLabel>GPA Requirement</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3.0 or above" {...field} />
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
                      <Input placeholder="e.g., $20,000 per year" {...field} />
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
                      <Input placeholder="e.g., ₹15,00,000 total" {...field} />
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
                      <Input placeholder="e.g., $5,000 per year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Detailed Fee Structure</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendFeeStructure({ year: 0, tuition: 0, hostel: 0 })}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Year
                  </Button>
                </div>

                <div className="space-y-4">
                  {feeStructureFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name={`feeStructure.${index}.year`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Year"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`feeStructure.${index}.tuition`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tuition Fee</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Tuition"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`feeStructure.${index}.hostel`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hostel Fee</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Hostel"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
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
                        className="self-end"
                        onClick={() => removeFeeStructure(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="approvedBy"
                render={() => (
                  <FormItem>
                    <FormLabel>Approved By</FormLabel>
                    <div className="space-y-2">
                      {['WHO', 'MCI', 'GMC', 'AMC', 'ECFMG'].map((org) => (
                        <FormField
                          key={org}
                          control={form.control}
                          name="approvedBy"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(org)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), org])
                                      : field.onChange(
                                        field.value?.filter((value) => value !== org)
                                      );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{org}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facilities"
                render={() => (
                  <FormItem>
                    <FormLabel>Facilities</FormLabel>
                    <div className="space-y-2">
                      {['Library', 'Laboratories', 'Hostel', 'Cafeteria', 'Sports'].map((facility) => (
                        <FormField
                          key={facility}
                          control={form.control}
                          name="facilities"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(facility)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), facility])
                                      : field.onChange(
                                        field.value?.filter((value) => value !== facility)
                                      );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{facility}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eligibility"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Eligibility Criteria</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List eligibility criteria (one per line)"
                        rows={3}
                        {...field}
                        value={field.value?.join('\n') || ''}
                        onChange={(e) => field.onChange(e.target.value.split('\n'))}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter each criteria on a new line
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="admissionSteps"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Admission Process Steps</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List admission steps (one per line)"
                        rows={3}
                        {...field}
                        value={field.value?.join('\n') || ''}
                        onChange={(e) => field.onChange(e.target.value.split('\n'))}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter each step on a new line
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="documents"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Required Documents</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List required documents (one per line)"
                        rows={3}
                        {...field}
                        value={field.value?.join('\n') || ''}
                        onChange={(e) => field.onChange(e.target.value.split('\n'))}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter each document on a new line
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviewFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name={`reviews.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Student name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`reviews.${index}.image`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Profile image URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`reviews.${index}.rating`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating (1-5)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              placeholder="Rating"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
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
                      className="self-end"
                      onClick={() => removeReview(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <FormField
                      control={form.control}
                      name={`reviews.${index}.review`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-3">
                          <FormLabel>Review</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Student review"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendReview({ name: '', image: '', rating: 5, review: '' })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Review
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 gap-4">
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name={`faqs.${index}.q`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                              <Input placeholder="Question" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="self-end"
                        onClick={() => removeFaq(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <FormField
                      control={form.control}
                      name={`faqs.${index}.a`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Answer"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendFaq({ q: '', a: '' })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add FAQ
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => router.push('/admin/universities')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update University'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}