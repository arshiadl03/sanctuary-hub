// انواع کاربران و نقش‌ها

export type UserRole = "admin" | "teacher" | "assistant" | "parent" | "child";

export type Gender = "male" | "female";

export interface User {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
}

export interface Parent extends User {
  role: "parent";
  firstName: string;
  lastName: string;
  provinceId: string;
  cityId: string;
  address?: string;
  children: Child[];
}

export interface Child {
  id: string;
  parentId: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  avatarUrl?: string;
  mahfilId?: string;
  enrollmentDate?: string;
  totalPoints: number;
  memorizedSurahs: string[];
}

export interface Teacher extends User {
  role: "teacher";
  firstName: string;
  lastName: string;
  title: string;
  bio?: string;
  avatarUrl?: string;
  mahfilIds: string[];
  specializations: string[];
}

export interface Assistant extends User {
  role: "assistant";
  firstName: string;
  lastName: string;
  teacherId: string;
  mahfilIds: string[];
}

export interface Admin extends User {
  role: "admin";
  firstName: string;
  lastName: string;
  permissions: AdminPermission[];
}

export type AdminPermission =
  | "manage_users"
  | "manage_mahafil"
  | "manage_content"
  | "view_reports"
  | "manage_rewards";

// فرم‌های ثبت نام
export interface ParentRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  provinceId: string;
  cityId: string;
  address?: string;
  childrenCount: number;
}

export interface ChildRegistrationForm {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  mahfilId?: string;
}

export const roleLabels: Record<UserRole, string> = {
  admin: "مدیر سامانه",
  teacher: "استاد",
  assistant: "دستیار",
  parent: "والد",
  child: "کودک",
};

export const genderLabels: Record<Gender, string> = {
  male: "پسر",
  female: "دختر",
};
