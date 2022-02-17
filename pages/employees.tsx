import Link from "next/link";
import MainLayout from "../Layouts/MainLayout";

export default function users({ users }) {
  return (
    <MainLayout>
      <div>
        <h1>Список співробітників</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id + user.name}>
              <Link href={`/employees/${user.id}`}>
                <a>{user.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
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
