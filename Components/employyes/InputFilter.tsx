import { ButtonStyled } from "components/ButtonStyled";
import Modal from "components/Modal/Modal";
import { Flex } from "components/User/Flex";
import { UserTitle } from "components/User/UserForm";
import { useEffect, useState } from "react";
import { FaBars, FaThList } from "react-icons/fa";
import { InputComponent } from "components/InputComponent";
import styled from "styled-components";

const FiltersContainer = styled.div`
  position: relative;
`;

const Filters = styled.div`
  position: absolute;
  background: #eeeeee;
  left: 10px;
  padding: 10px;
  width: calc(100% - 20px);
`;

export default function InputFilter({ allEmployees, setFilteredEmployees }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
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
          if (!employee[filterKeys[i]].includes(filters[filterKeys[i]])) {
            return false;
          }
        }
        return true;
      })
    );
  }, [filters]);

  const clearInputValues = () => {
    setFilters({
      name: filters.name,
      role: "",
      department: "",
      unit: "",
      address: "",
      team: "",
    });
  };
  return (
    <>
      <Flex justify="space-between" margin="">
        <UserTitle size="40px">Directory</UserTitle>
      </Flex>
      <div>
        <Flex justify="space-between">
          <FiltersContainer>
            <Flex margin="0 0 0 10px">
              <InputComponent
                width="100%"
                height="60px"
                value={filters.name}
                placeholder="Search"
                type="text"
                onChange={(e) => {
                  setFilterValues(e, "name");
                }}
              />
              <ButtonStyled
                margin=" 0 0 0 15px"
                padding="15px"
                width="90px"
                onClick={() => {
                  setIsFiltersOpen(!isFiltersOpen);
                }}
              >
                Filter
              </ButtonStyled>
            </Flex>
            {isFiltersOpen && (
              <Filters>
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
                        type="text"
                        placeholder={input.title}
                        height="25px"
                        margin="5px"
                        width="100%"
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
                <Flex justify="end">
                  <ButtonStyled
                    onClick={clearInputValues}
                    margin="10px"
                    padding="5px"
                  >
                    Clear all
                  </ButtonStyled>
                </Flex>
              </Filters>
            )}
          </FiltersContainer>
          <Flex margin="10px">
            <ButtonStyled>
              <FaBars size="2em" />
            </ButtonStyled>
            <ButtonStyled>
              <FaThList size="2em" />
            </ButtonStyled>
          </Flex>
        </Flex>
      </div>
    </>
  );
}
