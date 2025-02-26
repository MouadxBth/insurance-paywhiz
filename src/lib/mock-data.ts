export const mockEmployees = [
  {
    id: "emp-001",
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    department: "Engineering",
    status: "completed",
    lastUpdated: "2023-11-15",
    plansSelected: ["Auto", "Life"],
  },
  {
    id: "emp-002",
    name: "Sarah Williams",
    email: "sarah.williams@company.com",
    department: "Marketing",
    status: "in-progress",
    lastUpdated: "2023-11-10",
    plansSelected: ["Auto"],
  },
  {
    id: "emp-003",
    name: "Michael Brown",
    email: "michael.brown@company.com",
    department: "Sales",
    status: "not-started",
    lastUpdated: "N/A",
    plansSelected: [],
  },
  {
    id: "emp-004",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    department: "HR",
    status: "completed",
    lastUpdated: "2023-11-12",
    plansSelected: ["Home", "Life"],
  },
  {
    id: "emp-005",
    name: "David Wilson",
    email: "david.wilson@company.com",
    department: "Finance",
    status: "in-progress",
    lastUpdated: "2023-11-08",
    plansSelected: ["Home"],
  },
  {
    id: "emp-006",
    name: "Jessica Martinez",
    email: "jessica.martinez@company.com",
    department: "Engineering",
    status: "not-started",
    lastUpdated: "N/A",
    plansSelected: [],
  },
  {
    id: "emp-007",
    name: "Robert Taylor",
    email: "robert.taylor@company.com",
    department: "Marketing",
    status: "completed",
    lastUpdated: "2023-11-14",
    plansSelected: ["Auto", "Home", "Life"],
  },
  {
    id: "emp-008",
    name: "Jennifer Anderson",
    email: "jennifer.anderson@company.com",
    department: "Sales",
    status: "in-progress",
    lastUpdated: "2023-11-09",
    plansSelected: ["Life"],
  },
];

export const mockEnrollmentData = [
  { name: "Auto Insurance", enrolled: 65, notEnrolled: 35 },
  { name: "Home Insurance", enrolled: 42, notEnrolled: 58 },
  { name: "Life Insurance", enrolled: 78, notEnrolled: 22 },
];

export const mockTrendData = [
  { month: "Jan", auto: 45, home: 30, life: 60 },
  { month: "Feb", auto: 50, home: 35, life: 65 },
  { month: "Mar", auto: 55, home: 38, life: 68 },
  { month: "Apr", auto: 60, home: 40, life: 70 },
  { month: "May", auto: 65, home: 45, life: 72 },
  { month: "Jun", auto: 70, home: 48, life: 75 },
  { month: "Jul", auto: 72, home: 50, life: 78 },
  { month: "Aug", auto: 75, home: 52, life: 80 },
];

export const mockPlanDistribution = [
  { name: "Auto", value: 45 },
  { name: "Home", value: 30 },
  { name: "Life", value: 25 },
];

export type InsurancePlan = {
  name: string;
  id: string;
  type: string;
  provider: string;
  premium: number;
  coverage: number;
  deductible: number;
  renewalDate?: string;
  isPopular?: boolean;
  employerContribution?: number;
  recommendationReason?: string;
};

// Mock data for Employee dashboard
export const mockCurrentPlans: InsurancePlan[] = [
  {
    id: "plan-001",
    type: "auto",
    name: "Premium Auto Insurance",
    provider: "Liberty Mutual",
    premium: 85,
    coverage: 300000,
    deductible: 500,
    renewalDate: "2024-06-15",
  },
  {
    id: "plan-002",
    type: "life",
    name: "Term Life Insurance",
    provider: "Statewide Insurance",
    premium: 45,
    coverage: 250000,
    deductible: 0,
    renewalDate: "2024-08-22",
  },
];

export const mockRecommendedPlans: InsurancePlan[] = [
  {
    id: "rec-001",
    type: "home",
    name: "Home Protection Plus",
    provider: "Allstate",
    premium: 68,
    coverage: 350000,
    deductible: 1000,
    isPopular: true,
    employerContribution: 10,
    recommendationReason: "Based on your home value",
  },
  {
    id: "rec-002",
    type: "auto",
    name: "Comprehensive Auto",
    provider: "Progressive",
    premium: 92,
    coverage: 500000,
    deductible: 250,
    isPopular: false,
    employerContribution: 15,
    recommendationReason: "Matches your current vehicle",
  },
  {
    id: "rec-003",
    type: "life",
    name: "Family Protection Plan",
    provider: "MetLife",
    premium: 55,
    coverage: 400000,
    deductible: 0,
    isPopular: true,
    employerContribution: 25,
    recommendationReason: "Ideal for your family size",
  },
  {
    id: "rec-004",
    type: "auto",
    name: "Basic Auto Coverage",
    provider: "Statewide Insurance",
    premium: 65,
    coverage: 200000,
    deductible: 1000,
    isPopular: false,
    employerContribution: 15,
    recommendationReason: "Budget-friendly option",
  },
  {
    id: "rec-005",
    type: "home",
    name: "Standard Home Insurance",
    provider: "Liberty Mutual",
    premium: 52,
    coverage: 250000,
    deductible: 1500,
    isPopular: false,
    employerContribution: 10,
    recommendationReason: "Most affordable option",
  },
  {
    id: "rec-006",
    type: "life",
    name: "Premium Life Coverage",
    provider: "Prudential",
    premium: 78,
    coverage: 750000,
    deductible: 0,
    isPopular: true,
    employerContribution: 25,
    recommendationReason: "Enhanced coverage for dependents",
  },
];
