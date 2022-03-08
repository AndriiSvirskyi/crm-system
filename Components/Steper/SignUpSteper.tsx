import Modal from "components/Modal/Modal";
import router from "next/router";
import React, { useEffect, useState } from "react";
import StepNavigation from "./StepNavigation";
import EmployeeInfoStep from "./EmployeeInfoStep";
import LocationInfo from "./LocationInfo";
import JobInfo from "./JobInfo";

export default function SignUpSteper({ closeModal }) {
  const [data, setData] = useState({});

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
      body: JSON.stringify(data),
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
            goToThePreviousStep={goToThePreviousStep}
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

// body: JSON.stringify({
//   name: data.name,
//   surname: data.surname,
//   password: data.password,
//   phone: data.phone,
//   email: data.email,
//   birthday: data.birthday,
//   gender: data.gender,
//   country: data.country,
//   city: data.city,
//   street: data.street,
//   index: data.index,
//   position: data.position,
//   departments: data.departments,
//   reportsTo: data.reportsTo,
//   division: data.division,
//   startDate: data.startDate,
//   id: data.id
// }),
