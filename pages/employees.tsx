import { Flex } from "components/User/Flex";
import {
  UserBlockItem,
  UserText,
  UserTitle,
  UserWindow,
} from "components/User/UserForm";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MainLayout from "Layouts/MainLayout";
import InputFilter from "components/employyes/InputFilter";
import { SignUpModal } from "components/Modal/SignUpModal";
import { Button } from "components/Button";
import { FaUserPlus } from "react-icons/fa";
import { usersState } from "state/atoms";
import router from "next/router";

export default function Employee() {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const [userRole, setUserRole] = useState();
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  useEffect(() => {
    if (!users) {
      const responce = fetch(`http://localhost:4200/users`);

      responce
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setUsersToRecoil(res);
          setFilteredEmployees(res);
        });
    }
    setUserRole(JSON.parse(currentUser).role);
  }, []);

  const projects = users.reduce((acc, cur) => {
    if (acc[cur.project]) {
      acc[cur.project].push(cur.name + " " + cur.surname);
    } else {
      acc[cur.project] = [cur.name + " " + cur.surname];
    }
    return acc;
  }, {});

  return (
    <MainLayout>
      <UserWindow>
        <InputFilter
          allEmployees={users || []}
          setFilteredEmployees={setFilteredEmployees}
        />

        {users ? (
          <Flex justify="start" wrap="wrap">
            {filteredEmployees.map((user) => (
              <UserBlockItem
                width="31%"
                key={user.id}
                onClick={() => {
                  router.push(`/employees/${user.id}`);
                }}
              >
                <Flex>
                  <UserTitle>{user.name}</UserTitle>
                </Flex>
                <UserText>
                  {user.role} в {user.address}
                </UserText>
              </UserBlockItem>
            ))}
          </Flex>
        ) : (
          <>loading</>
        )}
      </UserWindow>
    </MainLayout>
  );
}
