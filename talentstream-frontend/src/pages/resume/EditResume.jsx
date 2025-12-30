import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Master from './../Master';

import StepPersonal from "../../components/resume/steps/StepPersonal";
import StepEducation from "../../components/resume/steps/StepEducation";
import StepExperience from "../../components/resume/steps/StepExperience";
import StepSkill from "../../components/resume/steps/StepSkill";

const EditResume = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

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

  // Load existing resume
  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/resumes/${id}`);
      setResume({
        ...res.data,
        cover_image: null, // prevent auto-file issue
      });
      setLoading(false);
    };
    load();
  }, [id]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Submit update
  const handleSubmit = async () => {
    const formData = new FormData();

    Object.entries(resume).forEach(([key, val]) => {
      if (key !== "educations" && key !== "experiences" && key !== "skills") {
        if (val !== null) formData.append(key, val);
      }
    });

    resume.educations.forEach((item, i) => {
      Object.entries(item).forEach(([key, val]) => {
        formData.append(`educations[${i}][${key}]`, val);
      });
    });

    resume.experiences.forEach((item, i) => {
      Object.entries(item).forEach(([key, val]) => {
        formData.append(`experences[${i}][${key}]`, val);
      });
    });

    resume.skills.forEach((item, i) => {
      formData.append(`skills[${i}][skill_name]`, item.skill_name);
      formData.append(`skills[${i}][skill_percent]`, item.skill_percent);
    });

    await axios.post(
      `http://127.0.0.1:8000/api/resumes/${id}`,
      formData
    );

    alert("Resume Updated!");
    window.location.href = "/admin/resumes";
  };

  if (loading) return <Master><p>Loading...</p></Master>;

  return (
    <Master>
      <h3>Edit Resume</h3>

      {step === 1 && <StepPersonal resume={resume} setResume={setResume} next={nextStep} />}
      {step === 2 && <StepEducation resume={resume} setResume={setResume} next={nextStep} prev={prevStep} />}
      {step === 3 && <StepExperience resume={resume} setResume={setResume} next={nextStep} prev={prevStep} />}
      {step === 4 && <StepSkill resume={resume} setResume={setResume} prev={prevStep} submit={handleSubmit} />}
    </Master>
  );
};

export default EditResume;
