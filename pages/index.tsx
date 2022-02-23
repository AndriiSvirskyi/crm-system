import { UserWindow } from "components/User/UserForm";
import { useRouter } from "next/router";
import MainLayout from "../Layouts/MainLayout";

export default function Home() {
  const router = useRouter();
  return (
    <MainLayout>
      <UserWindow>
        <div>User information</div>
          <div>
            <div>1/4</div>
            <div>2/4</div>
            <div>3/4</div>
            <div>4/4</div>
          </div>
          <h1>Main</h1>
      </UserWindow>
    </MainLayout>
  );
}