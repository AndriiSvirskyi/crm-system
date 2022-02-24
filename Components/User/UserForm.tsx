import styled from "styled-components";
type PropsUser = {
  padding: string;
  size: string;
  color: string;
  margin: string;
  width: string;
};
export const UserWindow = styled.div`
`;
export const MainUserInformationMenu = styled.div`
  width: 100%;
`;

const Title = styled.h3<PropsUser>`
  padding: ${(props) => props.padding || "10px"};
  font-size: ${(props) => props.size || "20px"};
  color: ${(props) => props.color || props.theme.colors.text};
  margin: ${(props) => props.margin || ""};
`;
const TextInformation = styled.p<PropsUser>`
  padding: 10px;
  padding: ${(props) => props.padding || ""};
  font-size: ${(props) => props.size || "20px"};
  color: ${(props) => props.color || props.theme.colors.text};
  margin: ${(props) => props.margin || ""};
`;

const UserItemMenu = styled.div<PropsUser>`
  background: #FFFFFF;
  width: ${(props) => props.width || '100%'};
  box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin: ${props=>props.margin || '1em'};
  padding: ${props=>props.padding || '10px'};
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
