import styled from "styled-components";

type ImageContainerProps = {
  width?: string;
  height?: string;
  margin?: string;
  image: string
};
const ImageContainerStyle = styled.div<ImageContainerProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 50%;
  background: ${({ image }) => `url(${image})`} no-repeat;;
  background-size: contain;
  background-position: center;
  margin: ${({ margin }) => margin};;
`;

export const ImageContainer = ({image, width, height, margin }) => {
  return (
    <ImageContainerStyle image={image} width={width} height={height} margin ={margin}/>
  );
};
