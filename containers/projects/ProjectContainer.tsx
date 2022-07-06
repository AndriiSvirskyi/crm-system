import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import router from "next/router";
import { Button } from "Components/Button";
import ProjectTableRow from "./ProjectTableRow";
import { useState } from "react";
import Modal from "Components/Modal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";
import ProjectAddForm from "./ProjectAddForm";

const TableCard = styled.div`
  margin-bottom: 1.25rem;
  position: relative;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  background-color: #f3f6ff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.1875rem;
`;
const Table = styled.table`
  border-collapse: collapse;
`;
const TH = styled.th`
  border-bottom: 1.5px solid rgb(183, 183, 183);
  padding: 0.425rem 1.25rem;
  font-weight: 500;
  text-align: inherit;
`;

const Anchor = styled.span`
  cursor: pointer;
  a {
    color: rgb(25, 118, 186);
    text-decoration: none;
  }
`;

const StyledButton = styled(Button)`
  height: 30px;
  font-size: 16px;
  padding: 0 10px;
`;

const tHead = (
  <thead>
    <tr>
      <TH>Full name</TH>
      <TH>Position</TH>
      <TH>Department</TH>
      <TH>Division</TH>
      <TH>Location</TH>
    </tr>
  </thead>
);

export const ProjectContainer = ({ project }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const users = useRecoilValue(usersState);
  const setUsersToRecoil = useSetRecoilState(usersState);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const getUsers = () => {
    const response = fetch("http://localhost:4200/users");
    response
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUsersToRecoil(res);
      });
  };

  const handleOpenAddModal = (e) => {
    e.preventDefault();
    setIsAddModalOpen(true);
  };
  const handleOpenChangeModal = (e) => {
    e.preventDefault();
    setIsChangeModalOpen(true);
  };
  const handleAddMember = async (e) => {
    e.preventDefault();
    const user = users.find((user) => `${user.name} ${user.surname}` === name);
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projects: user.projects.find((item) => item.id === project.id)
          ? user.projects.map((item) => (item.id === project.id ? { ...item, role: position } : item))
          : [
              ...user.projects,
              {
                id: project.id,
                name: project.name,
                role: position,
              },
            ],
      }),
    });
    getUsers();
    setIsAddModalOpen(false);
    setName("");
    setPosition("");
  };

  const handleChangeLead = async (e) => {
    e.preventDefault();
    const user = users.find((user) => `${user.name} ${user.surname}` === name);
    await fetch(`http://localhost:4200/users/${project.lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projects: project.lead.projects.filter((item) => item.id !== project.id),
      }),
    });
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projects: user.projects.find((item) => item.id === project.id)
          ? user.projects.map((item) => (item.id === project.id ? { ...item, role: "Team Lead" } : item))
          : [
              ...user.projects,
              {
                id: project.id,
                name: project.name,
                role: "Team Lead",
              },
            ],
      }),
    });
    getUsers();
    setIsChangeModalOpen(false);
    setName("");
  };

  return (
    <Flex direction='column' padding='10px'>
      <span>
        <Anchor onClick={() => router.push("/projects")}>
          <a>Teams </a>
        </Anchor>
        / {project.name}
      </span>
      <h1>{project.name}</h1>
      <div>
        <Flex justify='space-between' align='center'>
          <h2>Team Lead</h2>
          <StyledButton onClick={handleOpenChangeModal}>Change</StyledButton>
        </Flex>
        {isChangeModalOpen && (
          <Modal close={() => setIsChangeModalOpen(false)}>
            <ProjectAddForm
              onSubmit={handleChangeLead}
              name={name}
              setName={setName}
              position='Lead'
              setPosition={setPosition}
              title='Change Team Lead'
            />
          </Modal>
        )}
        {project.lead && (
          <TableCard>
            <Table>
              {tHead}
              <tbody>
                <ProjectTableRow
                  key={project.lead.id}
                  name={project.lead.name}
                  surname={project.lead.surname}
                  role='Team Lead'
                  department={project.lead.department}
                  division={project.lead.division}
                  address={project.lead.address}
                  id={project.lead.id}
                  image={project.lead.image}
                />
              </tbody>
            </Table>
          </TableCard>
        )}
      </div>

      <div>
        <Flex justify='space-between' align='center'>
          <h2>Members</h2>
          <StyledButton onClick={handleOpenAddModal}>+</StyledButton>
        </Flex>{" "}
        {isAddModalOpen && (
          <Modal
            close={() => {
              setIsAddModalOpen(false), setName(""), setPosition("");
            }}
          >
            <ProjectAddForm
              onSubmit={handleAddMember}
              name={name}
              setName={setName}
              position={position}
              setPosition={setPosition}
              title={"New Member"}
            />
          </Modal>
        )}
        <TableCard>
          <Table>
            {tHead}
            <tbody>
              {project.team.map(({ name, surname, department, division, address, id, image, projects }) => {
                return (
                  <ProjectTableRow
                    key={id}
                    name={name}
                    surname={surname}
                    role={projects.find((item) => item.id === project.id).role}
                    department={department}
                    division={division}
                    address={address}
                    id={id}
                    image={image}
                  />
                );
              })}
            </tbody>
          </Table>
        </TableCard>
      </div>
    </Flex>
  );
};
