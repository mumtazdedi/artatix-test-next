"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar1, Home } from "lucide-react";
import ArtatixLogo from "@/assets/artatix-logo.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { removeCookiesToken } from "@/lib/cookiesStore";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: Calendar1,
    },
  ];

  const handleLogout = () => {
    removeCookiesToken();
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <Image
            priority
            src={ArtatixLogo}
            alt="Artatix Logo"
            className="h-10 w-auto"
            width={100}
            height={100}
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "flex items-center gap-x-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground",
                        "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                      )}
                      isActive={item.url === pathname}
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Logout</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to logout?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will be logged out of your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SidebarFooter>
      </Sidebar>
    </>
    // <Sidebar>
    //   <SidebarHeader />
    //   <SidebarContent>
    //     <SidebarGroup />
    //     <SidebarGroup />
    //   </SidebarContent>
    //   <SidebarFooter />
    // </Sidebar>
  );
}
