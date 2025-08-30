import React, { createContext, useContext, useState, useEffect } from "react";
import {
  StudentDetailsData,
  AcademicDetailsData,
  AddressGuardianData,
  EnrollmentData,
} from "@/lib/schemas/enrollment";

export interface EnrollmentContextType {
  studentDetails: Partial<StudentDetailsData>;
  academicDetails: Partial<AcademicDetailsData>;
  addressGuardian: Partial<AddressGuardianData>;
  updateStudentDetails: (data: Partial<StudentDetailsData>) => void;
  updateAcademicDetails: (data: Partial<AcademicDetailsData>) => void;
  updateAddressGuardian: (data: Partial<AddressGuardianData>) => void;
  getAllData: () => Partial<EnrollmentData>;
  clearAllData: () => void;
  completedSteps: Set<number>;
  markStepCompleted: (step: number) => void;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

const STORAGE_KEY = "enrollment_form_data";

export const EnrollmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [studentDetails, setStudentDetails] = useState<Partial<StudentDetailsData>>({});
  const [academicDetails, setAcademicDetails] = useState<Partial<AcademicDetailsData>>({});
  const [addressGuardian, setAddressGuardian] = useState<Partial<AddressGuardianData>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setStudentDetails(parsed.studentDetails || {});
        setAcademicDetails(parsed.academicDetails || {});
        setAddressGuardian(parsed.addressGuardian || {});
        setCompletedSteps(new Set(parsed.completedSteps || []));
      }
    } catch (error) {
      console.error("Error loading enrollment data from localStorage:", error);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      studentDetails,
      academicDetails,
      addressGuardian,
      completedSteps: Array.from(completedSteps),
    };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Error saving enrollment data to localStorage:", error);
    }
  }, [studentDetails, academicDetails, addressGuardian, completedSteps]);

  const updateStudentDetails = (data: Partial<StudentDetailsData>) => {
    setStudentDetails((prev) => ({ ...prev, ...data }));
  };

  const updateAcademicDetails = (data: Partial<AcademicDetailsData>) => {
    setAcademicDetails((prev) => ({ ...prev, ...data }));
  };

  const updateAddressGuardian = (data: Partial<AddressGuardianData>) => {
    setAddressGuardian((prev) => ({ ...prev, ...data }));
  };

  const getAllData = (): Partial<EnrollmentData> => {
    return {
      ...studentDetails,
      ...academicDetails,
      ...addressGuardian,
    };
  };

  const clearAllData = () => {
    setStudentDetails({});
    setAcademicDetails({});
    setAddressGuardian({});
    setCompletedSteps(new Set());
    localStorage.removeItem(STORAGE_KEY);
  };

  const markStepCompleted = (step: number) => {
    setCompletedSteps((prev) => new Set([...prev, step]));
  };

  return (
    <EnrollmentContext.Provider
      value={{
        studentDetails,
        academicDetails,
        addressGuardian,
        updateStudentDetails,
        updateAcademicDetails,
        updateAddressGuardian,
        getAllData,
        clearAllData,
        completedSteps,
        markStepCompleted,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error("useEnrollment must be used within an EnrollmentProvider");
  }
  return context;
};