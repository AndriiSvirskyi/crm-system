
import { UserTitle } from "components/User/UserForm";
import MainLayout from "../../layouts/MainLayout";

export default function me() {
  return (
      <MainLayout>
          <UserTitle margin='100px 0 0 0' size='50px' color='green'> Hello Its ME...</UserTitle>
      </MainLayout>
  );
}
