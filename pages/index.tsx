import { useRouter } from "next/router";
import MainLayout from "../layouts/MainLayout";

export default function Home() {
  const router = useRouter();
  return (
    <MainLayout>
      <>
        <div className="main-grid">
          <div className="User-menu">User information</div>
          <div className="User-content">
            <div>1/4</div>
            <div>2/4</div>
            <div>3/4</div>
            <div>4/4</div>
          </div>
        </div>
        <h1>Main</h1>
      </>
    </MainLayout>
  );
}
