import React, { useState } from "react";
import axios from "axios";
import Master from './../Master';
import StepPersonal from "../../components/resume/steps/StepPersonal";
import StepEducation from "../../components/resume/steps/StepEducation";
import StepExperience from "../../components/resume/steps/StepExperience";
import StepSkill from "../../components/resume/steps/StepSkill";

const CreateResume = () => {
  const [step, setStep] = useState(1);

  const [resume, setResume] = useState({
    name: "",
    email: "",
    profession_title: "",
    location: "",
    web: "",
    pre_hour: "",
    age: "",
    cover_image: null,

    educations: [],
    experiences: [],
    skills: [],
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Submit resume
  const handleSubmit = async () => {
    const formData = new FormData();

    Object.entries(resume).forEach(([key, val]) => {
      if (key !== "educations" && key !== "experiences" && key !== "skills") {
        formData.append(key, val);
      }
    });

    resume.educations.forEach((item, i) => {
      Object.entries(item).forEach(([key, val]) => {
        formData.append(`educations[${i}][${key}]`, val);
      });
    });

    resume.experiences.forEach((item, i) => {
      Object.entries(item).forEach(([key, val]) => {
        formData.append(`experiences[${i}][${key}]`, val);
      });
    });

    resume.skills.forEach((item, i) => {
      formData.append(`skills[${i}][skill_name]`, item.skill_name);
      formData.append(`skills[${i}][skill_percent]`, item.skill_percent);
    });

    await axios.post("http://127.0.0.1:8000/api/resumes", formData);
    alert("Resume Created!");
    window.location.href = "/admin/resumes";
  };

  return (
    <Master>
      <h3>Create Resume</h3>

      {step === 1 && <StepPersonal resume={resume} setResume={setResume} next={nextStep} />}
      {step === 2 && <StepEducation resume={resume} setResume={setResume} next={nextStep} prev={prevStep} />}
      {step === 3 && <StepExperience resume={resume} setResume={setResume} next={nextStep} prev={prevStep} />}
      {step === 4 && <StepSkill resume={resume} setResume={setResume} prev={prevStep} submit={handleSubmit} />}
    </Master>
  );
};

export default CreateResume;
