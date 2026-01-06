// User types were originally defined in TypeScript. This file contains
// plain JavaScript fallbacks and UI label constants used across the app.

// Role labels for UI
export const roleLabels = {
  admin: "مدیر سامانه",
  teacher: "استاد",
  assistant: "دستیار",
  student: "قرآن‌آموز (کودک)",
};

// Gender labels for UI (1 = male, 2 = female)
export const genderLabels = {
  1: "پسر",
  2: "دختر",
};

export const getRoleLabel = (role) => roleLabels[role] || "نقش نامشخص";
export const getGenderLabel = (gender) => genderLabels[gender] || "نامشخص";