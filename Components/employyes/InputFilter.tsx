import { ButtonStyled } from "components/ButtonStyled";
import Modal from "components/Modal/Modal";
import { Flex } from "components/User/Flex";
import {
  UserTitle
} from "components/User/UserForm";
import { useEffect, useState } from "react";
import { ImTree } from "react-icons/im";
import { FaBars, FaThList } from "react-icons/fa";
import { ImAddressBook } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi";
import { InputComponent } from "components/InputComponent";

export default function InputFilter({allEmployees, setFilteredEmployees}) {
  const [filterModalVisible, setFilterModalVisible] = useState(false);

    const [filters, setFilters] = useState({
        name: "",
        role: "",
        department: "",
        unit: "",
        address: "",
        team: "",
      });
    
      const icons = {
        1: <ImAddressBook />,
        2: <HiUserGroup />,
        3: <ImTree />,
      };
      const inputs = {
        role: {
          title: "role",
          dataList: { admin: "admin", manager: "manager", user: "user" },
        },
        department: {
          title: "department",
          dataList: {
            UI: "UI",
            HR: "HR",
            Tech: "Tech",
          },
        },
        unit: {
          title: "unit",
          dataList: {
            backend: "backend",
            frontend: "frontend",
            architect: "architect",
          },
        },
        address: {
          title: "address",
          dataList: {
            Lviv: "Lviv , Ukraine",
            Bali: "Bali , Indonezia",
            Monako: "Monako , Monako",
            Hawayii: "Hawaii , USA",
          },
        },
        team: {
          title: "team",
          dataList: { Andriy: "Andriy", NeAndriy: "NeAndriy" },
        },
      };
    
    
    useEffect(() => {
        const products = allEmployees.filter(
          (user) =>
            user.name.toLowerCase().indexOf(filters.name.toLowerCase()) >= 0 &&
            user.role.toLowerCase().indexOf(filters.role.toLowerCase()) >= 0 &&
            user.department
              .toLowerCase()
              .indexOf(filters.department.toLowerCase()) >= 0 &&
            user.unit.toLowerCase().indexOf(filters.unit.toLowerCase()) >= 0 &&
            user.address.toLowerCase().indexOf(filters.address.toLowerCase()) >=
              0 &&
            user.team.toLowerCase().indexOf(filters.team.toLowerCase()) >= 0
        );
        setFilteredEmployees(products);
      }, [filters]);
      const openCloseFilterModal = () => {
        setFilterModalVisible(!filterModalVisible);
      };
  return (
      <>
    <Flex justify="space-between" margin=''>
          <UserTitle size="40px">Список співробітників</UserTitle>
          <Flex margin="50px 20px 0 0">
          {Object.values(icons).map((tab) => {
            return (
              <ButtonStyled
              width="100px"
              height="40px"
              background="#9C9C9C"
              key={tab}
              onClick={() => {}}
              >
                {tab}
              </ButtonStyled>
            );
          })}
          </Flex>
        </Flex>
        <Flex justify="space-between" margin="20px">
          <Flex>
            <InputComponent
              width="405px"
              height="60px"
              value={filters.name}
              placeholder="Search"
              type="text"
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <ButtonStyled margin=" 0 0 0 10px" height='60px' width='120px' onClick={openCloseFilterModal}>
              Filter
            </ButtonStyled>
          </Flex>
          <Flex margin="10px">
            <ButtonStyled><FaBars size="2em" /></ButtonStyled>
            <ButtonStyled><FaThList size="2em" /></ButtonStyled>
          </Flex>
        </Flex>
        <Modal visibility={filterModalVisible} right="48%" top="29%" close={openCloseFilterModal}>
          {Object.values(inputs).map((input) => {
            return (
              <Flex
                key={input.title + input.title}
                content="space-around"
                width="100%"
              >
                <InputComponent
                  value={filters[input.title]}
                  onChange={(e) =>
                    setFilters({ ...filters, [input.title]: e.target.value })
                  }
                  margin="20px"
                  type="text"
                  placeholder={input.title}
                  height="40px"
                  width="500px"
                  list={input.title}
                />
                <datalist id={input.title}>
                  {Object.values(input.dataList).map((position) => (
                    <option key={position} value={position} />
                  ))}
                </datalist>
              </Flex>
            );
          })}
        </Modal>
        </>
  )
}
