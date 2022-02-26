import React from "react";
import MainLayout from "Layouts/MainLayout";
import UserProfile from "components/User/UserProfile";
import { UserWindow } from "components/User/UserForm";

export default function User({ user }) {
  return (
    <MainLayout>
      <UserWindow>
        <UserProfile user={user}></UserProfile>
      </UserWindow>
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  const responce = await fetch(`http://localhost:4200/users/${query.id}`);
  const user = await responce.json();

  return {
    props: { user },
  };
}
