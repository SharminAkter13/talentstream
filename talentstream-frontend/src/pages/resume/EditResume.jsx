import React, { useEffect, useState } from "react";
import { API_URL, getToken } from "../../services/auth";
import { useNavigate, useParams } from "react-router-dom";
import Master from './../Master';
import axios from 'axios';

const RESUME_API = "/admin/resumes";

// Helper function to get the base asset URL
const getAssetBaseUrl = (apiUrl) => {
    return apiUrl.split('/api')[0];
};

const EditResume = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 

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
    const [currentCoverPath, setCurrentCoverPath] = useState(null);
    
    // Note: The controller assumes a delete-and-recreate strategy for relations, 
    // so we track the full current state of relations and existing logos.
    const [educations, setEducations] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);
    
    // State to hold dynamic new logo files (only for new uploads)
    const [eduLogoFiles, setEduLogoFiles] = useState({});
    const [expLogoFiles, setExpLogoFiles] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // --- Axios Instance Setup ---
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Accept': 'application/json',
        }
    });

    // --- Fetch Resume Data on Component Mount ---
    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axiosInstance.get(`${RESUME_API}/${id}`);
                const resume = response.data.resume;

                setMainForm({
                    name: resume.name || "",
                    email: resume.email || "",
                    profession_title: resume.profession_title || "",
                    location: resume.location || "",
                    web: resume.web || "",
                    pre_hour: resume.pre_hour || "",
                    age: resume.age || "",
                });

                setCurrentCoverPath(resume.cover_image);
                
                // Initialize nested arrays (ensure fields match Laravel model)
                setEducations(resume.educations.map(edu => ({
                    ...edu,
                    // Use a unique key for the front-end to manage logos and deletions
                    temp_key: Math.random(), 
                })));
                setExperiences(resume.experiences.map(exp => ({
                    ...exp,
                    temp_key: Math.random(),
                })));
                setSkills(resume.skills.map(skill => ({
                    ...skill,
                    temp_key: Math.random(),
                })));

            } catch (err) {
                setError(err.response?.data?.message || "Failed to load resume data.");
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [id, axiosInstance]);


    // --- Handlers for Main Form ---
    const handleMainChange = (e) => {
        const { name, value } = e.target;
        setMainForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCoverImage = (e) => {
        setCoverImageFile(e.target.files[0]);
    };


    // --- Handlers for Nested Forms ---
    // Note: The key for tracking logos is now the item's `temp_key` or `id` (if present)
    const createArrayHandlers = (state, setState, fileState, setFileState, logoKey) => {
        
        const handleChange = (e, key) => {
            const { name, value } = e.target;
            setState(prev => prev.map(item => 
                item.temp_key === key 
                ? { ...item, [name]: value } 
                : item
            ));
        };

        const handleFileChange = (e, key) => {
            setFileState((prev) => ({
                ...prev,
                [key]: e.target.files[0],
            }));

            // Clear existing logo path if a new file is uploaded
            setState(prev => prev.map(item => 
                item.temp_key === key
                ? { ...item, [logoKey]: null } // Clear old path
                : item
            ));
        };

        const handleAdd = () => {
            setState([...state, { temp_key: Math.random() }]);
        };

        const handleRemove = (key) => {
            setState(prev => prev.filter(item => item.temp_key !== key));
            
            // Clean up the corresponding new file state
            setFileState((prev) => {
                const newState = { ...prev };
                delete newState[key];
                return newState;
            });
        };

        return { handleChange, handleFileChange, handleAdd, handleRemove };
    };
    
    const eduHandlers = createArrayHandlers(educations, setEducations, eduLogoFiles, setEduLogoFiles, 'edu_logo');
    const expHandlers = createArrayHandlers(experiences, setExperiences, expLogoFiles, setExpLogoFiles, 'exp_logo');

    const handleSkillChange = (e, key) => {
        const { name, value } = e.target;
        setSkills(prev => prev.map(skill => 
            skill.temp_key === key 
            ? { ...skill, [name]: value } 
            : skill
        ));
    };

    const handleSkillAdd = () => setSkills([...skills, { temp_key: Math.random() }]);
    const handleSkillRemove = (key) => setSkills(prev => prev.filter(skill => skill.temp_key !== key));

    // --- Handle Form Submission (Axios POST with _method: PUT) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const formData = new FormData();
        formData.append("_method", "PUT"); 
        
        // 1. Append Main Form Data
        Object.entries(mainForm).forEach(([key, val]) => {
            if (val) formData.append(key, val);
        });

        // 2. Append Cover Image (only if new file is selected)
        if (coverImageFile) {
            formData.append("cover_image", coverImageFile);
        }

        // 3. Append Nested Data (Educations, Experiences, Skills)
        const formatAndAppendNested = (items, prefix, logoFiles, logoKey) => {
            items.filter(item => Object.values(item).some(v => v)).forEach((item, index) => {
                // Keep the 'id' of existing records for potential upsert logic on the backend
                if (item.id) formData.append(`${prefix}[${index}][id]`, item.id);
                
                Object.entries(item).forEach(([key, val]) => {
                    if (val && key !== 'temp_key') formData.append(`${prefix}[${index}][${key}]`, val);
                });

                // Attach NEW file from the file state
                if (logoFiles[item.temp_key]) {
                    formData.append(`${prefix}[${index}][${logoKey}]`, logoFiles[item.temp_key]);
                }
            });
        };

        formatAndAppendNested(educations, 'educations', eduLogoFiles, 'edu_logo');
        formatAndAppendNested(experiences, 'experiences', expLogoFiles, 'exp_logo');
        
        skills.filter(s => s.skill_name).forEach((skill, index) => {
             if (skill.id) formData.append(`skills[${index}][id]`, skill.id);
            formData.append(`skills[${index}][skill_name]`, skill.skill_name);
            formData.append(`skills[${index}][skill_percent]`, skill.skill_percent || 0);
        });
        
        // --- Axios Request ---
        try {
            await axiosInstance.post(`${RESUME_API}/${id}`, formData, {
                headers: {
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

    if (loading) return <Master><p>Loading resume...</p></Master>;

    return (
        <Master>
            <h2>Edit Resume: {mainForm.name}</h2>

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
                                {currentCoverPath && !coverImageFile && (
                                    <div className="mb-2">
                                        <p>Current Image:</p>
                                        <img src={`${getAssetBaseUrl(API_URL)}/storage/${currentCoverPath}`} alt="Current Cover" style={{maxWidth: '150px'}} />
                                    </div>
                                )}
                                <input type="file" className="form-control" onChange={handleCoverImage} />
                                {coverImageFile && <p className="text-success mt-1">New file selected: {coverImageFile.name}</p>}
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
                        {educations.map((edu) => (
                            <div key={edu.temp_key} className="border p-3 mb-3 bg-light rounded">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="mb-0">Education {edu.id ? `(ID: ${edu.id})` : '#New'}</h5>
                                    <button type="button" className="btn btn-sm btn-danger" onClick={() => eduHandlers.handleRemove(edu.temp_key)}>Remove</button>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>Degree</label>
                                        <input type="text" name="degree" className="form-control" value={edu.degree || ''} onChange={(e) => eduHandlers.handleChange(e, edu.temp_key)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Field of Study</label>
                                        <input type="text" name="field_of_study" className="form-control" value={edu.field_of_study || ''} onChange={(e) => eduHandlers.handleChange(e, edu.temp_key)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>School/University</label>
                                        <input type="text" name="school" className="form-control" value={edu.school || ''} onChange={(e) => eduHandlers.handleChange(e, edu.temp_key)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Logo (Max 1MB)</label>
                                        {edu.edu_logo && !eduLogoFiles[edu.temp_key] && (
                                            <div className="mb-2">
                                                <p>Current Logo:</p>
                                                <img src={`${getAssetBaseUrl(API_URL)}/storage/${edu.edu_logo}`} alt="Logo" style={{width: '50px'}} />
                                            </div>
                                        )}
                                        <input type="file" name="edu_logo" className="form-control" onChange={(e) => eduHandlers.handleFileChange(e, edu.temp_key)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>From Date</label>
                                        <input type="date" name="edu_from" className="form-control" value={edu.edu_from || ''} onChange={(e) => eduHandlers.handleChange(e, edu.temp_key)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>To Date</label>
                                        <input type="date" name="edu_to" className="form-control" value={edu.edu_to || ''} onChange={(e) => eduHandlers.handleChange(e, edu.temp_key)} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Description</label>
                                        <textarea name="edu_description" className="form-control" rows="2" value={edu.edu_description || ''} onChange={(e) => eduHandlers.handleChange(e, edu.temp_key)}></textarea>
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
                        {experiences.map((exp) => (
                            <div key={exp.temp_key} className="border p-3 mb-3 bg-light rounded">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="mb-0">Experience {exp.id ? `(ID: ${exp.id})` : '#New'}</h5>
                                    <button type="button" className="btn btn-sm btn-danger" onClick={() => expHandlers.handleRemove(exp.temp_key)}>Remove</button>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>Company Name</label>
                                        <input type="text" name="company_name" className="form-control" value={exp.company_name || ''} onChange={(e) => expHandlers.handleChange(e, exp.temp_key)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Title</label>
                                        <input type="text" name="title" className="form-control" value={exp.title || ''} onChange={(e) => expHandlers.handleChange(e, exp.temp_key)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Logo (Max 1MB)</label>
                                        {exp.exp_logo && !expLogoFiles[exp.temp_key] && (
                                            <div className="mb-2">
                                                <p>Current Logo:</p>
                                                <img src={`${getAssetBaseUrl(API_URL)}/storage/${exp.exp_logo}`} alt="Logo" style={{width: '50px'}} />
                                            </div>
                                        )}
                                        <input type="file" name="exp_logo" className="form-control" onChange={(e) => expHandlers.handleFileChange(e, exp.temp_key)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>From Date</label>
                                        <input type="date" name="exp_from" className="form-control" value={exp.exp_from || ''} onChange={(e) => expHandlers.handleChange(e, exp.temp_key)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>To Date</label>
                                        <input type="date" name="exp_to" className="form-control" value={exp.exp_to || ''} onChange={(e) => expHandlers.handleChange(e, exp.temp_key)} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Description</label>
                                        <textarea name="exp_description" className="form-control" rows="2" value={exp.exp_description || ''} onChange={(e) => expHandlers.handleChange(e, exp.temp_key)}></textarea>
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
                        {skills.map((skill) => (
                            <div key={skill.temp_key} className="row border p-3 mb-3 bg-light rounded align-items-center">
                                <div className="col-md-5 mb-3">
                                    <label>Skill Name</label>
                                    <input type="text" name="skill_name" className="form-control" value={skill.skill_name || ''} onChange={(e) => handleSkillChange(e, skill.temp_key)} />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label>Skill Percentage (0-100)</label>
                                    <input type="number" name="skill_percent" className="form-control" min="0" max="100" value={skill.skill_percent || 0} onChange={(e) => handleSkillChange(e, skill.temp_key)} />
                                </div>
                                <div className="col-md-2 mb-3 text-end">
                                    <button type="button" className="btn btn-sm btn-danger mt-4" onClick={() => handleSkillRemove(skill.temp_key)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <button className="btn btn-primary" disabled={submitting}>
                    {submitting ? "Updating..." : "Update Resume"}
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

export default EditResume;