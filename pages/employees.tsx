import { ButtonStyled } from "components/ButtonStyled";
import { Input } from "components/form/Input";
import { InputComponent } from "components/InputComponent";
import Modal from "components/Modal/Modal";
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

export default function Employee({ users }) {
  const [filterModalVisible, setFilterModalVisible] = useState("hidden");

  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    roleValue: "",
    department: "",
    unit:"",
    location:"",
    team:""
  });
  const workPositions = {
    admin: "admin",
    manager: "manager",
    user: "user",
  };
  const departmentPositions = {
    UI:'UI',
    HR:'HR',
    Tech:'Tech'
  }
  const unit = {
    backend:"backend",
    frontend:"frontend",
    architect:"architect"
  }
  const location = {
    Lviv:'Lviv',
    Bali:'Bali',
    Monako:"Monako",
    Hawayii:"Hawayii"
  }
  const team = {
    Andriy: 'Andriy',
    NeAndriy: "NeAndriy"
  }

  useEffect(() => {
    let products = allEmployees.filter(
      (user) =>
        user.name.toLowerCase().indexOf(filters.search.toLowerCase()) >= 0
    );
    setFilteredEmployees(products);
  }, [filters.search]);

  useEffect(() => {
    let products = allEmployees.filter(
      (user) =>
        user.role.toLowerCase().indexOf(filters.roleValue.toLowerCase()) >= 0
    );
    setFilteredEmployees(products);
  }, [filters.roleValue]);
  useEffect(() => {
    let products = allEmployees.filter(
      (user) =>
        user.department.toLowerCase().indexOf(filters.department.toLowerCase()) >= 0
    );
    setFilteredEmployees(products);
  }, [filters.department]);
  useEffect(() => {
    let products = allEmployees.filter(
      (user) =>
        user.unit.toLowerCase().indexOf(filters.unit.toLowerCase()) >= 0
    );
    setFilteredEmployees(products);
  }, [filters.unit]);
  useEffect(() => {
    let products = allEmployees.filter(
      (user) =>
        user.city.toLowerCase().indexOf(filters.location.toLowerCase()) >= 0
    );
    setFilteredEmployees(products);
  }, [filters.location]);
  useEffect(() => {
    let products = allEmployees.filter(
      (user) =>
        user.team.toLowerCase().indexOf(filters.team.toLowerCase()) >= 0
    );
    setFilteredEmployees(products);
  }, [filters.team]);

  useEffect(() => {
    setAllEmployees(Object.values(users));
    setFilteredEmployees(Object.values(users));
  }, []);

  const openFilterModal = () => {
    setFilterModalVisible("visible");
  };

  const closeFilterModal = () => {
    setFilterModalVisible("hidden");
  };

  return (
    <MainLayout >
      <UserWindow >
        <UserTitle size="30px">Список співробітників</UserTitle>
        <Flex>
        <input
          value={filters.search}
          placeholder="Search"
          type="text"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        <ButtonStyled margin="25px" onClick={openFilterModal}>
          Filter
        </ButtonStyled>
            <ButtonStyled></ButtonStyled>
            <ButtonStyled></ButtonStyled>
            </Flex>
        <Modal visibility={filterModalVisible} right="48%" top="29%">
          <ButtonStyled margin='0 0 0 80%' onClick={closeFilterModal}>x</ButtonStyled>
          <UserBlockItem >
            <input
              value={filters.roleValue}
              onChange={(e) =>
                setFilters({ ...filters, roleValue: e.target.value })
              }
              type="text"
              placeholder="role"
              height="40px"
              width="400px"
              list="roles"
            />
            <datalist id="roles">
              {Object.values(workPositions).map((position) => (
                <option key={position} value={position} />
              ))}
            </datalist>
            <input
              value={filters.department}
              onChange={(e) =>
                setFilters({ ...filters, department: e.target.value })
              }
              type="text"
              placeholder="department"
              height="40px"
              list="department"
            />
            <datalist id="department">
              {Object.values(departmentPositions).map((position) => (
                <option key={position} value={position} />
              ))}
            </datalist>
            <input
              value={filters.roleValue}
              onChange={(e) =>
                setFilters({ ...filters, unit: e.target.value })
              }
              type="text"
              placeholder="Unit"
              height="40px"
              width="400px"
              list="unit"
            />
            <datalist id="unit">
              {Object.values(unit).map((position) => (
                <option key={position} value={position} />
              ))}
            </datalist>
            <input
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              type="text"
              placeholder="Location"
              list="location"
            />
            <datalist id="location">
              {Object.values(location).map((position) => (
                <option key={position} value={position} />
              ))}
            </datalist>
            <input
              value={filters.team}
              onChange={(e) =>
                setFilters({ ...filters, team: e.target.value })
              }
              type="text"
              placeholder="Team"
              height="40px"
              width="400px"
              list="team"
            />
            <datalist id="team">
              {Object.values(team).map((position) => (
                <option key={position} value={position} />
              ))}
            </datalist>
          </UserBlockItem>
        </Modal>

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
                  {user.role} в {user.city}
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
