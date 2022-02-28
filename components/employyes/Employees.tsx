import { Button } from "components/Button";
import { SignUpModal } from "components/Modal/SignUpModal";
import { Flex } from "components/User/Flex";
import { UserBlockItem, UserText, UserTitle } from "components/User/UserForm";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

export const Employees = ({
  users,
  filteredEmployees,
}) => {
  const [showModal, setShowModal] = useState(false);
  const currentUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    setUserRole(JSON.parse(currentUser).role);
  }, []);
  return (
    <Flex justify="start" wrap="wrap">
      {filteredEmployees.map((user) => (
        <Link href={`/employees/${user.id}`} key={user.id + user.name} passHref>
          <UserBlockItem width="30%">
            <UserTitle>
              {user.surname} {user.name}
            </UserTitle>
            <UserText>
              {user.role} in {user.address}
            </UserText>
          </UserBlockItem>
        </Link>
      ))}
      {userRole === "admin" && (
        <>
          <Button
            position="fixed"
            right="0"
            bottom="0"
            margin="0 20px 20px 0"
            onClick={() => setShowModal(!showModal)}
          >
            <FaUserPlus size={30}></FaUserPlus>
          </Button>
          <SignUpModal users={users} display={showModal ? "initial" : "none"} />
        </>
      )}
    </Flex>
  );
};
