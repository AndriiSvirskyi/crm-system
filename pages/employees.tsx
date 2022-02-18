import { UserTitle } from "components/User/UserForm";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";

export default function users({ users }) {
  return (
    <MainLayout>
      
        <UserTitle margin='100px' size='30px'>Список співробітників</UserTitle>
        <ul>
          {users.map((user) => (
            <li key={user.id + user.name}>
              <Link href={`/employees/${user.id}`}>
                <a>{user.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      
    </MainLayout>
  );
}

export async function getStaticProps(context) {
  const responce = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await responce.json();

  return {
    props: { users },
  };
}
