import { useRouter } from "next/router";
import Header from "./Header";
import SideBar from "./SideBar";
import { Flex } from "components/User/Flex";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Flex>
        <SideBar />
        {children}
      </Flex>
    </>
  );
}
