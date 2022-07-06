import router from "next/router";
import React from "react";
import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import { ImageContainer } from "styled-components/ImageContainer";

export default function ProjectTableRow({ id, image, name, surname, role, department, division, address }) {
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
