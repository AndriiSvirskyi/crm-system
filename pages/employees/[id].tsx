import React from "react";
import MainLayout from "layouts/MainLayout";
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
    `https://jsonplaceholder.typicode.com/users/${query.id}`
  );
  const user = await responce.json();

  return {
    props: { user },
  };
}

