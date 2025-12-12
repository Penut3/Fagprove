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
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"

export function KontorSidebar() {
  const { pathname } = useLocation()

 const items = [
    { title: "Kontor Side", to: "/Kontoransatt" },
    { title: "Alle brukere", to: "/users" }, // Or use "/kontoransatt" as the default
    { title: "Registrer Deltager", to: "/registrer" },
    { title: "Logg ut", to: "/" },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="p-4 font-semibold">Kontor navbar</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={pathname === item.to}>
                    <Link to={item.to}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 text-sm text-muted-foreground">
        © 2025
      </SidebarFooter>
    </Sidebar>
  )
}
