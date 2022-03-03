import { UserWindow } from "components/User/UserForm";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MainLayout from "Layouts/MainLayout";
import InputFilter from "components/employyes/InputFilter";
import { SignUpModal } from "components/modal/SignUpModal";
import { Button } from "components/Button";
import { FaUserPlus } from "react-icons/fa";
import { usersState } from "state/atoms";
import GridCardEmployees from "components/employyes/GridCardEmployees";
import TableCardEmployees from "components/employyes/TableCardEmployees";
import Pagination from "components/employyes/Pagination";


export default function Employee() {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [activeTabRender, setActiveTabRender] = useState("block");
// pagination
const [currentPage, setCurrentPage] = useState(1)
const [employeesPerPage, setEmployeesPerPage] = useState(12);

const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

const paginate = (pageNumber) => setCurrentPage(pageNumber)

// pagination
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

  return (
    <MainLayout>
      <UserWindow>
        <InputFilter
          activeTabRender={activeTabRender}
          setActiveTabRender={setActiveTabRender}
          allEmployees={users || []}
          setFilteredEmployees={setFilteredEmployees}
        />
        {users ? (
          <>
            {activeTabRender === "block" && (
              <GridCardEmployees filteredEmployees={currentEmployees} />
              )}
            {activeTabRender === "table" && (
              <TableCardEmployees filteredEmployees={currentEmployees} />
              )}
          </>
        ) : (
          <>loading</>
          )}
      <Pagination employeesPerPage={employeesPerPage} totalEmployees={filteredEmployees.length} paginate={paginate} />
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
          {showModal && (
            <SignUpModal closeModal={() => setShowModal(false)} users={users} />
            )}
        </>
      )}
    </MainLayout>
  );
}
