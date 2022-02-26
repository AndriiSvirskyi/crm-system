import { Flex } from "components/User/Flex";
import {
  UserBlockItem,
  UserText,
  UserTitle,
  UserWindow,
} from "components/User/UserForm";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainLayout from "Layouts/MainLayout";
import InputFilter from "components/employyes/InputFilter";
import { SignUpModal } from "components/Modal/SignUpModal";
import { Button } from "components/Button";
import { FaUserPlus } from "react-icons/fa";

export default function Employee({ users }) {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    setAllEmployees(Object.values(users));
    setFilteredEmployees(Object.values(users));
    setUserRole(JSON.parse(currentUser).role);
  }, []);

  return (
    <MainLayout>
      <UserWindow>
        <InputFilter
          allEmployees={allEmployees}
          setFilteredEmployees={setFilteredEmployees}
        />

        <Flex justify="start" wrap="wrap">
          {filteredEmployees.map((user) => (
            <Link
              href={`/employees/${user.id}`}
              key={user.id + user.name}
              passHref
            >
              <UserBlockItem width="31%">
                <Flex>
                  <UserTitle>{user.name}</UserTitle>
                </Flex>
                <UserText>
                  {user.role} в {user.address}
                </UserText>
              </UserBlockItem>
            </Link>
          ))}
        </Flex>
      </UserWindow>
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
    </MainLayout>
  );
}
export async function getStaticProps() {
  const responce = await fetch(`http://localhost:4200/users`);
  const users = await responce.json();

  return {
    props: { users },
  };
}
