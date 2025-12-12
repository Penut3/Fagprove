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

export function LaererSidebar() {
  const { pathname } = useLocation()

  const items = [
    { title: "Login", to: "/" },
    { title: "Før fravær", to: "/example" },
    { title: "Mine Kurs", to: "/laerer" },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="p-4 font-semibold">Lærer navbar</SidebarHeader>

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
