import { Flex } from "components/User/Flex";
import { UserBlockItem, UserText, UserTitle } from "components/User/UserForm";
import Link from "next/link";

export const Projects = ({ projects, searchProject }) => {
  return (
    <Flex justify="start" wrap="wrap">
      {Object.entries(projects)
        .filter((project) => {
          if (project[0].toLowerCase().includes(searchProject.toLowerCase())) {
            return project;
          }
        })
        .map((project, i) => (
          <Link href={`/employees`} key={i} passHref>
            <UserBlockItem width="30%">
              <UserTitle>{project[0]}</UserTitle>
              <UserText>
                Members ({Object.entries(projects)[1].length + 1})
                <hr />
                {`${project[1]} \n`.replaceAll(",", ", ")}
              </UserText>
            </UserBlockItem>
          </Link>
        ))}
    </Flex>
  );
};
