import React, { useState } from "react";
import { storeResume } from "../../services/auth";
import Master from './../Master';
import StepPersonal from "../../components/resume/steps/StepPersonal";
import StepEducation from "../../components/resume/steps/StepEducation";
import StepExperience from "../../components/resume/steps/StepExperience";
import StepSkill from "../../components/resume/steps/StepSkill";

const CreateResume = () => {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState({
    name: "", email: "", profession_title: "", location: "",
    web: "", pre_hour: "", age: "", cover_image: null,
    educations: [], experiences: [], skills: [],
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append standard fields
    Object.entries(resume).forEach(([key, val]) => {
      if (!["educations", "experiences", "skills"].includes(key) && val !== null) {
        formData.append(key, val);
      }
    });

    // Append nested arrays correctly for Laravel
    resume.educations.forEach((item, i) => {
      Object.entries(item).forEach(([key, val]) => formData.append(`educations[${i}][${key}]`, val || ""));
    });

    resume.experiences.forEach((item, i) => {
      Object.entries(item).forEach(([key, val]) => formData.append(`experiences[${i}][${key}]`, val || ""));
    });

    resume.skills.forEach((item, i) => {
      formData.append(`skills[${i}][skill_name]`, item.skill_name);
      formData.append(`skills[${i}][skill_percent]`, item.skill_percent);
    });

    try {
      await storeResume(formData);
      alert("Resume Created Successfully!");
      window.location.href = "/candidate-resume";
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create resume.");
    }
  };

  return (
    <Master>
      <div className="container py-4">
        <h3 className="mb-4">Create Resume (Step {step} of 4)</h3>
        {step === 1 && <StepPersonal resume={resume} setResume={setResume} next={nextStep} />}
        {step === 2 && <StepEducation resume={resume} setResume={setResume} next={nextStep} prev={prevStep} />}
        {step === 3 && <StepExperience resume={resume} setResume={setResume} next={nextStep} prev={prevStep} />}
        {step === 4 && <StepSkill resume={resume} setResume={setResume} prev={prevStep} submit={handleSubmit} />}
      </div>
    </Master>
  );
};

export default CreateResume;