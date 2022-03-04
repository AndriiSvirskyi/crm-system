import { Flex } from "components/User/Flex";
import styled from "styled-components";
import router from "next/router";
import { UserText } from "components/User/UserForm";
import { ImageContainer } from "components/ImageContainer";

const UserTitle = styled.div`
  color: rgb(25, 118, 186);
  cursor: pointer;
`;
const GridMarkup = styled.div`
  height: 400px;
  display: grid;
  grid-gap: 10px;
  grid-auto-columns: minmax(250px, 350px);
  grid-auto-rows: 125px;
  grid-template-columns: repeat(4, 1fr);
  margin: 10px;
  @media (max-width: 1100px) and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const GridUserCard = styled.div`
  border: 1px solid grey;
  border-radius: 8px;
  padding: 10px;
`;

export default function GridCardEmployees({ filteredEmployees }) {
  return (
    <GridMarkup>
      {filteredEmployees.map((user) => (
        <GridUserCard key={user.id}>
          <Flex align="center">
            <ImageContainer width="100px" height="100px" margin="0 20px 0 0">
              <img src={user.image} alt="User" />
            </ImageContainer>
            <UserTitle
              onClick={() => {
                router.push(`/employees/${user.id}`);
              }}
            >
              {user.name} {user.surname}
            </UserTitle>
          </Flex>
          <UserText>
            {user.role} in {user.address}
          </UserText>
        </GridUserCard>
      ))}
    </GridMarkup>
  );
}
