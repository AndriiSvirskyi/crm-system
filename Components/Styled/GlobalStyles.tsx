import styled from "styled-components";

export const GlobalStyles = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    max-width: 1080px;
  }
  @media (min-width: 768px) {
    main {
      margin-top: 100px;
      max-width: 2000px;
      margin-left: 290px;
    }
    .wrapper {
      display: grid;
      grid-template-columns: 200px 1fr;
      grid-template-areas:
        "header header"
        "sidebar main"
        "sidebar footer";
      grid-gap: 1rem;
    }

    header {
      grid-area: header;
    }

    main {
      grid-column: main;
    }

    aside {
      grid-row: sidebar;
    }

    footer {
      grid-column: footer;
    }
  }
`;

const theme = {
  colors: {
    primary: "red",
    seconfary: "red",
  },
  media: {
    phone: "(max-width: 425px)",
    tablet: "(max-width: 768px) and (min-width:425px)",
  },
};
