import { useEffect, useState } from "react";
import { UserTitle, UserWindow } from "styled-components/UserForm";
import MainLayout from "layouts/MainLayout";

export default function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.user) {
      setUser(JSON.parse(localStorage.user));
    }
  }, []);
  return (
    <MainLayout>
      <UserWindow collapsed>
        <UserTitle size="50px" color="green">
          {user?.name}
        </UserTitle>
      </UserWindow>
    </MainLayout>
  );
}
