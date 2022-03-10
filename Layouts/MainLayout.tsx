import Header from "./Header";
import SideBar from "./SideBar";

type MainLayoutProps = {
  children: any;
  isActive?: boolean;
  message?: string;
  type?: string;
}
export default function MainLayout({ children, isActive, message, type }:MainLayoutProps) {
  
  return (
    <>
      <Header />
      <SideBar isActive={isActive} message={message} type={type} />
      {children}
    </>
  );
}
