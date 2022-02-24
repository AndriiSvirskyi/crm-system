import { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

export default function MainLayout({ children }) {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  return (
    <>
      <Header collapsed={collapsedSidebar} setCollapsed={setCollapsedSidebar} />
      <SideBar collapsed={collapsedSidebar}/>
      {children}
    </>
  );
}
