import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import router from "next/router";
import moment from "moment";
import { usersState } from "state/atoms";
import {
  FaBirthdayCake,
  FaBullhorn,
  FaCalendarAlt,
  FaGifts,
  FaLink,
  FaPlane,
} from "react-icons/fa";
import MainLayout from "../Layouts/MainLayout";
import { UserWindow, UserBlockItem } from "styled-components/UserForm";
import { Flex } from "styled-components/Flex";
import { ImageContainer } from "styled-components/ImageContainer";
import Modal from "components/Modal";
import { Form } from "styled-components/Form";
import Slider from "containers/profile/timeOffTab.tsx/SliderTimeOff";
import { Label } from "styled-components/Label";
import { Button } from "components/Button";
import { Input } from "components/Input";


const GreetingContainer = styled.div`
  height: 100px;
  margin: 0 0 20px 0;
  background: ${(props: { image: string }) => `url(${props.image})`} no-repeat;
  background-size: contain;
  border-bottom: 1px solid #d5d6d6;
  p {
    font-size: 18px;
    position: relative;
    left: 50%;
  }
`;
const TitleContainer = styled.div`
  margin: 0 0 20px 0;
  border-bottom: 1px solid #d5d6d6;
  padding: 0 0 10px 0;
  p {
    margin: 0 0 0 10px;
    font-weight: bold;
    font-size: 18px;
  }
`;
const RequestBtnContent = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  span {
    margin: 0 0 0 20px;
    font-size: 15px;
  }
`;
const DaysBtn = styled.button`
  cursor: pointer;
  user-select: none;
  background: transparent;
  border: none;
  color: #0d74bc;
  &:hover {
    color: #2196f3;
  }
  &:focus {
    color: #777;
  }
`;
const CakeIcon = styled.span`
  position: relative;
  top: -15px;
  right: -25px;
`;
const BirthdayContainer = styled.div`
  cursor: pointer;
  p {
    visibility: hidden;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 10px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
  }
  &:hover p {
    visibility: visible;
  }
