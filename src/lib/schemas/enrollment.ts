import { z } from "zod";

// Step 1 - Student Details Schema
export const studentDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must not exceed 60 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .transform((val) => val.trim()),
  email: z.string().email("Please enter a valid email address"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  class: z.enum(["9", "10", "11", "12"], {
    required_error: "Please select your class",
  }),
  board: z.enum(["CBSE", "ICSE", "State Board"], {
    required_error: "Please select your board",
  }),
  preferredLanguage: z.enum(["English", "Hindi", "Hinglish"], {
    required_error: "Please select your preferred language",
  }),
});

// Step 2 - Academic Details Schema
export const academicDetailsSchema = z
  .object({
    subjects: z
      .array(z.string())
      .min(2, "Please select at least 2 subjects"),
    examGoal: z.enum(["Board Excellence", "Concept Mastery", "Competitive Prep"], {
      required_error: "Please select your exam goal",
    }),
    weeklyStudyHours: z
      .number()
      .min(1, "Study hours must be at least 1")
      .max(40, "Study hours cannot exceed 40"),
    scholarshipApplication: z.boolean(),
    lastExamPercentage: z.number().min(0).max(100).optional(),
    achievements: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.scholarshipApplication) {
        return data.lastExamPercentage !== undefined;
      }
      return true;
    },
    {
      message: "Last exam percentage is required for scholarship application",
      path: ["lastExamPercentage"],
    }
  );

// Step 3 - Address & Guardian Schema
export const addressGuardianSchema = z.object({
  pinCode: z
    .string()
    .regex(/^\d{6}$/, "PIN code must be exactly 6 digits"),
  state: z.string().min(1, "Please select your state"),
  city: z.string().min(1, "Please enter your city"),
  addressLine: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(120, "Address must not exceed 120 characters"),
  guardianName: z
    .string()
    .min(2, "Guardian name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  guardianMobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  paymentPlan: z.enum(["Quarterly", "Half-Yearly", "Annual"], {
    required_error: "Please select a payment plan",
  }),
  paymentMode: z.enum(["UPI", "Card", "NetBanking"], {
    required_error: "Please select a payment mode",
  }),
});

// Base academic schema without refinement for merging
const baseAcademicDetailsSchema = z.object({
  subjects: z
    .array(z.string())
    .min(2, "Please select at least 2 subjects"),
  examGoal: z.enum(["Board Excellence", "Concept Mastery", "Competitive Prep"], {
    required_error: "Please select your exam goal",
  }),
  weeklyStudyHours: z
    .number()
    .min(1, "Study hours must be at least 1")
    .max(40, "Study hours cannot exceed 40"),
  scholarshipApplication: z.boolean(),
  lastExamPercentage: z.number().min(0).max(100).optional(),
  achievements: z.string().optional(),
});

// Combined schema for final submission
export const enrollmentSchema = studentDetailsSchema
  .merge(baseAcademicDetailsSchema)
  .merge(addressGuardianSchema)
  .refine(
    (data) => {
      if (data.scholarshipApplication) {
        return data.lastExamPercentage !== undefined;
      }
      return true;
    },
    {
      message: "Last exam percentage is required for scholarship application",
      path: ["lastExamPercentage"],
    }
  );

export type StudentDetailsData = z.infer<typeof studentDetailsSchema>;
export type AcademicDetailsData = z.infer<typeof academicDetailsSchema>;
export type AddressGuardianData = z.infer<typeof addressGuardianSchema>;
export type EnrollmentData = z.infer<typeof enrollmentSchema>;

// Subject options by class
export const subjectsByClass = {
  "9": ["English", "Mathematics", "Science", "Social Science", "Hindi", "Sanskrit"],
  "10": ["English", "Mathematics", "Science", "Social Science", "Hindi", "Sanskrit"],
  "11": ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Economics", "Business Studies", "Accountancy", "Political Science", "History", "Geography"],
  "12": ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Economics", "Business Studies", "Accountancy", "Political Science", "History", "Geography"],
};

// Indian states
export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];