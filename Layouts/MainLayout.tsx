import { SnackbarContext } from "providers/useSnackbar";
import { useContext } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { Snackbar } from "./Snackbar";

type MainLayoutProps = {
  children: any;
};
export default function MainLayout({ children }: MainLayoutProps) {
  const {
    snackBar: { message, type, isActive },
  } = useContext(SnackbarContext);
  return (
    <>
      <Header />
      <SideBar />
      {children}
      {isActive && <Snackbar message={message} type={type} />}
    </>
  );
}
