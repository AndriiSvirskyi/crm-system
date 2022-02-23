import React from "react";
import MainLayout from "Layouts/MainLayout";
import UserProfile from "components/User/UserProfile";

export default function User({ user }) {
  return (
    <MainLayout>
      <UserProfile user={user}></UserProfile>
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  
  const responce = await fetch(
    `http://localhost:4200/users/${query.id}`
    );
  const user = await responce.json();

  return {
    props: { user },
  };
}