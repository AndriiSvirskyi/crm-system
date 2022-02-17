import Link from "next/link";

import styled from "styled-components";

export const SideBarStyles = styled.div`
.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    background-color: #f1f1f1;
  
    width: 280px;
    height: 100%;
    overflow: auto;
  }
  .sidebar a {
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    text-decoration: none;
    color: #000000;
    font-size: 20px;
  }
  .sidebar p{
  font-weight: 300;
  }
  .additional-sidebar-menu,
  .main-sidebar-menu {
    margin-top: 40px;
  }
  @media(max-width: 768px){
    .sidebar {
      display:none;
    }
  
  `

export default function SideBar() {
    return (
        <>
        <SideBarStyles>
      <aside className="sidebar">
        <button> Burger</button>
        <div className='main-sidebar-menu'>
          <Link href={'/employees/me'}><a> Me </a></Link>
          <Link href={'/'}><a> Main page </a></Link>
          <Link href={'/tasks'}><a> Tasks </a></Link>
          <Link href={'/time-tracker'}><a> Time tracker </a></Link>
          </div>
        <div className='additional-sidebar-menu'>
          <h4> Company </h4>
          <Link href={'/calendar'}><a> Calendar </a></Link>
          <Link href={'/projects'}><a> Projects </a></Link>
          <Link href={'/employees'}><a> Employees </a></Link>
          <Link href={'/knowledge'}><a> Knowledge base </a></Link>
          <Link href={'/reports'}><a> Reports </a></Link>
          </div>
      </aside>
          </SideBarStyles>
      </>
    );
  }