import { useEffect, useState } from "react";
import { getJobFormData, storeJob } from "../../services/auth";

export default function JobCreate() {
    const [formData, setFormData] = useState({
        title: "",
        company_name: "",
        category_id: "",
        job_location_id: "",
        job_type_id: "",
        description: "",
        status: "active",
    });
    const [dropdowns, setDropdowns] = useState({
        categories: [],
        locations: [],
        types: [],
    });

    useEffect(() => {
        getJobFormData().then(setDropdowns);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        setFormData({ ...formData, cover_image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        Object.keys(formData).forEach((key) => fd.append(key, formData[key]));

        await storeJob(fd);
        alert("Job created!");
        window.location.href = "/employer/jobs";
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Post New Job</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    placeholder="Job Title"
                    className="border p-2 w-full"
                    onChange={handleChange}
                />

                <input
                    name="company_name"
                    placeholder="Company Name"
                    className="border p-2 w-full"
                    onChange={handleChange}
                />

                <select
                    name="category_id"
                    className="border p-2 w-full"
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    {dropdowns.categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <select
                    name="job_location_id"
                    className="border p-2 w-full"
                    onChange={handleChange}
                >
                    <option value="">Select Location</option>
                    {dropdowns.locations.map((l) => (
                        <option key={l.id} value={l.id}>
                            {l.name}
                        </option>
                    ))}
                </select>

                <select
                    name="job_type_id"
                    className="border p-2 w-full"
                    onChange={handleChange}
                >
                    <option value="">Select Job Type</option>
                    {dropdowns.types.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>
                    ))}
                </select>

                <textarea
                    name="description"
                    className="border p-2 w-full"
                    placeholder="Job Description"
                    onChange={handleChange}
                />

                <input type="file" onChange={handleFile} />

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Create Job
                </button>
            </form>
        </div>
    );
}
