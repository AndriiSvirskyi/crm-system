import { useEffect, useState } from "react";
import { UserTitle, UserWindow } from "components/User/UserForm";
import MainLayout from "Layouts/MainLayout";

export default function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.user) {
      setUser(JSON.parse(localStorage.user));
    }
  }, []);
  return (
    <MainLayout>
      <UserWindow>
        <UserTitle size="50px" color="green">
          {user?.name}
        </UserTitle>
      </UserWindow>
    </MainLayout>
  );
}
