import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import router from "next/router";
import { ImageContainer } from "styled-components/ImageContainer";

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

const TD = styled.td`
  padding: 0.75rem 1.25rem;
  border-top: 1px solid #ddd;
`;
const Anchor = styled.span`
  cursor: pointer;
  a {
    color: rgb(25, 118, 186);
    text-decoration: none;
  }
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
  return (
    <Flex direction="column" padding="10px">
      <span>
        <Anchor onClick={() => router.push("/projects")}>
          <a>Teams </a>
        </Anchor>
        / {project.name}
      </span>
      <h1>{project.name}</h1>
      <div>
        <h2>Team Lead</h2>
        <TableCard>
          <Table>
            {tHead}
            <tbody>
              <tr>
                <TD>
                  <Flex align="center">
                    <ImageContainer
                      image={project.lead.image}
                      width="35px"
                      height="35px"
                      margin="0 10px 0 0"
                    />
                    <Anchor
                      onClick={() =>
                        router.push(`/employees/${project.lead.id}`)
                      }
                    >
                      <a>{`${project.lead.name} ${project.lead.surname}`}</a>
                    </Anchor>
                  </Flex>
                </TD>
                <TD>{project.lead.role}</TD>
                <TD>{project.lead.department}</TD>
                <TD>{project.lead.division}</TD>
                <TD>{project.lead.address}</TD>
              </tr>
            </tbody>
          </Table>
        </TableCard>
      </div>

      <div>
        <h2>Members</h2>
        <TableCard>
          <Table>
            {tHead}
            <tbody>
              {project.team.map(
                ({
                  name,
                  surname,
                  role,
                  department,
                  division,
                  address,
                  id,
                  image,
                }) => {
                  return (
                    <tr key={id}>
                      <TD>
                        <Flex align="center">
                          <ImageContainer
                            image={image}
                            width="35px"
                            height="35px"
                            margin="0 10px 0 0"
                          />
                          <Anchor
                            onClick={() => router.push(`/employees/${id}`)}
                          >
                            <a>{`${name} ${surname}`}</a>
                          </Anchor>
                        </Flex>
                      </TD>
                      <TD>{role}</TD>
                      <TD>{department}</TD>
                      <TD>{division}</TD>
                      <TD>{address}</TD>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </TableCard>
      </div>
    </Flex>
  );
};
