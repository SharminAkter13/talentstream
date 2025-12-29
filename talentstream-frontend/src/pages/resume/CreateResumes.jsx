import React, { useState } from "react";
import { API_URL, getToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Master from '../Master';
import axios from 'axios';

const RESUME_API = "/admin/resumes";

const CreateResume = () => {
    const navigate = useNavigate();

    const [mainForm, setMainForm] = useState({
        name: "",
        email: "",
        profession_title: "",
        location: "",
        web: "",
        pre_hour: "",
        age: "",
    });

    const [coverImageFile, setCoverImageFile] = useState(null);
    const [educations, setEducations] = useState([{}]);
    const [experiences, setExperiences] = useState([{}]);
    const [skills, setSkills] = useState([{}]);
    
    // State to hold dynamic logo files, indexed by the array index
    const [eduLogoFiles, setEduLogoFiles] = useState({});
    const [expLogoFiles, setExpLogoFiles] = useState({});

    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // --- Handlers for Main Form ---
    const handleMainChange = (e) => {
        const { name, value } = e.target;
        setMainForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCoverImage = (e) => {
        setCoverImageFile(e.target.files[0]);
    };

    // --- Handlers for Nested Forms ---
    const createArrayHandlers = (state, setState, fileState, setFileState, fileFieldName) => {
        
        const handleChange = (e, index) => {
            const { name, value } = e.target;
            const list = [...state];
            list[index] = { ...list[index], [name]: value };
            setState(list);
        };

        const handleFileChange = (e, index) => {
            // Store the file in the dedicated file state, keyed by index
            setFileState((prev) => ({
                ...prev,
                [index]: e.target.files[0],
            }));
        };

        const handleAdd = () => {
            setState([...state, {}]);
        };

        const handleRemove = (index) => {
            const list = [...state];
            list.splice(index, 1);
            setState(list);
            
            // Clean up the corresponding file state
            setFileState((prev) => {
                const newState = { ...prev };
                delete newState[index];
                return newState;
            });
        };

        return { handleChange, handleFileChange, handleAdd, handleRemove };
    };
    
    const eduHandlers = createArrayHandlers(educations, setEducations, eduLogoFiles, setEduLogoFiles, 'edu_logo');
    const expHandlers = createArrayHandlers(experiences, setExperiences, expLogoFiles, setExpLogoFiles, 'exp_logo');

    const handleSkillChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...skills];
        list[index] = { ...list[index], [name]: value };
        setSkills(list);
    };

    const handleSkillAdd = () => setSkills([...skills, {}]);
    const handleSkillRemove = (index) => {
        const list = [...skills];
        list.splice(index, 1);
        setSkills(list);
    };


    // --- Handle Form Submission (Axios POST) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const formData = new FormData();
        
        // 1. Append Main Form Data
        Object.entries(mainForm).forEach(([key, val]) => {
            if (val) formData.append(key, val);
        });

        // 2. Append Cover Image
        if (coverImageFile) {
            formData.append("cover_image", coverImageFile);
        }

        // 3. Append Nested Data (Educations, Experiences, Skills)
        const formatAndAppendNested = (items, prefix, logoFiles, logoKey) => {
            items.filter(item => Object.values(item).some(v => v)).forEach((item, index) => {
                Object.entries(item).forEach(([key, val]) => {
                    if (val) formData.append(`${prefix}[${index}][${key}]`, val);
                });

                // Attach nested file from the file state
                if (logoFiles[index]) {
                    formData.append(`${prefix}[${index}][${logoKey}]`, logoFiles[index]);
                }
            });
        };

        formatAndAppendNested(educations, 'educations', eduLogoFiles, 'edu_logo');
        formatAndAppendNested(experiences, 'experiences', expLogoFiles, 'exp_logo');
        
        // Skills don't have files
        skills.filter(s => s.skill_name).forEach((skill, index) => {
            formData.append(`skills[${index}][skill_name]`, skill.skill_name);
            formData.append(`skills[${index}][skill_percent]`, skill.skill_percent || 0);
        });
        
        // --- Axios Request ---
        try {
            const token = getToken();
            await axios.post(`${API_URL}${RESUME_API}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data', 
                },
            });

            navigate("/manage-resumes");
        } catch (err) {
            const responseData = err.response?.data;
            let errorMessage = responseData?.message || "An unexpected error occurred.";

            if (responseData?.errors) {
                errorMessage = Object.values(responseData.errors).flat().join(" | ");
            }
            
            setError(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Master>
            <h2>Create New Resume</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                {/* =====================
                    MAIN RESUME FIELDS
                ====================== */}
                <div className="card mb-4">
                    <div className="card-header bg-primary text-white">Main Details</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="fw-bold">Full Name</label>
                                <input type="text" name="name" className="form-control" value={mainForm.name} onChange={handleMainChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="fw-bold">Email</label>
                                <input type="email" name="email" className="form-control" value={mainForm.email} onChange={handleMainChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Profession Title</label>
                                <input type="text" name="profession_title" className="form-control" value={mainForm.profession_title} onChange={handleMainChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Location</label>
                                <input type="text" name="location" className="form-control" value={mainForm.location} onChange={handleMainChange} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Website</label>
                                <input type="url" name="web" className="form-control" value={mainForm.web} onChange={handleMainChange} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Preferred Hourly Rate</label>
                                <input type="text" name="pre_hour" className="form-control" value={mainForm.pre_hour} onChange={handleMainChange} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Age</label>
                                <input type="number" name="age" className="form-control" value={mainForm.age} onChange={handleMainChange} />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label className="fw-bold">Cover Image (Max 2MB)</label>
                                <input type="file" className="form-control" onChange={handleCoverImage} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* =====================
                    EDUCATION SECTION
                ====================== */}
                <div className="card mb-4">
                    <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                        Education History
                        <button type="button" className="btn btn-sm btn-info" onClick={eduHandlers.handleAdd}>+ Add Education</button>
                    </div>
                    <div className="card-body">
                        {educations.map((edu, index) => (
                            <div key={index} className="border p-3 mb-3 bg-light rounded">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="mb-0">Education #{index + 1}</h5>
                                    {educations.length > 1 && (
                                        <button type="button" className="btn btn-sm btn-danger" onClick={() => eduHandlers.handleRemove(index)}>Remove</button>
                                    )}
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>Degree</label>
                                        <input type="text" name="degree" className="form-control" value={edu.degree || ''} onChange={(e) => eduHandlers.handleChange(e, index)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Field of Study</label>
                                        <input type="text" name="field_of_study" className="form-control" value={edu.field_of_study || ''} onChange={(e) => eduHandlers.handleChange(e, index)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>School/University</label>
                                        <input type="text" name="school" className="form-control" value={edu.school || ''} onChange={(e) => eduHandlers.handleChange(e, index)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Logo (Max 1MB)</label>
                                        <input type="file" name="edu_logo" className="form-control" onChange={(e) => eduHandlers.handleFileChange(e, index)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>From Date</label>
                                        <input type="date" name="edu_from" className="form-control" value={edu.edu_from || ''} onChange={(e) => eduHandlers.handleChange(e, index)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>To Date</label>
                                        <input type="date" name="edu_to" className="form-control" value={edu.edu_to || ''} onChange={(e) => eduHandlers.handleChange(e, index)} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Description</label>
                                        <textarea name="edu_description" className="form-control" rows="2" value={edu.edu_description || ''} onChange={(e) => eduHandlers.handleChange(e, index)}></textarea>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* =====================
                    EXPERIENCE SECTION
                ====================== */}
                <div className="card mb-4">
                    <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                        Experience History
                        <button type="button" className="btn btn-sm btn-info" onClick={expHandlers.handleAdd}>+ Add Experience</button>
                    </div>
                    <div className="card-body">
                        {experiences.map((exp, index) => (
                            <div key={index} className="border p-3 mb-3 bg-light rounded">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="mb-0">Experience #{index + 1}</h5>
                                    {experiences.length > 1 && (
                                        <button type="button" className="btn btn-sm btn-danger" onClick={() => expHandlers.handleRemove(index)}>Remove</button>
                                    )}
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>Company Name</label>
                                        <input type="text" name="company_name" className="form-control" value={exp.company_name || ''} onChange={(e) => expHandlers.handleChange(e, index)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Title</label>
                                        <input type="text" name="title" className="form-control" value={exp.title || ''} onChange={(e) => expHandlers.handleChange(e, index)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Logo (Max 1MB)</label>
                                        <input type="file" name="exp_logo" className="form-control" onChange={(e) => expHandlers.handleFileChange(e, index)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>From Date</label>
                                        <input type="date" name="exp_from" className="form-control" value={exp.exp_from || ''} onChange={(e) => expHandlers.handleChange(e, index)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>To Date</label>
                                        <input type="date" name="exp_to" className="form-control" value={exp.exp_to || ''} onChange={(e) => expHandlers.handleChange(e, index)} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Description</label>
                                        <textarea name="exp_description" className="form-control" rows="2" value={exp.exp_description || ''} onChange={(e) => expHandlers.handleChange(e, index)}></textarea>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* =====================
                    SKILLS SECTION
                ====================== */}
                <div className="card mb-4">
                    <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                        Skills
                        <button type="button" className="btn btn-sm btn-info" onClick={handleSkillAdd}>+ Add Skill</button>
                    </div>
                    <div className="card-body">
                        {skills.map((skill, index) => (
                            <div key={index} className="row border p-3 mb-3 bg-light rounded align-items-center">
                                <div className="col-md-5 mb-3">
                                    <label>Skill Name</label>
                                    <input type="text" name="skill_name" className="form-control" value={skill.skill_name || ''} onChange={(e) => handleSkillChange(e, index)} />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label>Skill Percentage (0-100)</label>
                                    <input type="number" name="skill_percent" className="form-control" min="0" max="100" value={skill.skill_percent || 0} onChange={(e) => handleSkillChange(e, index)} />
                                </div>
                                <div className="col-md-2 mb-3 text-end">
                                    {skills.length > 1 && (
                                        <button type="button" className="btn btn-sm btn-danger mt-4" onClick={() => handleSkillRemove(index)}>Remove</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <button className="btn btn-primary" disabled={submitting}>
                    {submitting ? "Saving..." : "Create Resume"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/manage-resumes")}
                >
                    Cancel
                </button>
            </form>
        </Master>
    );
};

export default CreateResume;