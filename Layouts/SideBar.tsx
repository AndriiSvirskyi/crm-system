import Link from "next/link";
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
import { Flex } from "components/User/Flex";
import { UserTitle } from "components/User/UserForm";

type PropsSideBar = {
  background: string;
};
export const SideBarStyles = styled.div<PropsSideBar>`
  position: fixed;
  left: 0;
  top: 0;
  margin: 70px 0 0 0;
  background-color: ${(props) =>
    props.background || props.theme.colors.primary};
  width: 280px;
  height: 100%;
  overflow: auto;
  color: ${(props) => props.background || props.theme.colors.text};
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
export default function SideBar({ collapsed }, props) {
  return (
    <SideBarStyles {...props}>
      <aside>
        <Flex direction="column" margin="40px 0 0 0">
          <Link passHref href={"/employees/profile"}>
            <SidebarLink>
              <FaRegUserCircle size="25" />
              {collapsed ? "" : <span>Me</span>}
            </SidebarLink>
          </Link>
          <Link passHref href={"/"}>
            <SidebarLink>
              <FaHome size="25" />{collapsed ? "" : 
              <span>Main page</span>}
            </SidebarLink>
          </Link>
          <Link passHref href={"/tasks"}>
            <SidebarLink>
              <FaRegCheckCircle size="25" />{collapsed ? "" : 
              <span>Tasks</span>}
            </SidebarLink>
          </Link>
          <Link passHref href={"/time-tracker"}>
            <SidebarLink>
              <FaCalendarCheck size="25" />{collapsed ? "" : 
              <span>Time tracker</span>}
            </SidebarLink>
          </Link>
        </Flex>
        <UserTitle size="16px" margin="40px 0 15px 6px">
          Company
        </UserTitle>
        <Flex direction="column">
          <Link passHref href={"/calendar"}>
            <SidebarLink>
              <FaRegCalendar size="25" />{collapsed ? "" : 
              <span>Calendar</span>}
            </SidebarLink>
          </Link>
          <Link passHref href={"/projects"}>
            <SidebarLink>
              <FaListOl size="25" />{collapsed ? "" : 
              <span>Projects</span>}
            </SidebarLink>
          </Link>
          <Link passHref href={"/employees"}>
            <SidebarLink>
              <FaAddressBook size="25" />{collapsed ? "" : 
              <span>Employees</span>}
            </SidebarLink>
          </Link>
          <Link passHref href={"/knowledge"}>
            <SidebarLink>
              <FaBook size="25" />{collapsed ? "" : 
              <span>Knowledge base</span>}
            </SidebarLink>
          </Link>
          <Link passHref href={"/reports"}>
            <SidebarLink>
              <FaRegChartBar size="25" />{collapsed ? "" : 
              <span>Reports</span>}
            </SidebarLink>
          </Link>
        </Flex>
      </aside>
    </SideBarStyles>
  );
}
