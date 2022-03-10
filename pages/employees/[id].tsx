import React from "react";
import MainLayout from "layouts/MainLayout";
import UserProfile from "containers/profile";
import { UserWindow } from "styled-components/UserForm";
import { useSnackbar } from "layouts/useSnackbar";

export default function User({ user }) {
  const { isActive, message, type, openSnackBar } = useSnackbar();
  const showSnackbarHandler = () => {
    openSnackBar("Test", 'success');
    
  };
  return (
    <MainLayout isActive={isActive} message={message} type={type}>
      <UserWindow>
        <UserProfile user={user} showSnackbarHandler={showSnackbarHandler} ></UserProfile>
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
