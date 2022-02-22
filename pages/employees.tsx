import { Flex } from "components/User/Flex";
import {
  UserBlockItem,
  UserText,
  UserTitle,
  UserWindow,
} from "components/User/UserForm";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import InputFilter from "components/employyes/InputFilter";

export default function Employee({ users }) {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
 
  useEffect(() => {
    setAllEmployees(Object.values(users));
    setFilteredEmployees(Object.values(users));
  }, []);

  return (
    <MainLayout>
      <UserWindow>
        <InputFilter allEmployees={allEmployees} setFilteredEmployees={setFilteredEmployees}  />
        
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
