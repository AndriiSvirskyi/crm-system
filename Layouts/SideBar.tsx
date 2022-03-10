import styled from "styled-components";
import {
  FaHome,
  FaRegUserCircle,
  FaRegCheckCircle,
  FaRegCalendar,
  FaAddressBook,
  FaCalendarCheck,
  FaBook,
  FaRegChartBar,
  FaListOl,
} from "react-icons/fa";
import { Flex } from "styled-components/Flex";
import { UserTitle } from "styled-components/UserForm";
import { useRecoilValue } from "recoil";
import { hamburgerState } from "state/atoms";
import router from "next/router";
import { useEffect, useState } from "react";

type PropsSideBar = {
  background: string;
  collapsed: boolean;
};
export const SideBarStyles = styled.div<PropsSideBar>`
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 70px;
  background-color: ${({ theme }) => theme.colors.primary};
  width: ${(props) => (props.collapsed ? "60px" : "280px")};
  height: 100%;
  overflow: auto;
  color: ${(props) => props.theme.colors.text};
  font-size: 20px;
`;

type SidebarLinkProps = {
  background?: string;
  color?: string;
};

const SidebarLink = styled.li<SidebarLinkProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  list-style: none;
  padding: 10px 15px;
  font-size: 16px;
  color: ${(props) => props.color || props.theme.colors.text};
  background: ${(props) => props.background || props.theme.colors.primary};
  align-self: stretch;
  &:hover {
    background: #eeeeee;
  }
  span {
    margin: 0 0 0 20px;
  }
`;

export default function SideBar(props) {
  const hamburger = useRecoilValue(hamburgerState);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.user) {
      setUser(JSON.parse(localStorage.user));
    }
  }, []);

  return (
    <SideBarStyles {...props} collapsed={hamburger}>
      <aside>
        <Flex direction="column" margin="10px 0 0 0">
          <SidebarLink onClick={() => router.push(`/employees/${user?.id}`)}>
            <FaRegUserCircle size="25" />
            {!hamburger && <span>Me</span>}
          </SidebarLink>
          <SidebarLink onClick={() => router.push("/")}>
            <FaHome size="25" />
            {!hamburger && <span>Home</span>}
          </SidebarLink>
          <SidebarLink onClick={() => router.push("/tasks")}>
            <FaRegCheckCircle size="25" />
            {!hamburger && <span>Tasks</span>}
          </SidebarLink>
          <SidebarLink onClick={() => router.push("/time-tracker")}>
            <FaCalendarCheck size="25" />
            {!hamburger && <span>Time tracker</span>}
          </SidebarLink>
        </Flex>
        {!hamburger && (
          <UserTitle size="16px" margin="40px 0 15px 6px">
            Company
          </UserTitle>
        )}
        <Flex direction="column">
          <SidebarLink onClick={() => router.push("/calendar")}>
            <FaRegCalendar size="25" />
            {!hamburger && <span>Calendar</span>}
          </SidebarLink>
          <SidebarLink onClick={() => router.push("/projects")}>
            <FaListOl size="25" />
            {!hamburger && <span>Projects</span>}
          </SidebarLink>
          <SidebarLink onClick={() => router.push("/employees")}>
            <FaAddressBook size="25" />
            {!hamburger && <span>Employees</span>}
          </SidebarLink>
          <SidebarLink onClick={() => router.push("/knowledge")}>
            <FaBook size="25" />
            {!hamburger && <span>Knowledge base</span>}
          </SidebarLink>
          <SidebarLink onClick={() => router.push("/reports")}>
            <FaRegChartBar size="25" />
            {!hamburger && <span>Reports</span>}
          </SidebarLink>
        </Flex>
      </aside>
    </SideBarStyles>
  );
}
