import { z } from "zod";
import { nameSchema, emailSchema, phoneSchema } from "./common.schema";

// ─── REUSABLE LOAN FIELD SCHEMAS ──────────────────────────────────────────────

export const panSchema = z
  .string()
  .min(1, "PAN card number is required")
  .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i, "Invalid PAN format (e.g. ABCDE1234F)");

export const aadharLast4Schema = z
  .string()
  .min(1, "Last 4 digits of Aadhar are required")
  .regex(/^\d{4}$/, "Enter exactly 4 digits");

export const pinCodeSchema = z
  .string()
  .min(1, "PIN code is required")
  .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code");

export const dobSchema = z
  .string()
  .min(1, "Date of birth is required")
  .refine((val) => {
    const age = Math.floor((new Date() - new Date(val)) / (365.25 * 24 * 60 * 60 * 1000));
    return age >= 18;
  }, "Applicant must be at least 18 years old")
  .refine((val) => {
    const age = Math.floor((new Date() - new Date(val)) / (365.25 * 24 * 60 * 60 * 1000));
    return age <= 70;
  }, "Applicant age must be below 70 years");

export const loanAmountSchema = z
  .string()
  .min(1, "Loan amount is required")
  .refine((val) => !isNaN(Number(val)) && Number(val) >= 100000, "Minimum loan amount is ₹1,00,000")
  .refine((val) => Number(val) <= 100000000, "Maximum loan amount is ₹10 Crore");

export const monthlyIncomeSchema = z
  .string()
  .min(1, "Monthly income is required")
  .refine((val) => !isNaN(Number(val)) && Number(val) >= 10000, "Monthly income must be at least ₹10,000");

export const passportSchema = z
  .string()
  .min(1, "Passport number is required")
  .regex(/^[A-Z][1-9][0-9]{7}$/i, "Invalid passport format (e.g. A1234567)");

export const interestRateSchema = z
  .string()
  .min(1, "Interest rate is required")
  .refine((val) => {
    const n = parseFloat(val);
    return !isNaN(n) && n >= 1 && n <= 30;
  }, "Enter a valid interest rate between 1% and 30%");

// ─── BASIC DETAILS SCHEMA ─────────────────────────────────────────────────────
export const basicDetailsSchema = z.object({
  fullName:             nameSchema,
  dob:                  dobSchema,
  gender:               z.string().min(1, "Gender is required"),
  mobile:               phoneSchema,
  email:                emailSchema,
  panCard:              panSchema,
  aadharLast4:          aadharLast4Schema,
  maritalStatus:        z.string().min(1, "Marital status is required"),
  residentialAddress:   z.string().min(5, "Residential address is required"),
  city:                 z.string().min(1, "City is required"),
  state:                z.string().min(1, "State is required"),
  pinCode:              pinCodeSchema,
});

// ─── EMPLOYMENT SCHEMA ────────────────────────────────────────────────────────
export const employmentSchema = z.object({
  employmentType:  z.string().min(1, "Employment type is required"),
  companyName:     z.string().min(2, "Company name is required"),
  designation:     z.string().min(2, "Designation is required"),
  workExperience:  z.string().min(1, "Work experience is required"),
  monthlyIncome:   monthlyIncomeSchema,
  officeAddress:   z.string().min(5, "Office address is required"),
});

// ─── FINANCIAL SCHEMA ─────────────────────────────────────────────────────────
export const financialSchema = z.object({
  loanAmount:    loanAmountSchema,
  loanTenure:    z.string().min(1, "Loan tenure is required"),
  existingLoans: z.string().min(1, "Please select existing loans status"),
  bankName:      z.string().min(2, "Bank name is required"),
  accountType:   z.string().min(1, "Account type is required"),
  cibilScore:    z.string().min(1, "CIBIL score is required"),
});

// ─── CO-APPLICANT SCHEMA ──────────────────────────────────────────────────────
export const coApplicantSchema = z.object({
  hasCoApplicant: z.string().min(1, "Please select co-applicant option"),
  // Optional fields — only validated if hasCoApplicant !== "No"
  coApplicantName:     z.string().optional(),
  coApplicantRelation: z.string().optional(),
  coApplicantMobile:   z.string().optional(),
  coApplicantIncome:   z.string().optional(),
  coApplicantPAN:      z.string().optional(),
});

// ─── CONSENT SCHEMA ───────────────────────────────────────────────────────────
export const consentSchema = z.object({
  consentDeclaration: z.literal(true).refine(v => v === true, "You must accept this declaration"),
  consentCreditCheck: z.literal(true).refine(v => v === true, "You must authorize the credit check"),
  consentMarketing:   z.boolean().optional(),
  eSignature:         z.string().min(2, "Digital signature (full name) is required"),
});

// ─── FIELD-LEVEL VALIDATOR MAP ────────────────────────────────────────────────
// Maps field `pattern` property → Zod schema for per-field validation in the form
export const FIELD_VALIDATORS = {
  fullName:      (v) => runZod(nameSchema, v),
  mobile:        (v) => runZod(phoneSchema, v),
  email:         (v) => runZod(emailSchema, v),
  panCard:       (v) => runZod(panSchema, v),
  aadharLast4:   (v) => runZod(aadharLast4Schema, v),
  dob:           (v) => runZod(dobSchema, v),
  pinCode:       (v) => runZod(pinCodeSchema, v),
  loanAmount:    (v) => runZod(loanAmountSchema, v),
  monthlyIncome: (v) => runZod(monthlyIncomeSchema, v),
  passport:      (v) => runZod(passportSchema, v),
  currentROI:    (v) => runZod(interestRateSchema, v),
};

// Helper — runs a Zod schema on a single value, returns error string or null
function runZod(schema, value) {
  const result = schema.safeParse(value);
  if (!result.success) {
    // Zod v4 uses .issues, v3 uses .errors — handle both
    const issues = result.error?.issues || result.error?.errors || [];
    return issues[0]?.message || "Invalid value";
  }
  return null;
}
