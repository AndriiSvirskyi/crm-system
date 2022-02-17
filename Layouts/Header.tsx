import Link from "next/link";
import { useState } from "react";
import { ButtonStyled } from "components/Styled/ButtonStyled";
import Modal from "./Modal";

import styled from "styled-components";

export const HeaderStyles = styled.div`
  nav {
    position: fixed;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    height: 100px;
    left: 280px;
    top: 0;
    right: 0;
    background: #ffffff;
    box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  nav input {
    width: 405px;
    height: 50px;
    left: 1149px;
    top: 17px;

    background: #eeeeee;
    border-radius: 8px;
  }

  .right-nav {
    margin: 1em;
  }
`;

export default function Header() {
  const [searchUser, setSearchUser] = useState("");
  const [bellModalVisible, setBellModalVisible] = useState("hidden");
  const [plusModalVisible, setPlusModalVisible] = useState("hidden");
  const openModal = () => {
    setBellModalVisible("visible");
  };
  const closeModal = (event) => {
    console.log(event);
    setBellModalVisible("hidden");
  };
  return (
    <>
      <HeaderStyles>
        <ButtonStyled>
          <nav>
            <Link href={"/employees/me"}>
              <button className="btn-logo">Logo</button>
            </Link>
            <div className="right-nav">
              <button>Plus</button>

              <input
                type={"text"}
                placeholder={"Search"}
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              ></input>
              <button onClick={openModal}>Bells</button>
              <Modal visibility={bellModalVisible}>
                <button onClick={(e) => closeModal(e)}> Close</button>
                <p>Нових сповіщень немає!</p>
              </Modal>
              <Link href={"/employees/me"}>
                <button>Icon Profille</button>
              </Link>
            </div>
          </nav>
        </ButtonStyled>
      </HeaderStyles>
    </>
  );
}
