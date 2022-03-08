import Modal from "components/Modal";
import router from "next/router";
import React, { useEffect, useState } from "react";
import StepNavigation from "./StepNavigation";
import EmployeeInfoStep from "./EmployeeInfoStep";
import LocationInfo from "./LocationInfo";
import JobInfo from "./JobInfo";

type NewEmployeeProps = {
  email:string;
  password:string;
  name:string;
  surname:string;
  role:string;
  startDate:string;
  position:string;
  department:string;
  division:string;
  birthday:string;
  gender:string;
  phone:string;
  city:string;
  country:string;
  reportsTo:string;
}
// ?????
export default function SignUpSteper({ closeModal }) {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (!localStorage.user) {
      router.push("/forbidden");
    }
  }, [router]);

  const labelArray = ["User info", "Location", "Job"];
  const [currentStep, setCurrentStep] = useState(1);
  const goToStep = (numberOfStep) => {
    setCurrentStep(numberOfStep);
  };
  const goToTheNextStep = () => {
    if (currentStep === 4) return;
    if (currentStep >= 1) setCurrentStep(currentStep + 1);
  };
  const goToThePreviousStep = () => {
    if (currentStep === 1) return;
    setCurrentStep(currentStep - 1);
  };

  const submit = async () => {
    await fetch(`http://localhost:4200/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "",
        email: data.email,
        password: data.password,
        name: data.name,
        surname: data.surname,
        role: data.role,
        startDate: data.startDate,
        image:
          "https://zahnarzt-hendrich.de/wp-content/uploads/zahnarzt-hendric_er1_praxisteam.jpg",
        projects: [{ id: "3fdffs", name: "Blackchain", role: "manager" }],
        superintendent: "????",
        company: "4ire",
        position: data.position,
        typeOfWork: "???",
        department: data.department,
        division: data.division,
        amount: "???",
        team: "???",
        birth: data.birthday,
        gender: data.gender,
        mobile: data.phone,
        username: "???",
        address: `${data.city}, ${data.country}`,
        reportsTo: data.reportsTo,
      }),
    });
  };

  return (
    <Modal close={closeModal}>
      <div>
        <StepNavigation
          goToStep={goToStep}
          labelArray={labelArray}
          currentStep={currentStep}
        ></StepNavigation>
        {currentStep === 1 && (
          <EmployeeInfoStep
            data={data}
            setData={setData}
            goToTheNextStep={goToTheNextStep}
          />
        )}
        {currentStep === 2 && (
          <LocationInfo
            data={data}
            setData={setData}
            goToThePreviousStep={goToThePreviousStep}
            goToTheNextStep={goToTheNextStep}
          />
        )}
        {currentStep >= 3 && (
          <JobInfo
            data={data}
            setData={setData}
            goToTheNextStep={goToTheNextStep}
            goToThePreviousStep={goToThePreviousStep}
            currentStep={currentStep}
            submit={submit}
            closeModal={closeModal}
          />
        )}
      </div>
    </Modal>
  );
}

