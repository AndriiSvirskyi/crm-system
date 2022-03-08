import styled from "styled-components";

type Props = {
  width?: string;
  padding?:string;
  margin?:string;
  textAlign?: string;
}

const Table = styled.table<Props>`
  width: 100%;
  text-align: ${({textAlign})=> textAlign || 'left'};
  padding:0;
  margin:0;
`;
 const Title = styled.th<Props>`
  padding: 10px 0;
  font-size: 15px;

`;
 const Cell = styled.td<Props>`
  padding: 10px 0;
  border-top: 1px solid #ddd;
  font-size: 15px;
  
`;

type TableProps = {
  children: string | JSX.Element;
  width?: string;
}

export const TableCell = ({children, width} : TableProps) =>{
  return(
    <Cell width={width}>{children}</Cell>
  )
}
export const TableTitle = ({children, width} : TableProps) =>{
  return(
    <Title width={width}>{children}</Title>
  )
}
export const TableContainer = ({children}: TableProps) : any => {
  return(
    <Table>{children}</Table>
  )
}