import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { enrollmentSchema } from "@/lib/schemas/enrollment";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import { FormLayout } from "@/components/form/FormLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { User, BookOpen, MapPin, Edit, ChevronDown, CheckCircle, Code } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Review() {
  const navigate = useNavigate();
  const { getAllData, clearAllData, completedSteps } = useEnrollment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showJsonData, setShowJsonData] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Route guard
  useEffect(() => {
    if (!completedSteps.has(3)) {
      toast({
        title: "Please complete all previous steps first",
        description: "You need to complete Steps 1, 2, and 3 before reviewing.",
        variant: "destructive",
      });
      navigate("/enroll/step-1");
    }
  }, [completedSteps, navigate]);

  const allData = getAllData();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate all data
      const validatedData = enrollmentSchema.parse(allData);
      
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmittedData(validatedData);
      setIsSubmitted(true);
      
      // Log to console
      console.log("Enrollment Data Submitted:", validatedData);
      
      toast({
        title: "Enrollment Successful!",
        description: "Your registration has been submitted successfully.",
      });
      
    } catch (error) {
      console.error("Validation Error:", error);
      toast({
        title: "Submission Failed",
        description: "Please check all fields and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onBack = () => {
    navigate("/enroll/step-3");
  };

  const handleStartOver = () => {
    clearAllData();
    setIsSubmitted(false);
    setSubmittedData(null);
    navigate("/enroll/step-1");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="shadow-form bg-gradient-card border-0">
              <CardContent className="p-8">
                <div className="mb-6">
                  <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Enrollment Successful!
                  </h1>
                  <p className="text-muted-foreground">
                    Thank you for registering with us. Your enrollment has been submitted successfully.
                  </p>
                </div>

                <Alert className="mb-6">
                  <AlertDescription>
                    You will receive a confirmation email with further instructions within 24 hours.
                  </AlertDescription>
                </Alert>

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="mb-4 flex items-center justify-center flex mx-auto gap-2"
                      onClick={() => setShowJsonData(!showJsonData)}
                    >
                      <Code className="h-4 w-4" />
                      {showJsonData ? "Hide" : "View"} Submitted Data
                      <ChevronDown className={`h-4 w-4 transition-transform ${showJsonData ? "rotate-180" : ""}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="mb-6">
                      <CardContent className="p-4">
                        <pre className="text-xs overflow-auto bg-muted p-4 rounded">
                          {JSON.stringify(submittedData, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full">
  <Button
    onClick={handleStartOver}
    variant="outline"
    className="w-full md:w-auto"
  >
    Submit Another Enrollment
  </Button>

  <Button
    onClick={() => navigate("/")}
    variant="outline"
    className="w-full md:w-auto"
  >
    Go To Home
  </Button>
</div>

               
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormLayout
      title="Review & Submit"
      description="Please review your information before submitting"
      currentStep={4}
      totalSteps={4}
      onNext={handleSubmit}
      onBack={onBack}
      isSubmitting={isSubmitting}
      nextButtonText="Submit Enrollment"
    >
      <div className="space-y-6">
        {/* Student Details */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Student Details
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/enroll/step-1")}
              className="flex items-center gap-1"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{allData.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{allData.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mobile</p>
              <p className="font-medium">+91 {allData.mobile}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Class & Board</p>
              <p className="font-medium">Class {allData.class} ({allData.board})</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Preferred Language</p>
              <p className="font-medium">{allData.preferredLanguage}</p>
            </div>
          </CardContent>
        </Card>

        {/* Academic Details */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Academic Details
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/enroll/step-2")}
              className="flex items-center gap-1"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Selected Subjects</p>
              <div className="flex flex-wrap gap-2">
                {allData.subjects?.map((subject) => (
                  <Badge key={subject} variant="secondary">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Exam Goal</p>
                <p className="font-medium">{allData.examGoal}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weekly Study Hours</p>
                <p className="font-medium">{allData.weeklyStudyHours} hours</p>
              </div>
            </div>
            {allData.scholarshipApplication && (
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-medium text-sm mb-2">Scholarship Application</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Last Exam Percentage</p>
                    <p className="font-medium">{allData.lastExamPercentage}%</p>
                  </div>
                  {allData.achievements && (
                    <div>
                      <p className="text-sm text-muted-foreground">Achievements</p>
                      <p className="font-medium text-sm">{allData.achievements}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Address & Guardian */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Address & Guardian Details
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/enroll/step-3")}
              className="flex items-center gap-1"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">
                {allData.addressLine}<br />
                {allData.city}, {allData.state} - {allData.pinCode}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Guardian Name</p>
                <p className="font-medium">{allData.guardianName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Guardian Mobile</p>
                <p className="font-medium">+91 {allData.guardianMobile}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Plan</p>
                <p className="font-medium">{allData.paymentPlan}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Mode</p>
                <p className="font-medium">{allData.paymentMode}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormLayout>
  );
}