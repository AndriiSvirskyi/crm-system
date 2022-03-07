import { UserWindow } from "components/User/UserForm";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MainLayout from "Layouts/MainLayout";
import InputFilter from "components/employyes/InputFilter";
import { SignUpModal } from "components/Modal/SignUpModal";
import { FaUserPlus } from "react-icons/fa";
import { usersState } from "state/atoms";
import GridCardEmployees from "components/employyes/GridCardEmployees";
import TableCardEmployees from "components/employyes/TableCardEmployees";
import Pagination from "components/employyes/Pagination";
import Loader from "components/Loader";
import { ButtonStyled } from "components/ButtonStyled";
import SignUpSteper from "components/Steper/SignUpSteper";

export default function Employee() {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [activeTabRender, setActiveTabRender] = useState("block");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 12;
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
        {!users ? (
          <Loader />
        ) : (
          <>
            {activeTabRender === "block" && (
              <GridCardEmployees filteredEmployees={currentEmployees} />
            )}
            {activeTabRender === "table" && (
              <TableCardEmployees filteredEmployees={currentEmployees} />
            )}
          </>
        )}
        <Pagination
          employeesPerPage={employeesPerPage}
          totalEmployees={filteredEmployees.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </UserWindow>
      {userRole === "admin" && (
        <>
          <ButtonStyled
            position="fixed"
            right="20px"
            bottom="20px"
            width="60px"
            height="50px"
            onClick={() => setShowModal(!showModal)}
          >
            <FaUserPlus size={30}></FaUserPlus>
          </ButtonStyled>
          {showModal && (
            <SignUpSteper closeModal={() => setShowModal(false)} />
          )}
        </>
      )}
    </MainLayout>
  );
}
