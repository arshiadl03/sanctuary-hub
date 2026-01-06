import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  ClipboardCheck,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { cn } from "@/lib/utils";

const parentLinks = [
  { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/dashboard/children", label: "فرزندان من", icon: Users },
  { href: "/dashboard/progress", label: "پیشرفت", icon: BarChart3 },
  { href: "/dashboard/rewards", label: "جوایز", icon: Award },
];

const teacherLinks = [
  { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/dashboard/mahfil", label: "محفل من", icon: BookOpen },
  { href: "/dashboard/students", label: "شاگردان", icon: Users },
  { href: "/dashboard/attendance", label: "حضور و غیاب", icon: Calendar },
  { href: "/dashboard/evaluations", label: "ارزشیابی", icon: ClipboardCheck },
  { href: "/dashboard/messages", label: "پیام‌ها", icon: MessageSquare },
];

const adminLinks = [
  { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/dashboard/mahafil", label: "محافل", icon: BookOpen },
  { href: "/dashboard/users", label: "کاربران", icon: Users },
  { href: "/dashboard/rewards-manage", label: "مدیریت جوایز", icon: Award },
  { href: "/dashboard/reports", label: "گزارش‌ها", icon: BarChart3 },
  { href: "/dashboard/settings", label: "تنظیمات", icon: Settings },
];

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { profile, roles, signOut } = useAuth();

  const isTeacher = roles.includes("teacher") || roles.includes("assistant");
  const isAdmin = roles.includes("admin");

  const links = isAdmin ? adminLinks : isTeacher ? teacherLinks : parentLinks;

  const isActiveLink = (href) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* موبایل تاگل */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-lg bg-primary text-primary-foreground shadow-lg"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* اورلی موبایل */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* سایدبار */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 right-0 z-40 h-screen w-64 bg-sidebar border-l border-sidebar-border transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* هدر */}
          <div className="flex items-center gap-3 p-4 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              {profile?.first_name?.charAt(0) || "ک"}
            </div>
            <div>
              <p className="font-bold text-sidebar-foreground">
                {profile?.first_name} {profile?.last_name}
              </p>
              <p className="text-xs text-sidebar-foreground/70">
                {isAdmin ? "مدیر" : isTeacher ? "استاد" : "والد"}
              </p>
            </div>
          </div>

          {/* لینک‌ها */}
          <nav className="flex-1 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActiveLink(link.href)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* فوتر */}
          <div className="pt-4 border-t border-sidebar-border">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              بازگشت به سایت
            </Link>
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              خروج از حساب
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
