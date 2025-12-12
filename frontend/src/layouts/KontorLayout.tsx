import SidebarLayout from "./SidebarLayout"
import { KontorSidebar } from "@/components/Kontor/KontorSidebar"

export default function KontorLayout() {
  return <SidebarLayout sidebar={<KontorSidebar />} />
}
