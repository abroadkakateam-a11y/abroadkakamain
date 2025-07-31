"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";

// Form validation schema
const formSchema = z.object({
    // Step 1: Personal Information
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    dob: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid date"),
    gender: z.enum(["male", "female", "other"]),
    address: z.string().min(10, "Address must be at least 10 characters"),
    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.string().min(6).max(6),
    country: z.string().min(2),

    // Step 2: Academic Information
    neetScore: z.number().min(0).max(720),
    neetRank: z.number().min(1),
    twelfthPercentage: z.number().min(0).max(100),
    twelfthBoard: z.string().min(2),
    twelfthYear: z.number().min(2000).max(new Date().getFullYear()),
    tenthPercentage: z.number().min(0).max(100),
    tenthBoard: z.string().min(2),
    tenthYear: z.number().min(2000).max(new Date().getFullYear()),
    preferredCountry: z.string().min(2),
    preferredCourse: z.string().min(2),

    // Step 3: Documents
    neetScorecard: z.instanceof(File),
    neetAdmitCard: z.instanceof(File),
    twelfthMarksheet: z.instanceof(File),
    tenthMarksheet: z.instanceof(File),
    aadharCard: z.instanceof(File),
    passportPhoto: z.instanceof(File),
    panCard: z.instanceof(File).optional(),
    passport: z.instanceof(File).optional(),

    // Step 4: Payment & Confirmation
    paymentMethod: z.enum(["credit_card", "debit_card", "net_banking", "upi"]),
    termsAccepted: z.boolean().refine(val => val, "You must accept the terms"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdmissionBookingForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            gender: "male",
            preferredCourse: "MBBS",
            paymentMethod: "upi",
            termsAccepted: false,
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            setIsSubmitting(true);

            // Create FormData for file uploads
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof File) {
                    formData.append(key, value);
                } else if (typeof value === 'object') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, String(value));
                }
            });

            // Submit to API
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admissions`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "api-key": process.env.NEXT_PUBLIC_API_KEY,
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / (progressEvent.total || 100)
                        );
                        setUploadProgress(progress);
                    },
                }
            );

            if (response.data.status === "success") {
                toast.success("Admission application submitted successfully!");
                // Reset form or redirect
                form.reset();
                setStep(1);
            } else {
                throw new Error(response.data.message || "Submission failed");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
            setUploadProgress(0);
        }
    };

    const nextStep = async () => {
        const currentStep = 2;
        const fieldsToValidate = stepFields[currentStep]; // Now works
        // Validate current step before proceeding
        const fields = fieldsToValidate
        const isValid = await form.trigger(fields as any);

        if (isValid) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    };

    // Fields to validate at each step
    const stepFields = {
        1: ["fullName", "email", "phone", "dob", "gender", "address", "city", "state", "pincode", "country"],
        2: ["neetScore", "neetRank", "twelfthPercentage", "twelfthBoard", "twelfthYear", "tenthPercentage", "tenthBoard", "tenthYear", "preferredCountry", "preferredCourse"],
        3: ["neetScorecard", "neetAdmitCard", "twelfthMarksheet", "tenthMarksheet", "aadharCard", "passportPhoto"],
        4: ["paymentMethod", "termsAccepted"],
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Admission Application Form
                    </CardTitle>
                    <div className="mt-6">
                        <Progress value={(step / 4) * 100} className="h-2" />
                        <div className="flex justify-between mt-2 text-sm text-gray-600">
                            <span>Personal Details</span>
                            <span>Academic Info</span>
                            <span>Documents</span>
                            <span>Payment</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Step 1: Personal Information */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Personal Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your full name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="Enter your email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input type="tel" placeholder="Enter your phone number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="dob"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Date of Birth</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Gender</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="flex gap-4"
                                                        >
                                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="male" />
                                                                </FormControl>
                                                                <FormLabel>Male</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="female" />
                                                                </FormControl>
                                                                <FormLabel>Female</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="other" />
                                                                </FormControl>
                                                                <FormLabel>Other</FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem className="md:col-span-2">
                                                    <FormLabel>Address</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Enter your full address" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your city" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>State</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your state" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="pincode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Pincode</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter pincode" {...field} />
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
                                                    <FormControl>
                                                        <Input placeholder="Enter your country" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Academic Information */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Academic Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="neetScore"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>NEET Score</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter your NEET score"
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="neetRank"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>NEET Rank</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter your NEET rank"
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="twelfthPercentage"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>12th Percentage</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter 12th percentage"
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
                                            name="twelfthBoard"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>12th Board</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter 12th board" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="twelfthYear"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>12th Passing Year</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter passing year"
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tenthPercentage"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>10th Percentage</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter 10th percentage"
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
                                            name="tenthBoard"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>10th Board</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter 10th board" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tenthYear"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>10th Passing Year</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter passing year"
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="preferredCountry"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Preferred Country</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g., Kazakhstan" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="preferredCourse"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Preferred Course</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g., MBBS" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Document Upload */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Document Upload</h3>
                                    <p className="text-sm text-gray-600">
                                        Please upload clear scanned copies of the following documents (PDF, JPG, or PNG)
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="neetScorecard"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>NEET Scorecard*</FormLabel>
                                                    <FormControl>
                                                        <FileUpload
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={(file) => field.onChange(file)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="neetAdmitCard"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>NEET Admit Card*</FormLabel>
                                                    <FormControl>
                                                        <FileUpload
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={(file) => field.onChange(file)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="twelfthMarksheet"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>12th Marksheet*</FormLabel>
                                                    <FormControl>
                                                        <FileUpload
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={(file) => field.onChange(file)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tenthMarksheet"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>10th Marksheet*</FormLabel>
                                                    <FormControl>
                                                        <FileUpload
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={(file) => field.onChange(file)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="aadharCard"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Aadhar Card*</FormLabel>
                                                    <FormControl>
                                                        <FileUpload
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={(file) => field.onChange(file)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="passportPhoto"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Passport Photo*</FormLabel>
                                                    <FormControl>
                                                        <FileUpload
                                                            accept=".jpg,.jpeg,.png"
                                                            onChange={(file) => field.onChange(file)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="panCard"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>PAN Card (Optional)</FormLabel>
                                                    <FormControl>
                                                        <FileUpload
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={(file) => field.onChange(file)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="passport"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Passport (Optional)</FormLabel>
                                                    <FormControl>
                                                        <FileUpload
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={(file) => field.onChange(file)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Payment & Confirmation */}
                            {step === 4 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Payment & Confirmation</h3>
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="paymentMethod"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Payment Method</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                                        >
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border p-4 rounded-lg">
                                                                <FormControl>
                                                                    <RadioGroupItem value="credit_card" />
                                                                </FormControl>
                                                                <FormLabel>Credit Card</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border p-4 rounded-lg">
                                                                <FormControl>
                                                                    <RadioGroupItem value="debit_card" />
                                                                </FormControl>
                                                                <FormLabel>Debit Card</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border p-4 rounded-lg">
                                                                <FormControl>
                                                                    <RadioGroupItem value="net_banking" />
                                                                </FormControl>
                                                                <FormLabel>Net Banking</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border p-4 rounded-lg">
                                                                <FormControl>
                                                                    <RadioGroupItem value="upi" />
                                                                </FormControl>
                                                                <FormLabel>UPI</FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="border p-4 rounded-lg">
                                            <h4 className="font-medium mb-2">Application Summary</h4>
                                            <div className="space-y-2 text-sm">
                                                <p>Consultation Fee: <span className="font-semibold">₹1,000</span></p>
                                                <p>Service Tax (18%): <span className="font-semibold">₹180</span></p>
                                                <p className="pt-2 border-t font-semibold">
                                                    Total Amount: <span className="text-lg">₹1,180</span>
                                                </p>
                                            </div>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="termsAccepted"
                                            render={({ field }) => (
                                                <FormItem className="flex items-start space-x-2 space-y-0">
                                                    <FormControl>
                                                        <input
                                                            type="checkbox"
                                                            checked={field.value}
                                                            onChange={(e) => field.onChange(e.target.checked)}
                                                            className="mt-1"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm">
                                                        I agree to the Terms & Conditions and Privacy Policy. I confirm that all
                                                        information provided is accurate.
                                                    </FormLabel>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-6">
                                {step > 1 ? (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={prevStep}
                                        disabled={isSubmitting}
                                    >
                                        Back
                                    </Button>
                                ) : (
                                    <div></div>
                                )}
                                {step < 4 ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={isSubmitting}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Submitting...
                                                {uploadProgress > 0 && (
                                                    <span className="ml-2">{uploadProgress}%</span>
                                                )}
                                            </>
                                        ) : (
                                            "Submit Application"
                                        )}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}