import styled from "styled-components";
import { Button } from "components/Button";
const RemoveContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  height: 300px;
  text-align: center;
  font-size: 20px;
  background-color: #e9e9e9;
  border-radius: 8px;
  z-index: 2;
`;
export const RemoveUserModal = ({ yes, no }) => {
  return (
    <RemoveContainer>
      <p>Are you sure you want to remove this user?</p>
      <div>
        <Button padding="5px 0" margin="0 10px 0 0" width="100px" onClick={no}>
          NO
        </Button>
        <Button padding="5px 0" width="100px" onClick={yes}>
          YES
        </Button>
      </div>
    </RemoveContainer>
  );
};
