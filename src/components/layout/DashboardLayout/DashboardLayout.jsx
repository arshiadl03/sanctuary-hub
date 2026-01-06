import { DashboardSidebar } from "./DashboardSidebar/DashboardSidebar";

export function DashboardLayout({ children, title, description }) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar />
      <main className="flex-1 p-4 lg:p-8">
        {(title || description) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{title}</h1>
            )}
            {description && (
              <p className="text-muted-foreground mt-2">{description}</p>
            )}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
