import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

type Props = {
  sidebar: React.ReactNode
}

export default function SidebarLayout({ sidebar }: Props) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {sidebar}

        <main className="flex-1">
          {/* your “navbar/topbar” area */}
          <div className="flex items-center gap-2 border-b p-4">
            <SidebarTrigger />
            {/* add title / user menu etc here */}
          </div>

          {/* THIS is what makes /kontoransatt and /registrer show inside the same layout */}
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
