import { ButtonStyled } from "components/ButtonStyled";
import Modal from "components/Modal/Modal";
import { Flex } from "components/User/Flex";
import { UserTitle } from "components/User/UserForm";
import { useEffect, useState } from "react";
import { FaBars, FaThList } from "react-icons/fa";
import { InputComponent } from "components/InputComponent";

export default function InputFilter({ allEmployees, setFilteredEmployees }) {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<any>({});
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

  const setFilterValues = (e, type) => {
    const { value } = e.target;
    if (!value) {
      delete filters[type];
      setFilters(filters);
    }
    setFilters({ ...filters, [type]: value });
  };

  useEffect(() => {
    const filterKeys = Object.keys(filters);
    setFilteredEmployees(
      allEmployees.filter((employee) => {
        for (let i = 0; i < filterKeys.length; i++) {
          if (
            !employee[filterKeys[i]]
              .toLowerCase()
              .includes(filters[filterKeys[i]].toLowerCase())
          ) {
            return false;
          }
        }
        return true;
      })
    );
  }, [filters]);

  const openCloseFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  return (
    <>
      <Flex>
        <UserTitle size="40px">Directory</UserTitle>
      </Flex>
      <Flex justify="space-between" margin="20px">
        <Flex>
          <InputComponent
            width="405px"
            height="60px"
            value={filters.surname}
            placeholder="Search"
            type="text"
            onChange={(e) => {
              setFilterValues(e, "surname");
            }}
          />
          <ButtonStyled
            margin=" 0 0 0 10px"
            height="60px"
            width="120px"
            onClick={openCloseFilterModal}
          >
            Filter
          </ButtonStyled>
        </Flex>
        <Flex margin="10px">
          <ButtonStyled margin="5px">
            <FaBars size="2em" />
          </ButtonStyled>
          <ButtonStyled margin="5px">
            <FaThList size="2em" />
          </ButtonStyled>
        </Flex>
      </Flex>
      <Modal
        visibility={filterModalVisible}
        right="48%"
        top="29%"
        close={openCloseFilterModal}
      >
        {Object.values(inputs).map((input) => {
          return (
            <Flex
              key={input.title + input.title}
              content="space-around"
              width="100%"
            >
              <InputComponent
                value={filters[input.title]}
                onChange={(e) => {
                  setFilterValues(e, input.title);
                }}
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
  );
}
