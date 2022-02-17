import Header from "./Header";
import SideBar from "./SideBar";



export default function MainLayout({children}) {
  return (
      <>
      <div className="nav">
     <Header />
      </div>
      <div className="content">
      <main>
          {children}
      </main>
      </div>
      <div className="aside">
      <SideBar  />
      </div>
      </>
  )
}
