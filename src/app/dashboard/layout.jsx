import SideBar from "@/components/SideBar";

export default function RootLayout({ children }) {
  return (
    <div class="flex h-screen relative gap-8">
      <SideBar />
      <div className="flex-grow">{children}</div>
      
    </div>
  );
}
