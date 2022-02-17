import React from "react";
import { ButtonStyled } from "components/Styled/ButtonStyled";
import { MeStyles } from "components/Styled/meStyles";
import { UserStyled } from "components/Styled/UserStyled";
import Tabs from "components/Tabs/Tabs";
import MainLayout from "Layouts/MainLayout";

export default function User({ user }) {
  return (
    <MainLayout>
      <UserStyled>
        <ButtonStyled>
          <MeStyles>
            <div className="container-user-window">
              <div className="user-information-menu">
                <div className="items">
                  <p className="user-icon"></p>
                  <h1>{user.name}</h1>
                  <button>Edit Profile</button>
                </div>
                <div className="items">
                  <p>Work position:{user.company.bs}</p>
                  <p>Location{user.address.city}</p>
                  <p>Email{user.email}</p>
                  <p>Phone{user.phone}</p>
                </div>
              </div>
              <div className="about-user">
                <h3>Info about User</h3>
                <span>Username:{user.username}</span>
                <span>Address: {user.address.street}</span>
                <span>
                  {user.address.suite}
                  {user.address.city}
                </span>
              </div>
              <div className="tabs">
                <Tabs />
              </div>

              <div>SomeWindow</div>
              <div className="contact-user">
                <h3>Contact</h3>
                <p>Phone:{user.phone}</p>
                <p>Adress:</p>
                <p>street:{user.address.street}</p>
                <p>suite:{user.address.suite}</p>
                <p>city{user.address.city}</p>
              </div>

              <div>SomeWindow</div>
            </div>
          </MeStyles>
        </ButtonStyled>
      </UserStyled>
    </MainLayout>
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
