import { Button } from "components/Button";
import { Flex } from "styled-components/Flex";
import styled from "styled-components";

const ButtonOfPaginate = styled(Button)`
  cursor: pointer;
  border: none;
  font-size: 15px;
  border-radius: 8px;
  margin: 0 10px;
  padding: 5px 10px;
`;

export default function Pagination({
  employeesPerPage,
  totalEmployees,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex justify="center">
      {pageNumbers.map((number) => (
        <ButtonOfPaginate
          key={number}
          onClick={() => paginate(number)}
          background={number === currentPage ? "grey" : ""}
        >
          {number}
        </ButtonOfPaginate>
      ))}
    </Flex>
  );
}
