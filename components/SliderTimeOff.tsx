import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaBriefcaseMedical, FaPlane, FaStarOfLife } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { Flex } from "./User/Flex";

const ArrowContainer = styled.div`
  user-select: none;
  cursor: ${(props: { cursor: string }) => props.cursor};
`;

const Slider = () => {
  const sliderData = [
    {
      type: (
        <Flex direction="column" align="center" width="300px">
          <div>
            <FaPlane size="30" fill="#23DED0" />
          </div>
          <b>Vacation</b>
          <div>20.0</div>
          <div>AVAILABLE DAYS</div>
        </Flex>
      ),
    },
    {
      type: (
        <Flex direction="column" align="center" width="300px">
          <div>
            <FaStarOfLife size="30" fill="#0036b6" />
          </div>
          <b>Unpaid leave</b>
          <div>17.97</div>
          <div>AVAILABLE DAYS</div>
        </Flex>
      ),
    },
    {
      type: (
        <Flex direction="column" align="center" width="300px">
          <div>
            <FaBriefcaseMedical size="30" fill="#ff6666" />
          </div>
          <b>Sick leave</b>
          <div>8.0</div>
          <div>AVAILABLE DAYS</div>
        </Flex>
      ),
    },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrent(current === sliderData.length - 1 ? 0 : current + 1);
    }, 3000);
    return () => clearTimeout(timeout);
  });

  const prevSlide = () => {
    if (current === 1 || current === 2) setCurrent((prev) => prev - 1);
  };
  const nextSlide = () => {
    if (current === 0 || current === 1) setCurrent((prev) => prev + 1);
  };

  return (
    <Flex direction="column">
      <Flex align="center" margin="30px 0 30px 0">
        <ArrowContainer cursor={current === 0 ? "" : "pointer"}>
          <BiChevronLeft
            size="50"
            fill={current === 0 ? "#f3d1be" : "#ff9f69"}
            onClick={prevSlide}
          />
        </ArrowContainer>
        {sliderData.map(({ type }, index) => {
          return <div key={index}>{index === current && type}</div>;
        })}
        <ArrowContainer cursor={current === 2 ? "" : "pointer"}>
          <BiChevronRight
            size="50"
            fill={current === 2 ? "#f3d1be" : "#ff9f69"}
            onClick={nextSlide}
          />
        </ArrowContainer>
      </Flex>
      <Flex justify="center" margin="0 0 30px 0">
        <GoPrimitiveDot fill={current === 0 ? "#252980" : "#d3d3d3"} />
        <GoPrimitiveDot fill={current === 1 ? "#252980" : "#d3d3d3"} />
        <GoPrimitiveDot fill={current === 2 ? "#252980" : "#d3d3d3"} />
      </Flex>
    </Flex>
  );
};

export default Slider;
