import { Button } from "components/Button";
import { Flex } from "styled-components/Flex";
import { UserTitle } from "styled-components/UserForm";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Input } from "components/Input";
import styled from "styled-components";
import EmployeeTabs from "./EmployeeTabs";

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
const ButtonClose = styled.button`
  cursor: pointer;
  background: #eeeeee;
  border: none;
  &:hover {
    color: #ffffffc0;
  }
`;

export default function InputFilter({
  allEmployees,
  setFilteredEmployees,
  activeTabRender,
  setActiveTabRender,
}) {
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
    division: {
      title: "division",
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
          console.log(!employee[filterKeys[i]]);
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

  const clearInputValues = () => {
    setFilters({
      name: "",
      role: "",
      department: "",
      division: "",
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
              <Input
                width="100%"
                height="60px"
                value={filters.name}
                placeholder="Search"
                type="text"
                onChange={(e) => {
                  setFilterValues(e, "name");
                }}
              />
              <Button
                margin=" 0 0 0 15px"
                padding="15px"
                width="90px"
                onClick={() => {
                  setIsFiltersOpen(!isFiltersOpen);
                }}
              >
                Filter
              </Button>
            </Flex>
            {isFiltersOpen && (
              <Filters>
                <Flex justify="end">
                  <ButtonClose
                    onClick={() => {
                      setIsFiltersOpen(!isFiltersOpen);
                    }}
                  >
                    <FaTimes size={20} />
                  </ButtonClose>
                </Flex>
                {Object.values(inputs).map((input) => {
                  return (
                    <Flex
                      key={input.title + input.title}
                      content="space-around"
                      width="100%"
                    >
                      <Input
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
                  <Button
                    onClick={clearInputValues}
                    margin="10px"
                    padding="5px"
                  >
                    Clear all
                  </Button>
                </Flex>
              </Filters>
            )}
          </FiltersContainer>
          <EmployeeTabs
            activeTabRender={activeTabRender}
            setActiveTabRender={setActiveTabRender}
          />
        </Flex>
      </div>
    </>
  );
}
