import { Button } from "Components/Button";
import { Input } from "Components/Inputs/Input";
import { Textarea } from "Components/Textarea";
import { phasesPositions, projectPositions } from "constants/positions";
import { stackList } from "constants/projectStack";
import AddUserModal from "containers/projects/addProject/AddUserModal";
import Phase from "containers/projects/addProject/Phase";
import useFetchAndSetUsers from "hooks/useFetchAndSetUsers";
import { Snackbar } from "Layouts/Snackbar";
import router from "next/router";
import { SnackbarContext } from "providers/useSnackbar";
import React, { useContext, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";
import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import { Form } from "styled-components/Form";
import { Label } from "styled-components/Label";
import { fetchAndSetData } from "utils/fetchAndSetData";

export default function AddProject() {
  const users = useFetchAndSetUsers();
  const setUsersToRecoil = useSetRecoilState(usersState);
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const inputFile = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");
  const [teamLead, setTeamLead] = useState("");
  const [teamMember, setTeamMember] = useState("");
  const [position, setPosition] = useState("");
  const [team, setTeam] = useState([]);
  const [teamPresale, setTeamPresale] = useState([]);
  const [teamDescovery, setTeamDescovery] = useState([]);
  const [teamDelivery, setTeamDelivery] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [start, setStart] = useState("");
  const [stackItem, setStackItem] = useState("");
  const [stack, setStack] = useState([]);
  const [isPresaleVisible, setIsPresaleVisible] = useState(false);
  const [isDescoveryVisible, setIsDescoveryVisible] = useState(false);
  const [isDeliveryVisible, setIsDeliveryVisible] = useState(false);
  const [presaleStart, setPresaleStart] = useState("");
  const [presaleEnd, setPresaleEnd] = useState("");
  const [descoveryStart, setDescoveryStart] = useState("");
  const [descoveryEnd, setDescoveryEnd] = useState("");
  const [deliveryStart, setDeliveryStart] = useState("");
  const [deliveryEnd, setDeliveryEnd] = useState("");
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [addPresaleMemberModalOpen, setAddPresaleMemberModalOpen] = useState(false);
  const [addDescoveryMemberModalOpen, setAddDescoveryMemberModalOpen] = useState(false);
  const [addDeliveryMemberModalOpen, setAddDeliveryMemberModalOpen] = useState(false);
  const {
    snackBar: { message, type, isActive },
  } = useContext(SnackbarContext);
  const snackBar = useContext(SnackbarContext);
  const projectId = Date.now().toString(36) + Math.random().toString(36).substring(2);
  const reset = () => {
    setName("");
    setDescription("");
    setTeamLead("");
  };

  const handleAddProject = async () => {
    await fetch(`http://localhost:4200/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: projectId,
        name: name,
        description: {
          status: "in progress",
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
          deadline: { deadline: deadline, start: start, end: "" },
        },
      }),
    });
  };
  const handleAddLead = async () => {
    const user = users.find((user) => `${user.name} ${user.surname}` === teamLead);
    user &&
      (await fetch(`http://localhost:4200/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projects: [
            ...user.projects,
            {
              id: projectId,
              name: name,
              role: "Team Lead",
            },
          ],
        }),
      }));
  };
  const handleAddTeam = async () => {
    team.map(async (item) => {
      const user = users.find((user) => `${user.name} ${user.surname}` === Object.keys(item)[0]);
      user &&
        (await fetch(`http://localhost:4200/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projects: [
              ...user.projects,
              {
                id: projectId,
                name: name,
                role: Object.values(item)[0],
              },
            ],
          }),
        }));
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && new Date(start) && new Date(deadline)) {
      try {
        await handleAddLead();
        await handleAddTeam();
        await handleAddProject();
        await fetchAndSetData("http://localhost:4200/users", setUsersToRecoil);
        snackBar.openSnackBar({
          message: "Project added",
          type: "success",
        });

        router.push(`/projects`);
      } catch (e) {
        snackBar.openSnackBar({
          message: "Failed to add Project",
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
      <Form submit={onSubmit} content={"New Project"}>
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
          <Label htmlFor='name' required={false}>
            Team Lead
          </Label>
          <Input
            list='people'
            value={teamLead}
            onChange={(e) => setTeamLead(e.target.value)}
            width='100%'
            height='40px'
            outline='1px solid #d0d0d0'
            background='none'
            margin='0 0 10px 0'
          />
          <datalist id='people' role='datalist'>
            {users?.map((user) => (
              <option key={user.id}>
                {user.name} {user.surname}
              </option>
            ))}
          </datalist>
          <Label htmlFor='#' required={false}>
            Team
          </Label>
          <StyledAddBtn onClick={() => setAddMemberModalOpen(true)}>+ Add Team Member</StyledAddBtn>
          <StyledMembers>
            {team.map((item) => (
              <StyledMember key={Object.keys(item)[0]}>
                {`${Object.keys(item)[0]}, ${Object.values(item)[0]}`}
                <StyledCross
                  onClick={() => setTeam(team.filter((user) => Object.keys(user)[0] !== Object.keys(item)[0]))}
                >
                  x
                </StyledCross>
              </StyledMember>
            ))}
          </StyledMembers>
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
      {addMemberModalOpen && (
        <AddUserModal
          title='Add Team Member'
          setOpen={setAddMemberModalOpen}
          setName={setTeamMember}
          name={teamMember}
          position={position}
          setPosition={setPosition}
          positions={projectPositions}
          team={team}
          setTeam={setTeam}
        />
      )}
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
