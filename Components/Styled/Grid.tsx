import styled from "styled-components";
/**
 * Adjusts a grid auto row value.
 * @param value - Grid auto row value
 */
const gridAutoRows = ({ minRowHeight = "20px" }) =>
  `minmax(${minRowHeight}, auto)`;
/**
 * Adjusts a grid template row value.
 * @param value - Grid template row value
 */
const frGetter = (value: number | string) =>
  typeof value === "number" ? `repeat(${value}, 1fr)` : value;
const gridGap = ({ gap = "8px" }) => gap;
const gridAutoFlow = ({ flow = "row" }) => flow;
/**
 * Formats grid template areas.
 * @param areas - An array of areas
 */
const formatAreas = (areas: string[]) =>
  areas.map((area) => `"${area}"`).join(" ");
export type GridProps = {
  className?: string;
  columns?: string | number;
  gap?: string;
  columnGap?: string;
  rowGap?: string;
  height?: string;
  minRowHeight?: string;
  flow?: string;
  rows?: string | number;
  areas?: string[];
  justifyContent?: string;
  alignContent?: string;
};

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-auto-flow: ${gridAutoFlow};
  grid-auto-rows: ${gridAutoRows};
  ${({ rows }) => rows && `grid-template-rows: ${frGetter(rows)}`};
  grid-template-columns: ${({ columns = 12 }) => frGetter(columns)};
  grid-gap: ${gridGap};
  ${({ columnGap }) => columnGap && `column-gap: ${columnGap}`};
  ${({ rowGap }) => rowGap && `row-gap: ${rowGap}`};
  ${({ areas }) => areas && `grid-template-areas: ${formatAreas(areas)}`};
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent}`};
  ${({ alignContent }) => alignContent && `align-content: ${alignContent}`};
  height: ${({ height = "auto" }) => height};
`;
