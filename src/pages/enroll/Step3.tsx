import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  addressGuardianSchema,
  type AddressGuardianData,
  indianStates,
} from "@/lib/schemas/enrollment";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import { FormLayout } from "@/components/form/FormLayout";
import { FormField } from "@/components/form/FormField";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { MapPin, User, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Step3() {
  const navigate = useNavigate();
  const {
    addressGuardian,
    updateAddressGuardian,
    markStepCompleted,
    completedSteps,
  } = useEnrollment();

  const [isStateLocked, setIsStateLocked] = useState(false);

  // Route guard
  useEffect(() => {
    if (!completedSteps.has(2)) {
      toast({
        title: "Please complete previous steps first",
        description: "You need to complete Steps 1 and 2 before proceeding.",
        variant: "destructive",
      });
      navigate("/enroll/step-1");
    }
  }, [completedSteps, navigate]);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
  } = useForm<AddressGuardianData>({
    resolver: zodResolver(addressGuardianSchema),
    defaultValues: addressGuardian,
    mode: "onChange",
  });

  const watchedValues = watch();

  // Auto-save to context
  useEffect(() => {
    updateAddressGuardian(watchedValues);
  }, [watchedValues, updateAddressGuardian]);

  // ✅ Auto-fill city + state when PIN entered
  const pinCode = watch("pinCode");
  useEffect(() => {
    if (pinCode && pinCode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status === "Success" && data[0].PostOffice?.length) {
            const postOffice = data[0].PostOffice[0];
            setValue("city", postOffice.District, { shouldValidate: true });
            setValue("state", postOffice.State, { shouldValidate: true });
            setIsStateLocked(true);

            toast({
              title: "Address auto-filled",
              description: `Detected ${postOffice.District}, ${postOffice.State}`,
            });
          } else {
            setIsStateLocked(false);
            toast({
              title: "Invalid PIN code",
              description: "Could not fetch location. Please enter manually.",
              variant: "destructive",
            });
          }
        })
        .catch(() => {
          setIsStateLocked(false);
          toast({
            title: "Error",
            description: "Failed to fetch city/state. Try again.",
            variant: "destructive",
          });
        });
    } else {
      // If PIN is cleared, unlock fields
      setIsStateLocked(false);
    }
  }, [pinCode, setValue]);

  const onSubmit = (data: AddressGuardianData) => {
    updateAddressGuardian(data);
    markStepCompleted(3);
    toast({
      title: "Step 3 completed!",
      description: "Moving to review and submit.",
    });
    navigate("/enroll/review");
  };

  const onBack = () => {
    navigate("/enroll/step-2");
  };

  const stateOptions = indianStates.map((state) => ({
    value: state,
    label: state,
  }));

  return (
    <FormLayout
      title="Address & Guardian Details"
      description="Provide your address and guardian information"
      currentStep={3}
      totalSteps={4}
      onNext={handleSubmit(onSubmit)}
      onBack={onBack}
      isNextDisabled={!isValid}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Address Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              Address Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name="pinCode"
              label="PIN Code"
              type="text"
              placeholder="Enter 6-digit PIN code"
              required
              description="Enter your area's postal PIN code"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="state"
                label="State / UT"
                type="select"
                placeholder="Select your state"
                options={stateOptions}
                required
                disabled={isStateLocked} // ✅ Lock field when auto-filled
              />

              <FormField
                control={control}
                name="city"
                label="City"
                type="text"
                placeholder="Enter your city"
                required
              />
            </div>

            <FormField
              control={control}
              name="addressLine"
              label="Complete Address"
              type="textarea"
              placeholder="Enter your complete address including house number, street, landmark..."
              required
              description="Minimum 10 characters, maximum 120 characters"
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Guardian Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-primary" />
              Guardian Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name="guardianName"
              label="Guardian Name"
              type="text"
              placeholder="Enter guardian's full name"
              required
              description="Parent or legal guardian's name"
            />

            <FormField
              control={control}
              name="guardianMobile"
              label="Guardian Mobile"
              type="tel"
              placeholder="Enter guardian's mobile number"
              prefix="+91"
              required
              description="Guardian's 10-digit mobile number"
            />
          </CardContent>
        </Card>

        {/* Payment Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name="paymentPlan"
              label="Payment Plan"
              type="select"
              placeholder="Select payment frequency"
              options={[
                {
                  value: "Quarterly",
                  label: "Quarterly (4 payments per year)",
                },
                {
                  value: "Half-Yearly",
                  label: "Half-Yearly (2 payments per year)",
                },
                { value: "Annual", label: "Annual (1 payment per year)" },
              ]}
              required
              description="Choose how frequently you'd like to make payments"
            />

            <FormField
              control={control}
              name="paymentMode"
              label="Preferred Payment Mode"
              type="select"
              placeholder="Select payment method"
              options={[
                { value: "UPI", label: "UPI (Google Pay, PhonePe, etc.)" },
                { value: "Card", label: "Debit/Credit Card" },
                { value: "NetBanking", label: "Net Banking" },
              ]}
              required
              description="Your preferred method for making payments"
            />
          </CardContent>
        </Card>
      </form>
    </FormLayout>
  );
}
