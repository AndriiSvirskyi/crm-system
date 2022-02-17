import styled from "styled-components";

export const UserStyled = styled.div`

  .container-user-window div {
    max-width: 100%;
    background: #ffffff;
    box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    font-size: 18px;

  }
  .user-information-menu .items{
    display:flex;
    justify-content:space-between;
    padding:2em;
  }
  
  .user-icon {
    background: #d0d0d0;
    border: 0.1875em solid #0f1c3f;
    border-radius: 50%;
    box-shadow: 0.375em 0.375em 0 0 rgba(15, 28, 63, 0.125);
    height: 10em;
    width: 10em;
  }
  .about-user span,h3 {
      display: flex;
      padding: 20px;
  }
  .about-user h3 {
    font-weight: bolder;
  font-size: 30px;
  }
  .contact-user {
    
    diplay:flex;
    flex-direction: column;
  }
  .contact-user p {
    padding:1em;
  }
`