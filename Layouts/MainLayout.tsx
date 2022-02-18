import Header from "./Header";
import SideBar from "./SideBar";




export default function MainLayout({children}) {
  return (
      <>
     <Header />
     
          {children}
    
      <SideBar />
      </>
  )
}
