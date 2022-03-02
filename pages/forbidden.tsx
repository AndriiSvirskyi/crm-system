import router from "next/router";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";
import styled from "styled-components";

const ForbiddenContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 1440px;
  height: 100vh;
  background: #b6b6b66f;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    background: #54cbf028;
    padding: 3px 10px;
    border-radius: 4px;
    text-decoration: none;
    color: #4d5be0;
    &:hover {
      color: black;
    }
  }
  p {
    text-align: center;
  }
`;

const Forbidden = () => {
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);

  useEffect(() => {
    if (!users) {
      const response = fetch(`http://localhost:4200/users`);
      response
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setUsersToRecoil(res);
        });
    }
  }, []);

  const admin: { email?: string } = users
    ? Object.values(users).find(
        (user: { role?: string }) => user.role === "admin"
      )
    : [];

  return (
    <ForbiddenContainer>
      <p>
        You are not allowed to create new account.
        <br />
        Please, for any questions contact the administrator:
      </p>
      <div onClick={() => router.push(`mailto:${admin.email}`)} >
        <a>{admin.email}</a>
      </div>
    </ForbiddenContainer>
  );
};

Forbidden.getInitialProps = async () => {
  const response = await fetch(`http://localhost:4200/users`);
  const users = await response.json();
  return {
    users,
  };
};

export default Forbidden;
