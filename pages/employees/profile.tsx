import { useEffect, useState } from "react";
import { UserTitle } from "components/User/UserForm";
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
      <UserTitle margin="100px 0 0 0" size="50px" color="green">
        {user?.name}
      </UserTitle>
    </MainLayout>
  );
}
