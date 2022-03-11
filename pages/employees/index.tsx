import { UserWindow } from "styled-components/UserForm";
import { useContext, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MainLayout from "Layouts/MainLayout";
import InputFilter from "containers/employees/InputFilter";
import { FaUserPlus } from "react-icons/fa";
import { usersState } from "state/atoms";
import GridCardEmployees from "containers/employees/GridCardEmployees";
import TableCardEmployees from "containers/employees/TableCardEmployees";
import Pagination from "containers/employees/Pagination";
import Loader from "styled-components/Loader";
import { Button } from "components/Button";
import SignUpSteper from "containers/employees/sign-up/SignUpSteper";
import { SnackbarContext } from "providers/useSnackbar";

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
  const [showModalSignUp, setShowModalSignUp] = useState(false);
  const currentUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const [userRole, setUserRole] = useState();
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  const snackBar = useContext(SnackbarContext);

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
    snackBar.openSnackBar({ message: "User was created!", type: "success" });
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
      </UserWindow>
      {userRole === "admin" && (
        <>
          <Button
            position="fixed"
            right="20px"
            bottom="20px"
            width="60px"
            height="50px"
            onClick={() => {
              setShowModalSignUp(!showModalSignUp);
            }}
          >
            <FaUserPlus size={30}></FaUserPlus>
          </Button>
          {showModalSignUp && (
            <SignUpSteper
              closeModal={() => setShowModalSignUp(false)}
              successCreateUser={successCreateUser}
              users={users}
            />
          )}
        </>
      )}
    </MainLayout>
  );
}
