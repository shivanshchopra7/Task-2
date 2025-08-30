import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
  nextButtonText?: string;
  showBackButton?: boolean;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  description,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isNextDisabled = false,
  isSubmitting = false,
  nextButtonText = "Next",
  showBackButton = true,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Student Enrollment
            </h1>
            <p className="text-muted-foreground">
              Complete your registration to start your learning journey
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Form Card */}
          <Card className="shadow-form bg-gradient-card border-0">
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  {title}
                </h2>
                <p className="text-muted-foreground">{description}</p>
              </div>

              {children}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {showBackButton && onBack ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {onNext && (
                  <Button
                    type="submit"
                    onClick={onNext}
                    disabled={isNextDisabled || isSubmitting}
                    className="flex items-center gap-2 bg-gradient-primary hover:opacity-90"
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        {nextButtonText}
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};