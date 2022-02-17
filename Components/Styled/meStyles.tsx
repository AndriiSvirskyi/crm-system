import styled from "styled-components";

export const MeStyles = styled.div`
  .container-user-window {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template: 2fr 4fr 1fr / 1fr 3fr;
    gap: 10px;
    grid-template-areas:
      " header header"
      "nav content"
      "footer footer";
  }

  .logo {
    background-color: aliceblue;
    grid-area: logo;
  }

  .user-information-menu {
    grid-area: header;
    width: 1562px;
    left: 318px;

    background: #ffffff;
    box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  .about-user {
    width: 460px;
    height: 647px;
    left: 318px;
    top: 469px;
    background: #ffffff;
    box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    grid-area: nav;
  }

  .tabs {
    grid-area: content;
    width: 1062px;
    height: 203px;
    left: 818px;
    top: 553px;

    background: #ffffff;
    box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  .footer {
    background-color: rgb(71, 78, 78);
    grid-area: footer;
  }
`;
