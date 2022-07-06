import { SnackbarContext } from "providers/useSnackbar";
import React, { useContext } from "react";
import { AiFillFile } from "react-icons/ai";
import styled from "styled-components";

export const modules = (props) => ({
  toolbar: {
    container: "#" + props,
  },
});

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

export const QuillToolbar = ({ toolbarId, files, setFiles }) => {
  const snackBar = useContext(SnackbarContext);

  function readFile(e) {
    if (e.target && e.target.files) {
      const reader = new FileReader();
      const file = e.target.files[0];
      if (file) {
        reader.onload = function (e) {
          if (files.find((item) => item.name === file.name)) {
            snackBar.openSnackBar({
              message: "file already uploaded",
              type: "error",
            });
          } else setFiles([...files, { name: file.name, src: e.target.result, type: file.type }]);
        };
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <>
      {toolbarId !== undefined && (
        <div id={toolbarId}>
          <span className='ql-formats'>
            <button className='ql-bold' />
            <button className='ql-italic' />
            <button className='ql-underline' />
            <button className='ql-strike' />
          </span>

          <span className='ql-formats'>
            <button className='ql-list' value='ordered' />
            <button className='ql-list' value='bullet' />
          </span>

          <span className='ql-formats'>
            <select className='ql-color' />
            <select className='ql-background' />
          </span>
          <span className='ql-formats'>
            <StyledLabel htmlFor='file'>
              <AiFillFile size='16px' />
            </StyledLabel>
            <StyledLink type='file' id='file' onChange={readFile} multiple></StyledLink>
            <button className='ql-image' />
          </span>
        </div>
      )}
    </>
  );
};
export default QuillToolbar;

const StyledLink = styled.input`
  display: none;
`;
const StyledLabel = styled.label`
  cursor: pointer;
  position: relative;
  top: 4px;
  left: 3px;
  &:hover {
    color: #06c;
  }
`;
