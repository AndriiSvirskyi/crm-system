import styled from "styled-components";
import { hamburgerState } from "state/atoms";
import { useRecoilValue } from "recoil";

type PropsUser = {
  padding: string;
  size: string;
  color: string;
  margin: string;
  width: string;
  textAlign?: string;
  background?:string;
  radius?:string;

};
type UserWindowProps = {
  collapsed: boolean;
};
export const UserWindowContainer = styled.div<UserWindowProps>`
  margin: 70px 0 0 ${(props) => (props.collapsed ? "60px" : "280px")};
`;
export const MainUserInformationMenu = styled.div`
  width: 100%;
`;

const Title = styled.h3<PropsUser>`
  padding: ${(props) => props.padding || "10px"};
  font-size: ${(props) => props.size || "20px"};
  color: ${(props) => props.color || props.theme.colors.text};
  margin: ${(props) => props.margin || ""};
  text-align: ${(props) => props.textAlign || ""};
`;
const TextInformation = styled.p<PropsUser>`
  padding: ${(props) => props.padding || ""};
  font-size: ${(props) => props.size || "18px"};
  color: ${(props) => props.color || props.theme.colors.text};
  margin: ${(props) => props.margin || ""};
  background: ${(props)=> props.background || ""};
  border-radius: ${props => props.radius || ''};
`;

const UserItemMenu = styled.div<PropsUser>`
  cursor: pointer;
  background: #ffffff;
  width: ${(props) => props.width || "100%"};
  box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin: ${(props) => props.margin || "10px"};
  box-sizing: border-box;
  padding: ${(props) => props.padding || "10px"};
`;
export const UserTitle = (props) => {
  return <Title {...props}>{props.children}</Title>;
};

export const UserText = (props) => {
  return <TextInformation {...props}>{props.children}</TextInformation>;
};

export const UserBlockItem = (props) => {
  return <UserItemMenu {...props}>{props.children}</UserItemMenu>;
};

export const UserWindow = (props) => {
  const hamburger = useRecoilValue(hamburgerState);
  return (
    <UserWindowContainer collapsed={hamburger}>
      {props.children}
    </UserWindowContainer>
  );
};
