import styled from 'styled-components';

export type FlexProps = Pick<
  React.CSSProperties,
  | 'alignItems'
  | 'justifyContent'
  | 'flexShrink'
  | 'flexGrow'
  | 'gap'
  | 'display'
  | 'flexDirection'
  | 'width'
  | 'height'
  | 'margin'
  | 'overflow'
  | 'flexWrap'
> & {
  display?: 'flex' | 'inline-flex';
};

export const Flex = styled.div<FlexProps>(
  ({
    alignItems,
    justifyContent,
    flexDirection,
    flexShrink,
    flexGrow,
    gap,
    display = 'flex',
    width,
    flexWrap,
    height,
    overflow,
    margin,
  }) => ({
    display,
    alignItems,
    justifyContent,
    flexDirection,
    flexShrink,
    flexGrow,
    gap,
    width,
    height,
    overflow,
    flexWrap,
    margin,
  })
);