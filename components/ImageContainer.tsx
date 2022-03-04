import styled from "styled-components";

type ImageContainerProps = {
  width?: string;
  height?: string;
  margin?: string;
};
const ImageContainerStyle = styled.div<ImageContainerProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 50%;
  background: #d0d0d0;
  margin: ${({ margin }) => margin};;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
  }
`;

export const ImageContainer = ({ width, height, margin, children }) => {
  return (
    <ImageContainerStyle width={width} height={height} margin={margin}>
      {children}
    </ImageContainerStyle>
  );
};
