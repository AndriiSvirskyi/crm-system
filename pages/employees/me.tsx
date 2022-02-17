import React from "react";
import { MeStyles } from "components/Styled/meStyles";

import MainLayout from "../../Layouts/MainLayout";

export default function me() {
  return (
    <>
      <MainLayout>
        <MeStyles>
          <div className="container-user-window">
            <div className="logo">
              <div className="items">Logo</div>
              <div className="items">Company</div>
              <div className="items">Est 2020</div>
            </div>
            <div className="user-information-menu">Header</div>
            <div className="about-user">nav</div>
            <div className="tabs"></div>
            <div className="footer">footer</div>
          </div>
        </MeStyles>
      </MainLayout>
    </>
  );
}
