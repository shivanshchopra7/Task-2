import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { academicDetailsSchema, type AcademicDetailsData, subjectsByClass } from "@/lib/schemas/enrollment";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import { FormLayout } from "@/components/form/FormLayout";
import { FormField } from "@/components/form/FormField";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Step2() {
  const navigate = useNavigate();
  const { studentDetails, academicDetails, updateAcademicDetails, markStepCompleted, completedSteps } = useEnrollment();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(academicDetails.subjects || []);
  
  // Route guard
  useEffect(() => {
    if (!completedSteps.has(1)) {
      toast({
        title: "Please complete Step 1 first",
        description: "You need to fill in your student details before proceeding.",
        variant: "destructive",
      });
      navigate("/enroll/step-1");
    }
  }, [completedSteps, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<AcademicDetailsData>({
    resolver: zodResolver(academicDetailsSchema),
    defaultValues: {
      ...academicDetails,
      subjects: selectedSubjects,
    },
    mode: "onChange",
  });

  const watchedValues = watch();
  const scholarshipApplication = watch("scholarshipApplication");

  useEffect(() => {
    updateAcademicDetails({ ...watchedValues, subjects: selectedSubjects });
  }, [watchedValues, selectedSubjects, updateAcademicDetails]);

  const availableSubjects = studentDetails.class ? subjectsByClass[studentDetails.class as keyof typeof subjectsByClass] : [];
  const minSubjects = studentDetails.class && ["11", "12"].includes(studentDetails.class) ? 3 : 2;

  const handleSubjectToggle = (subject: string) => {
    const newSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter(s => s !== subject)
      : [...selectedSubjects, subject];
    
    setSelectedSubjects(newSubjects);
    setValue("subjects", newSubjects, { shouldValidate: true });
  };

  const removeSubject = (subject: string) => {
    const newSubjects = selectedSubjects.filter(s => s !== subject);
    setSelectedSubjects(newSubjects);
    setValue("subjects", newSubjects, { shouldValidate: true });
  };

  const onSubmit = (data: AcademicDetailsData) => {
    updateAcademicDetails({ ...data, subjects: selectedSubjects });
    markStepCompleted(2);
    toast({
      title: "Step 2 completed!",
      description: "Moving to address and guardian details.",
    });
    navigate("/enroll/step-3");
  };

  const onBack = () => {
    navigate("/enroll/step-1");
  };

  return (
    <FormLayout
      title="Academic Details"
      description="Tell us about your academic preferences and goals"
      currentStep={2}
      totalSteps={4}
      onNext={handleSubmit(onSubmit)}
      onBack={onBack}
      isNextDisabled={!isValid}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Subjects Selection */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-foreground">
              Subjects <span className="text-destructive">*</span>
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Select at least {minSubjects} subjects for Class {studentDetails.class}
            </p>
          </div>

          {/* Selected Subjects */}
          {selectedSubjects.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSubjects.map((subject) => (
                <Badge key={subject} variant="secondary" className="flex items-center gap-1">
                  {subject}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeSubject(subject)}
                  />
                </Badge>
              ))}
            </div>
          )}

          {/* Subject Checkboxes */}
          <Card className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSubjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox
                    id={subject}
                    checked={selectedSubjects.includes(subject)}
                    onCheckedChange={() => handleSubjectToggle(subject)}
                  />
                  <Label htmlFor={subject} className="text-sm cursor-pointer">
                    {subject}
                  </Label>
                </div>
              ))}
            </div>
          </Card>

          {selectedSubjects.length < minSubjects && (
            <p className="text-sm text-destructive">
              Please select at least {minSubjects} subjects
            </p>
          )}
        </div>

        <FormField
          control={control}
          name="examGoal"
          label="Exam Goal"
          type="select"
          placeholder="Select your primary goal"
          options={[
            { value: "Board Excellence", label: "Board Excellence" },
            { value: "Concept Mastery", label: "Concept Mastery" },
            { value: "Competitive Prep", label: "Competitive Prep" },
          ]}
          required
          description="What's your main focus for this academic year?"
        />

        <FormField
          control={control}
          name="weeklyStudyHours"
          label="Weekly Study Hours"
          type="number"
          placeholder="Enter hours per week"
          required
          description="How many hours can you dedicate to studies per week? (1-40)"
        />

        <FormField
          control={control}
          name="scholarshipApplication"
          label="Apply for Scholarship"
          type="switch"
          description="Check if you're interested in scholarship opportunities"
        />

        {scholarshipApplication && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <FormField
              control={control}
              name="lastExamPercentage"
              label="Last Exam Percentage"
              type="number"
              placeholder="Enter your percentage"
              required
              description="Your percentage in the last major exam (0-100)"
            />

            <FormField
              control={control}
              name="achievements"
              label="Achievements"
              type="textarea"
              placeholder="List your academic achievements, competitions, awards..."
              description="Optional: Mention any relevant achievements or extracurricular activities"
            />
          </div>
        )}
      </form>
    </FormLayout>
  );
}