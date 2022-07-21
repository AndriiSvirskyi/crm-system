import { Button } from "Components/Button";
import { Input } from "Components/Inputs/Input";
import { Textarea } from "Components/Textarea";
import { phasesPositions } from "constants/positions";
import { stackList } from "constants/projectStack";
import AddUserModal from "containers/projects/addProject/AddUserModal";
import Phase from "containers/projects/addProject/Phase";
import useFetchAndSetProjects from "hooks/useFetchAndSetProjects";
import useFetchAndSetUsers from "hooks/useFetchAndSetUsers";
import { Snackbar } from "Layouts/Snackbar";
import router from "next/router";
import { SnackbarContext } from "providers/useSnackbar";
import React, { useContext, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { projectsState } from "state/atoms";
import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import { Form } from "styled-components/Form";
import { Label } from "styled-components/Label";
import { fetchAndSetData } from "utils/fetchAndSetData";

export default function EditProject() {
  const users = useFetchAndSetUsers();
  const projects = useFetchAndSetProjects();
  const setProjectsToRecoil = useSetRecoilState(projectsState);
  const projectId = router.asPath.split("/")[2];
  const project = projects?.find((item) => item.id === projectId);
  const [name, setName] = useState(project?.name);
  const [img, setImg] = useState(project?.description?.img);
  const inputFile = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState(project?.description?.description);
  const [teamMember, setTeamMember] = useState("");
  const [position, setPosition] = useState("");
  const [checked, setChecked] = useState(project?.description?.status === "in progress" ? false : true);
  const [status, setStatus] = useState(project?.description?.status);
  const [end, setEnd] = useState(project?.description?.deadline?.end);
  const [teamPresale, setTeamPresale] = useState(
    Object.keys(project?.description?.stages?.presale?.team).map((key) => {
      const user = users.find((user) => user.id === key);
      return { [`${user.name} ${user.surname}`]: project?.description?.stages?.presale?.team[key] };
    }),
  );
  const [teamDescovery, setTeamDescovery] = useState(
    Object.keys(project?.description?.stages?.discovery?.team).map((key) => {
      const user = users.find((user) => user.id === key);
      return { [`${user.name} ${user.surname}`]: project?.description?.stages?.discovery?.team[key] };
    }),
  );
  const [teamDelivery, setTeamDelivery] = useState(
    Object.keys(project?.description?.stages?.delivery?.team).map((key) => {
      const user = users.find((user) => user.id === key);
      return { [`${user.name} ${user.surname}`]: project?.description?.stages?.delivery?.team[key] };
    }),
  );
  const [deadline, setDeadline] = useState(project?.description?.deadline?.deadline);
  const [start, setStart] = useState(project?.description?.deadline?.start);
  const [stackItem, setStackItem] = useState("");
  const [stack, setStack] = useState(project?.description?.stack);
  const [isPresaleVisible, setIsPresaleVisible] = useState(false);
  const [isDescoveryVisible, setIsDescoveryVisible] = useState(false);
  const [isDeliveryVisible, setIsDeliveryVisible] = useState(false);
  const [presaleStart, setPresaleStart] = useState(project?.description?.stages?.presale?.start);
  const [presaleEnd, setPresaleEnd] = useState(project?.description?.stages?.presale?.end);
  const [descoveryStart, setDescoveryStart] = useState(project?.description?.stages?.discovery?.start);
  const [descoveryEnd, setDescoveryEnd] = useState(project?.description?.stages?.discovery?.end);
  const [deliveryStart, setDeliveryStart] = useState(project?.description?.stages?.delivery?.start);
  const [deliveryEnd, setDeliveryEnd] = useState(project?.description?.stages?.delivery?.end);
  const [addPresaleMemberModalOpen, setAddPresaleMemberModalOpen] = useState(false);
  const [addDescoveryMemberModalOpen, setAddDescoveryMemberModalOpen] = useState(false);
  const [addDeliveryMemberModalOpen, setAddDeliveryMemberModalOpen] = useState(false);
  const {
    snackBar: { message, type, isActive },
  } = useContext(SnackbarContext);
  const snackBar = useContext(SnackbarContext);
  const reset = () => {
    setName("");
    setDescription("");
  };

  const handleAddProject = async () => {
    await fetch(`http://localhost:4200/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        description: {
          status: status,
          description: description,
          img: img,
          stages: {
            presale: {
              start: presaleStart,
              end: presaleEnd,
              team:
                teamPresale &&
                Object.fromEntries(
                  teamPresale.map((item) => [
                    users.find((user) => `${user.name} ${user.surname}` == Object.keys(item)[0])?.id,
                    Object.values(item)[0],
                  ]),
                ),
            },
            discovery: {
              start: descoveryStart,
              end: descoveryEnd,
              team:
                teamDescovery &&
                Object.fromEntries(
                  teamDescovery.map((item) => [
                    users.find((user) => `${user.name} ${user.surname}` == Object.keys(item)[0])?.id,
                    Object.values(item)[0],
                  ]),
                ),
            },
            delivery: {
              start: deliveryStart,
              end: deliveryEnd,
              team:
                teamDelivery &&
                Object.fromEntries(
                  teamDelivery.map((item) => [
                    users.find((user) => `${user.name} ${user.surname}` == Object.keys(item)[0])?.id,
                    Object.values(item)[0],
                  ]),
                ),
            },
          },
          stack: stack,
          deadline: { deadline: deadline, start: start, end: end },
        },
      }),
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && new Date(start) && new Date(deadline)) {
      try {
        await handleAddProject();
        await fetchAndSetData("http://localhost:4200/projects", setProjectsToRecoil);
        snackBar.openSnackBar({
          message: "Project edited",
          type: "success",
        });
        router.push(`/projects/${projectId}`);
      } catch (e) {
        snackBar.openSnackBar({
          message: "Failed to edit Project",
          type: "error",
        });
      }
      reset();
    } else
      snackBar.openSnackBar({
        message: "Invalid data",
        type: "error",
      });
  };
  function readFile(e) {
    if (e.target && e.target.files[0]) {
      const reader = new FileReader();
      const file = e.target.files[0];
      if (file) {
        reader.onload = function (e) {
          setImg(e.target.result);
        };
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  return (
    <StyledContainer>
      <Form submit={onSubmit} content={"Edit Project"}>
        <Flex margin='0 0 10px 0' direction='column' width='100%'>
          <Label htmlFor='projectName' required={true}>
            Name
          </Label>
          <Input
            id='projectName'
            value={name}
            onChange={(e) => setName(e.target.value)}
            width='100%'
            height='40px'
            outline='1px solid #d0d0d0'
            background='none'
            required
          />
          <Label htmlFor='img' required={false}>
            Image
          </Label>
          <input type='file' ref={inputFile} onChange={readFile} accept='image/png, image/gif, image/jpeg' />
          {img && (
            <StyledImage>
              <img src={img} width='200px' />
              <StyledDelete
                onClick={() => {
                  setImg("");
                  if (inputFile.current) {
                    inputFile.current.value = "";
                  }
                }}
              >
                x
              </StyledDelete>
            </StyledImage>
          )}
          <Label htmlFor='description' required={false}>
            Description
          </Label>
          <Textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
          <Label htmlFor='stack' required={false}>
            Tech Stack
          </Label>
          <Flex width='100%' align='center'>
            <Input
              list='stack'
              value={stackItem}
              onChange={(e) => setStackItem(e.target.value)}
              width='100%'
              height='40px'
              outline='1px solid #d0d0d0'
              background='none'
              margin='0 30px 0 0'
            />
            <datalist id='stack' role='datalist'>
              {stackList.map((item) => !stack.find((it) => it === item) && <option key={item}>{item}</option>)}
            </datalist>
            <StyledAddBtn
              onClick={() => {
                setStack([...stack, stackItem]);
                setStackItem("");
              }}
            >
              +
            </StyledAddBtn>
          </Flex>{" "}
          <StyledMembers>
            {stack.map((item) => (
              <StyledMember key={item}>
                {item}
                <StyledCross onClick={() => setStack(stack.filter((it) => it !== item))}>x</StyledCross>
              </StyledMember>
            ))}
          </StyledMembers>
          <Flex margin='0 0 10px 0' width='100%'>
            <Flex margin='0 70px 10px 0' direction='column'>
              <Label htmlFor='start' required={true}>
                Start
              </Label>
              <Input
                type='date'
                id='start'
                value={start}
                onChange={(e) => setStart(e.target.value)}
                width='100%'
                height='40px'
                outline='1px solid #d0d0d0'
                background='none'
                required
              />
            </Flex>
            <Flex margin='0 0px 10px 0' direction='column'>
              <Label htmlFor='deadline' required={true}>
                Deadline
              </Label>
              <Input
                type='date'
                id='deadline'
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                width='100%'
                height='40px'
                outline='1px solid #d0d0d0'
                background='none'
                required
              />
            </Flex>
          </Flex>
          <Flex align='center'>
            <Label htmlFor='status' required={false}>
              Status
            </Label>
            <input
              type='checkbox'
              id='status'
              name='status'
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                setStatus(!checked ? "finished" : "in progress");
              }}
            />
            <label htmlFor='status'>{status}</label>
          </Flex>
          {checked && (
            <Flex margin='0 0px 10px 0' direction='column'>
              <Label htmlFor='end' required={true}>
                Ended
              </Label>
              <Input
                type='date'
                id='end'
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                width='100%'
                height='40px'
                outline='1px solid #d0d0d0'
                background='none'
                required
              />
            </Flex>
          )}
          <h3>Phases</h3>
          <Phase
            title='Presale'
            setVisible={setIsPresaleVisible}
            isVisible={isPresaleVisible}
            setModalOpen={setAddPresaleMemberModalOpen}
            team={teamPresale}
            setTeam={setTeamPresale}
            start={presaleStart}
            end={presaleEnd}
            setStart={setPresaleStart}
            setEnd={setPresaleEnd}
          />
          <Phase
            title='Discovery'
            setVisible={setIsDescoveryVisible}
            isVisible={isDescoveryVisible}
            setModalOpen={setAddDescoveryMemberModalOpen}
            team={teamDescovery}
            setTeam={setTeamDescovery}
            start={descoveryStart}
            end={descoveryEnd}
            setStart={setDescoveryStart}
            setEnd={setDescoveryEnd}
          />
          <Phase
            title='Delivery'
            setVisible={setIsDeliveryVisible}
            isVisible={isDeliveryVisible}
            setModalOpen={setAddDeliveryMemberModalOpen}
            team={teamDelivery}
            setTeam={setTeamDelivery}
            start={deliveryStart}
            end={deliveryEnd}
            setStart={setDeliveryStart}
            setEnd={setDeliveryEnd}
          />
        </Flex>
        <Flex direction='column' width='100%'>
          <Button
            height='35px'
            width='fit-content'
            padding='10px'
            color='#FFFFFF'
            background='#ff9f69'
            hoverBack='#ff9f69CC'
            margin='10px 0 0 '
          >
            <b>Save</b>
          </Button>
        </Flex>
      </Form>
      {addPresaleMemberModalOpen && (
        <AddUserModal
          title='Add Team Member'
          setOpen={setAddPresaleMemberModalOpen}
          setName={setTeamMember}
          name={teamMember}
          position={position}
          setPosition={setPosition}
          positions={phasesPositions}
          team={teamPresale}
          setTeam={setTeamPresale}
        />
      )}
      {addDescoveryMemberModalOpen && (
        <AddUserModal
          title='Add Team Member'
          setOpen={setAddDescoveryMemberModalOpen}
          setName={setTeamMember}
          name={teamMember}
          position={position}
          setPosition={setPosition}
          positions={phasesPositions}
          team={teamDescovery}
          setTeam={setTeamDescovery}
        />
      )}
      {addDeliveryMemberModalOpen && (
        <AddUserModal
          title='Add Team Member'
          setOpen={setAddDeliveryMemberModalOpen}
          setName={setTeamMember}
          name={teamMember}
          position={position}
          setPosition={setPosition}
          positions={phasesPositions}
          team={teamDelivery}
          setTeam={setTeamDelivery}
        />
      )}
      {isActive && <Snackbar message={message} type={type} />}
    </StyledContainer>
  );
}
const StyledMembers = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
`;
const StyledMember = styled.div`
  border: 1px solid grey;
  padding: 5px 10px;
  margin: 5px 10px 5px 0;
  display: flex;
`;
const StyledCross = styled.div`
  padding-left: 10px;
  cursor: pointer;
`;
const StyledAddBtn = styled.div`
  cursor: pointer;
  padding: 10px;
  background: #a1a1a1;
  color: #ffffff;
  width: fit-content;
  margin: 10px 0;
`;
const StyledContainer = styled.div`
  margin: 50px auto 100px;
  display: flex;
  justify-content: center;
`;
const StyledImage = styled.div`
  position: relative;
  width: 200px;
  margin-top: 10px;
`;
const StyledDelete = styled.div`
  background: #9f9f9f;
  opacity: 0.5;
  padding: 2px 5px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  &:hover {
    opacity: 1;
  }
`;
