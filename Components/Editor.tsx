import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

export const Editor = ({ setDescription, description, id, files, setFiles }) => {
  return (
    <StyledContainer>
      <EditorToolbar
        toolbarId={id}
        setDescription={setDescription}
        description={description}
        files={files}
        setFiles={setFiles}
      />
      <StyledTextArea
        theme='snow'
        defaultValue={description}
        onChange={(value) => {
          setDescription(value);
        }}
        modules={modules(id)}
        formats={formats}
      ></StyledTextArea>
    </StyledContainer>
  );
};
export default Editor;

const StyledTextArea = styled(ReactQuill)`
  width: 100%;
  height: 150px;
  p {
    font-size: 16px;
  }
  div {
    padding: 8px 15px !important;
  }
  img {
    width: 100px;
  }
`;
const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  div {
    &:nth-child(1) {
      padding-left: 20px;
      border-radius: 8px 8px 0 0;
      text-align: left;
    }
    &:nth-last-child(1) {
      border-top: none;
      border-radius: 0 0 8px 8px;
    }
  }
`;