`;
export const Select = styled.select`
  height: "auto";
  height: 40px;
  width: 302px;
  border-radius: 8px;
  padding: 0 0 0 25px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export default function Home() {
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  const [user, setUser] = useState(null);
  const [showRequest, setShowRequest] = useState(false);
  const [typeLeave, setTypeLeave] = useState("");
  const [startLeave, setStartLeave] = useState(moment().format("YYYY-MM-DD"));
  const [endLeave, setEndLeave] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    if (!users) {
      const response = fetch("http://localhost:4200/users");
      response
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setUsersToRecoil(res);
        });
    }
    if (localStorage.user) {
      setUser(JSON.parse(localStorage.user));
    }
  }, []);

  const getCurrentDate = () => {
    const date = new Date();
    const month =
      date.getUTCMonth() + 1 < 10
        ? "0" + (date.getUTCMonth() + 1)
        : date.getUTCMonth() + 1;
    const day =
      date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate();
    return day + "." + month;
  };
  const getBirthdays = users
    ? users.reduce((acc, cur) => {
        if (cur.birth === getCurrentDate()) {
          if (acc.birthdays) {
            acc.birthdays.push(cur);
          } else {
            acc.birthdays = [cur];
          }
        }
        return acc;
      }, {})
    : { birthdays: [] };
  const getCurrentHour = () => {
    const date = new Date();
    return date.getHours();
  };
  const getGreetingText = () => {
    if (getCurrentHour() >= 6 && getCurrentHour() < 12) {
      return "Good morning";
    } else if (getCurrentHour() >= 12 && getCurrentHour() <= 16) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };
  const getGreetingImage = () => {
    if (getGreetingText() === "Good morning") {
      return "https://app.peopleforce.io/assets/morning-11e07711ca4e47f8a59830c82f958beea0c28f15ce938194e1856bd75b623826.png";
    } else if (getGreetingText() === "Good afternoon") {
      return "https://app.peopleforce.io/assets/afternoon-c24bd801c0998a3ceaa6e07dfb571bf2bf27ede9a7366a4620ec5bc9d3eb79fc.png";
    } else {
      return "https://app.peopleforce.io/assets/night-caf4e6bb8f31c6b2c7a30d08b8b08c7ed467d1a3c11c43ae5a21248374f744ea.png";
    }
  };
  const saveLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <MainLayout>
      <UserWindow>
        <Flex>
          <Flex width="40%" direction="column" margin="0 10px 0 0">
            <UserBlockItem>
              <GreetingContainer image={getGreetingImage()}>
                <Flex align="center" height="100px">
                  <p>
                    {getGreetingText()}, <br />
                    <b>{user?.name}</b>
                  </p>
                </Flex>
              </GreetingContainer>
              <Button
                background="#ff9f69"
                hoverBack="#ff9f69CC"
                width="100%"
                height="40px"
                padding="7px 14px"
                color="white"
                align="center"
                onClick={() => {
                  setShowRequest(true);
                }}
              >
                <RequestBtnContent>
                  <FaPlane size="16" />
                  <span>Request Time Off</span>
                </RequestBtnContent>
              </Button>
              <Flex justify="center">
                <Slider />
              </Flex>
            </UserBlockItem>
            <UserBlockItem>
              <TitleContainer>
                <Flex height="30px" justify="space-between" align="center">
                  <Flex align="center">
                    <FaGifts size="20" />
                    <p>Celebrations</p>
                  </Flex>
                  <Flex>
                    <DaysBtn>Today</DaysBtn> | <DaysBtn>3 days</DaysBtn> |
                    <DaysBtn>7 days</DaysBtn>
                  </Flex>
                </Flex>
              </TitleContainer>
              <Flex>
                {getBirthdays.birthdays?.map(({ id, image, name, surname }) => {
                  return (
                    <BirthdayContainer
                      key={id}
                      onClick={() => router.push(`/employees/${id}`)}
                    >
                      <p>
                        {name} {surname}
                      </p>
                      <ImageContainer
                        image={image}
                        width="40px"
                        height="40px"
                        margin="0 10px 0 0"
                      />
                      <CakeIcon>
                        <FaBirthdayCake fill="#eba2ae" />
                      </CakeIcon>
                    </BirthdayContainer>
                  );
                })}
              </Flex>
            </UserBlockItem>
            <UserBlockItem>
              <TitleContainer>
                <Flex height="30px" justify="space-between" align="center">
                  <Flex align="center">
                    <FaCalendarAlt size="15" />
                    <p>{"Who's out"}</p>
                  </Flex>
                  <Flex>
                    <DaysBtn>Today</DaysBtn> | <DaysBtn>3 days</DaysBtn> |
                    <DaysBtn>7 days</DaysBtn>
                  </Flex>
                </Flex>
              </TitleContainer>
            </UserBlockItem>
            <UserBlockItem>
              <TitleContainer>
                <Flex height="30px" align="center">
                  <FaLink />
                  <p>Company links</p>
                </Flex>
              </TitleContainer>
            </UserBlockItem>
          </Flex>
          <Flex width="60%" height="250px">
            <UserBlockItem>
              <TitleContainer>
                <Flex height="30px" align="center">
                  <FaBullhorn size="20" fill="#f88d8d" />
                  <p>Announcements</p>
                </Flex>
              </TitleContainer>
              <Flex
                height="150px"
                direction="column"
                justify="center"
                align="center"
              >
                <FaBullhorn size="50" fill="grey" />
                <p>{"You don't have any announcements at the moment..."}</p>
              </Flex>
            </UserBlockItem>
          </Flex>
          {showRequest && (
            <Modal close={() => setShowRequest(false)}>
              <Form submit={(e) => saveLeave(e)} content="Time Off Request">
                <Flex align="center" margin="0 0 10px 0">
                  <Label width="130px" htmlFor="type">
                    Leave type:
                  </Label>
                  <Select
                    value={typeLeave}
                    onChange={(e) => setTypeLeave(e.target.value)}
                    id="type"
                  >
                    <option value="select">Select</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Sick leave">Sick leave</option>
                    <option value="Unpaid leave">Unpaid leave</option>
                  </Select>
                </Flex>
                <Flex align="center" margin="0 0 10px 0">
                  <Label width="130px" htmlFor="from">
                    From:
                  </Label>
                  <Input
                    id="from"
                    value={startLeave}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setStartLeave(e.target.value)
                    }
                    type="date"
                    height="35px"
                    width="300px"
                    background="transparent"
                    outline="0.5px solid black"
                  />
                </Flex>
                <Flex align="center" margin="0 0 30px 0">
                  <Label width="130px" htmlFor="to">
                    To:
                  </Label>
                  <Input
                    id="to"
                    value={endLeave}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEndLeave(e.target.value)
                    }
                    type="date"
                    height="35px"
                    width="300px"
                    background="transparent"
                    outline="0.5px solid black"
                  />
                </Flex>
                <Button padding="10px 30px">Save</Button>
              </Form>
            </Modal>
          )}

        </Flex>
      </UserWindow>
    </MainLayout>
  );
}
