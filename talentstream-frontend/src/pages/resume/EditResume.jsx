import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeDetail, updateResume } from "../../services/auth";
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
    name: "", email: "", profession_title: "", location: "",
    web: "", pre_hour: "", age: "", cover_image: null,
    educations: [], experiences: [], skills: [],
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getResumeDetail(id);
        setResume({ ...data, cover_image: null });
        setLoading(false);
      } catch (err) { console.error(err); }
    };
    load();
  }, [id]);

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(resume).forEach(([key, val]) => {
      if (!["educations", "experiences", "skills"].includes(key) && val !== null) {
        formData.append(key, val);
      }
    });

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
      await updateResume(id, formData);
      alert("Resume Updated!");
      window.location.href = "/candidate-resume";
    } catch (error) { alert("Update failed."); }
  };

  if (loading) return <Master><p>Loading...</p></Master>;

  return (
    <Master>
      <div className="container py-4">
        <h3>Edit Resume</h3>
        {step === 1 && <StepPersonal resume={resume} setResume={setResume} next={() => setStep(2)} />}
        {step === 2 && <StepEducation resume={resume} setResume={setResume} next={() => setStep(3)} prev={() => setStep(1)} />}
        {step === 3 && <StepExperience resume={resume} setResume={setResume} next={() => setStep(4)} prev={() => setStep(2)} />}
        {step === 4 && <StepSkill resume={resume} setResume={setResume} prev={() => setStep(3)} submit={handleSubmit} />}
      </div>
    </Master>
  );
};

export default EditResume;