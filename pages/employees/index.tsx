import { UserWindow } from "styled-components/UserForm";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MainLayout from "layouts/MainLayout";
import InputFilter from "containers/employees/InputFilter";
import { FaUserPlus } from "react-icons/fa";
import { usersState } from "state/atoms";
import GridCardEmployees from "containers/employees/GridCardEmployees";
import TableCardEmployees from "containers/employees/TableCardEmployees";
import Pagination from "containers/employees/Pagination";
import Loader from "styled-components/Loader";
import { Button } from "components/Button";
import SignUpSteper from "containers/employees/sign-up/SignUpSteper";
import SnackBar from "containers/SnackBar";

export default function Employee() {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
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

  const getEmployees = async () => {
    return fetch(`http://localhost:4200/users`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUsersToRecoil(res);
        setFilteredEmployees(res);
        return res;
      });
  };

  const successCreateUser = () => {
    setShowSnackbar(true);
    getEmployees();
  };

  useEffect(() => {
    getEmployees();
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
      <button onClick={()=> setShowSnackbar(true)}> show snackBar</button>
      </UserWindow>
      {userRole === "admin" && (
        <>
          <Button
            position="fixed"
            right="20px"
            bottom="20px"
            width="60px"
            height="50px"
            onClick={() => setShowModal(!showModal)}
          >
            <FaUserPlus size={30}></FaUserPlus>
          </Button>
          {showModal && (
            <SignUpSteper
              closeModal={() => setShowModal(false)}
              successCreateUser={successCreateUser}
              users={users}
            />
          )}
        </>
      )}
      {showSnackbar && <SnackBar setShowSnackbar={setShowSnackbar}  />}
    </MainLayout>
  );
}
