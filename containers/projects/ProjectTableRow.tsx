import router from "next/router";
import React from "react";
import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import { ImageContainer } from "styled-components/ImageContainer";
import { BiEditAlt } from "react-icons/bi";

export default function ProjectTableRow({
  id,
  image,
  name,
  surname,
  role,
  department,
  division,
  address,
  onDelete,
  setIsModalOpen,
  setUserToEditId = (id) => {},
}) {
  return (
    <tr>
      <TD>
        <Flex align='center'>
          <ImageContainer image={image} width='35px' height='35px' margin='0 10px 0 0' />
          <Anchor onClick={() => router.push(`/employees/${id}`)}>
            <a>{`${name} ${surname}`}</a>
          </Anchor>
        </Flex>
      </TD>
      <TD>{role}</TD>
      <TD>{department}</TD>
      <TD>{division}</TD>
      <TD>{address}</TD>
      {role !== "Team Lead" && (
        <TD
          onClick={(e) => {
            e.preventDefault();
            setUserToEditId(id);
            setIsModalOpen(true);
          }}
        >
          <BiEditAlt />
        </TD>
      )}
      <TD
        onClick={(e) => {
          e.preventDefault();
          onDelete(id);
        }}
      >
        x
      </TD>
    </tr>
  );
}

const TD = styled.td`
  padding: 0.75rem 1.25rem;
  border-top: 1px solid #ddd;
`;
const Anchor = styled.span`
  cursor: pointer;
  a {
    color: rgb(25, 118, 186);
    text-decoration: none;
  }
`;
