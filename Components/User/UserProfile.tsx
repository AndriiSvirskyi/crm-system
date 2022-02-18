
import { Flex } from "components/Styled/Flex";
import Tabs from "components/Tabs/Tabs";
import styled from "styled-components";

export const UserWindow = styled.div`
  margin: 100px 0 0 270px;
  width:1620px;
  
`;
const MainUserInformationMenu = styled.div`
width:100%;

`
const UserInformationMenu = styled.div`
  
`;

const UserItemMenu = styled.div`
background: #FFFFFF;
width:100%;
box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
border-radius: 8px;
margin:1em;
`;


export default function UserProfile({ user }) {
  return (
    <UserWindow>
      <MainUserInformationMenu>
      <Flex wrap='wrap' justify='space-around' width='100%'>
        <h1>{user.name}</h1>
        <button>Edit Profile</button>
        <p>Work position:{user.company.bs}</p>
        <p>Location{user.address.city}</p>
        <p>Email{user.email}</p>
        <p>Phone{user.phone}</p>
      </Flex>
        </MainUserInformationMenu>

      <Flex >
      <UserItemMenu>
        <h3>Info about User</h3>
        <span>Username:{user.username}</span>
        <span>Address: {user.address.street}</span>
        <span>
          {user.address.suite}
          {user.address.city}
        </span>
      </UserItemMenu>
      

      <UserItemMenu>
      <Tabs />
      </UserItemMenu>
      </Flex>
      <UserItemMenu>
        <h3>Contact</h3>
        <p>Phone:{user.phone}</p>
        <p>Adress:</p>
        <p>street:{user.address.street}</p>
        <p>suite:{user.address.suite}</p>
        <p>city{user.address.city}</p>
      </UserItemMenu>
    </UserWindow>
  );
}

export async function getServerSideProps({ query }) {
  const responce = await fetch(
    `https://jsonplaceholder.typicode.com/users/${query.id}`
  );
  const user = await responce.json();

  return {
    props: { user },
  };
}
