import moment from "moment";
import React from "react";
import { useRecoilValue } from "recoil";
import { projectState } from "state/atoms";
import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import RatingBar from "./RatingBar";

export default function Health() {
  const project = useRecoilValue(projectState);
  console.log(project);
  return (
    <>
      <Flex margin='0' justify='space-between' width='100%'>
        <div>
          <StyledH2>RATING</StyledH2>
          <RatingBar />
        </div>
        <StyledImage>
          <img src='https://www.wordstream.com/wp-content/uploads/2021/05/best-words-and-phrases-for-marketing-intro.png' />
        </StyledImage>
      </Flex>
      <StyledH2>FEEDBACKS</StyledH2>
      {project?.feedbacks?.map((item, i) => (
        <StyledFeedback key={i}>
          <StyledText>{item.text}</StyledText>
          <StyledDate>{moment(item.time).format("LL")}</StyledDate>
        </StyledFeedback>
      ))}
    </>
  );
}

const StyledFeedback = styled.div`
  width: 668px;
  box-shadow: 2px 5px 13px rgba(135, 135, 135, 0.25), -1px -3px 20px rgba(121, 121, 121, 0.25);
  border-radius: 10px;
  margin: 10px 0;
  padding: 15px 35px;
  display: flex;
  justify-content: space-between;
`;
const StyledDate = styled.div`
  font-family: "KoHo";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
  color: #000000;
`;
const StyledText = styled.div`
  font-family: "Kanit";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  color: #66667d;
  width: 530px;
`;
const StyledImage = styled.div`
  img {
    width: 511px;
  }
`;
const StyledH2 = styled.h2`
  font-family: "Kanit";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: #0038ff;
  margin-top: 40px;
`;
