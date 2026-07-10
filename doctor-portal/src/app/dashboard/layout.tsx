"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  FileText, 
  LogOut, 
  Activity, 
  Menu, 
  X,
  Stethoscope,
  HeartPulse,
  Sun,
  Moon
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Authenticate session on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          setDoctor(data.user);
        }
      })
      .catch(() => {
        router.push("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Appointments", path: "/dashboard/appointments", icon: CalendarDays },
    { name: "Prescriptions", path: "/dashboard/prescriptions", icon: FileText },
    { name: "Patients", path: "/dashboard/patients", icon: Users },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent mx-auto" />
          <p className="text-sm font-semibold mt-3">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex bg-slate-50 ${darkMode ? "dark" : ""}`}>
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-100 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col border-r border-slate-800`}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-800 bg-slate-950/60">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-teal-400 flex items-center justify-center">
            <Stethoscope size={16} className="text-white" />
          </div>
          <div>
            <h2 className="font-heading font-black text-sm tracking-tight text-white">MADHAV DENTAL</h2>
            <p className="text-[10px] text-teal-400 uppercase font-bold tracking-wider">Doctor Portal</p>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/10" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon size={18} /> {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Doctor Details Summary */}
        {doctor && (
          <div className="p-4 mx-4 mb-4 rounded-2xl bg-slate-950/40 border border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-primary-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                {doctor.name.split(" ").slice(-1)[0][0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-100 truncate">{doctor.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{doctor.doctorSpecialization || "Dental Specialist"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/20">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-all"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Main Header bar */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {doctor && (
              <div className="hidden sm:block">
                <h3 className="font-heading font-bold text-slate-800 text-sm md:text-base leading-none">{doctor.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{doctor.doctorTitle || "Practice Surgeon"}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full font-semibold">
              <HeartPulse size={12} className="animate-pulse" /> Clinic Active
            </div>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* Main Viewport Content */}
        <main className="flex-1 p-6 md:p-8 bg-slate-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}
