"use client";

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "@/icons/Plus";
import { useRouter, usePathname } from "next/navigation";
import { PrismaUser } from "@/lib/types";

const getMockAvatar = (name: string) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
};

function UpperInfoBar({ user }: { user: PrismaUser | any }) {
  const router = useRouter();
  const pathname = usePathname();

  const getBreadcrumbItems = () => {
    const segments = pathname.split("/").filter(Boolean);
    const items = [{ label: "Home", href: "/dashboard" }];

    segments.forEach((segment, index) => {
      if (segment === "dashboard") {
        items.push({ label: "Dashboard", href: "/dashboard" });
      } else if (segment === "create-page") {
        items.push({ label: "Create", href: "/create-page" });
      } else if (segment === "templates") {
        items.push({ label: "Templates", href: "/templates" });
      } else if (segment === "settings") {
        items.push({ label: "Settings", href: "/settings" });
      } else if (segment === "trash") {
        items.push({ label: "Trash", href: "/trash" });
      } else if (segment === "presentation" && segments[index + 1]) {
        items.push({ label: "Presentation", href: `/presentation/${segments[index + 1]}` });
      }
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.href}>
                {index === breadcrumbItems.length - 1 ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto px-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.push("/create-page")}
        >
          <Plus />
          <span className="hidden sm:inline">New Project</span>
        </Button>
      </div>
    </header>
  );
}

export default UpperInfoBar;