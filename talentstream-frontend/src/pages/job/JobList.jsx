import { useEffect, useState } from "react";
import { getEmployerJobs, deleteJob } from "../../services/auth";


export default function JobList() {
    const [jobs, setJobs] = useState([]);

    const loadJobs = async () => {
        const data = await getEmployerJobs();
        setJobs(data);
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        await deleteJob(id);
        loadJobs();
        alert("Job deleted!");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Jobs</h2>

            <a
                href="/employer/jobs/create"
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
            >
                + Post New Job
            </a>

            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Company</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job.id}>
                            <td className="border p-2">{job.title}</td>
                            <td className="border p-2">{job.company_name}</td>
                            <td className="border p-2">{job.status}</td>
                            <td className="border p-2 space-x-2">
                                <a
                                    href={`/employer/jobs/${job.id}`}
                                    className="text-blue-600"
                                >
                                    View
                                </a>
                                <a
                                    href={`/employer/jobs/${job.id}/edit`}
                                    className="text-green-600"
                                >
                                    Edit
                                </a>
                                <button
                                    onClick={() => handleDelete(job.id)}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
