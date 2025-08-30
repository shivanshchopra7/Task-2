import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { studentDetailsSchema, type StudentDetailsData } from "@/lib/schemas/enrollment";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import { FormLayout } from "@/components/form/FormLayout";
import { FormField } from "@/components/form/FormField";
import { toast } from "@/hooks/use-toast";

export default function Step1() {
  const navigate = useNavigate();
  const { studentDetails, updateStudentDetails, markStepCompleted } = useEnrollment();
  
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<StudentDetailsData>({
    resolver: zodResolver(studentDetailsSchema),
    defaultValues: studentDetails,
    mode: "onChange",
  });

  // Watch all fields to update context in real-time
  const watchedValues = watch();
  useEffect(() => {
    updateStudentDetails(watchedValues);
  }, [watchedValues, updateStudentDetails]);

  const onSubmit = (data: StudentDetailsData) => {
    updateStudentDetails(data);
    markStepCompleted(1);
    toast({
      title: "Step 1 completed!",
      description: "Moving to academic details.",
    });
    navigate("/enroll/step-2");
  };

  return (
    <FormLayout
      title="Student Details"
      description="Let's start with your basic information"
      currentStep={1}
      totalSteps={4}
      onNext={handleSubmit(onSubmit)}
      isNextDisabled={!isValid}
      showBackButton={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          required
        />

        <FormField
          control={control}
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          required
        />

        <FormField
          control={control}
          name="mobile"
          label="Mobile Number"
          type="tel"
          placeholder="Enter your mobile number"
          prefix="+91"
          required
          description="Enter a 10-digit mobile number starting with 6, 7, 8, or 9"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="class"
            label="Class"
            type="select"
            placeholder="Select your class"
            options={[
              { value: "9", label: "Class 9" },
              { value: "10", label: "Class 10" },
              { value: "11", label: "Class 11" },
              { value: "12", label: "Class 12" },
            ]}
            required
          />

          <FormField
            control={control}
            name="board"
            label="Board"
            type="select"
            placeholder="Select your board"
            options={[
              { value: "CBSE", label: "CBSE" },
              { value: "ICSE", label: "ICSE" },
              { value: "State Board", label: "State Board" },
            ]}
            required
          />
        </div>

        <FormField
          control={control}
          name="preferredLanguage"
          label="Preferred Language"
          type="select"
          placeholder="Select your preferred language"
          options={[
            { value: "English", label: "English" },
            { value: "Hindi", label: "Hindi" },
            { value: "Hinglish", label: "Hinglish" },
          ]}
          required
          description="Choose the language you're most comfortable learning in"
        />
      </form>
    </FormLayout>
  );
}