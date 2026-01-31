import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, ASSET_URL, isLoggedIn, hasRole } from "../../services/auth";
import PortalFooter from "../../portalComponent/PortalFooter";
import PortalNavbar from "../../portalComponent/PortalNavbar";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoSrc, setLogoSrc] = useState("/assets/img/default-logo.png");

  // Helper functions
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  const getLocationText = (loc) => {
    if (!loc) return "N/A";
    if (typeof loc === "object") {
      return [loc.city, loc.state, loc.country].filter(Boolean).join(", ");
    }
    return loc;
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);

        // Set the logo or default
          if (res.data?.company_logo) {
                setLogoSrc(`${ASSET_URL}/storage/${res.data.company_logo}`);
            } else {
              setLogoSrc("/assets/img/default-logo.png"); // Fallback
            }
      } catch (err) {
        console.error("Fetch error", err);
        alert("Failed to load job details.");
      } finally {
        setLoading(false);
      }
      if (res.data?.company_logo) {
  setLogoSrc(`${ASSET_URL}/storage/${res.data.company_logo}`);
}
    };

    fetchJob();
  }, [id]);

  const handleApplyClick = () => {
    if (!isLoggedIn()) {
      alert("You must be logged in to apply!");
      navigate("/login", { state: { from: `/job-details/${id}` } });
      return;
    }

    if (!hasRole(3)) {
      alert("Only candidates can apply for jobs.");
      return;
    }

    navigate(`/apply/${id}`);
  };

  if (loading) {
    return <div className="text-center p-5 mt-5">Loading Job Details...</div>;
  }

  if (!job) {
    return <div className="text-center p-5 mt-5">Job not found.</div>;
  }

  return (
    <>
      <PortalNavbar />

      {/* Header */}
      <div
        className="page-header"
        style={{
          background: "url(/assets/img/banner1.jpg)",
          padding: "100px 0",
        }}
      >
        <div className="container mt-5">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-12">
              <div className="d-flex align-items-center">
                <img
                  src={logoSrc}
                  alt="company logo"
                  onError={() => setLogoSrc("/assets/img/default-logo.png")}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", marginRight: "20px" }}
                />
                <div>
                  <h3 className="font-weight-bold">{job.title || "N/A"}</h3>
                  <p className="text-primary mb-1">
                    {job.company_name || "N/A"}
                  </p>
                  <span>
                    <i className="lni-map-marker"></i>{" "}
                    {getLocationText(job.job_location)}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 text-lg-right mt-3 mt-lg-0">
              <div className="price-tag">
                <h4 className="text-success font-weight-bold">
                  &#2547; {job.salary_min || "N/A"} - {job.salary_max || "N/A"}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <section className="job-detail section mt-5">
        <div className="container">
          <div className="row">
            {/* Left */}
            <div className="col-lg-8 col-md-12">
              <div className="content-area shadow-sm p-4 bg-white rounded">
                <h4>Job Description</h4>
                <div
                  className="mb-4"
                  dangerouslySetInnerHTML={{ __html: job.description || "" }}
                />
                <div className="mt-4">
                  <button
                    onClick={handleApplyClick}
                    className="btn btn-primary px-5 py-3"
                  >
                    Apply For This Job
                  </button>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="col-lg-4 col-md-12">
              <aside className="sidebar">
                {/* Job Summary */}
                <div className="widget shadow-sm p-4 bg-white rounded mb-4">
                  <h5 className="widget-title fw-bold">Job Summary</h5>
                  <ul className="list-unstyled mt-3">
                    <li className="mb-2">
                      <strong>Published:</strong> {formatDate(job.created_at)}
                    </li>
                    <li className="mb-2">
                      <strong>Posted Date:</strong> {formatDate(job.posted_date)}
                    </li>
                    <li className="mb-2">
                      <strong>Deadline:</strong>{" "}
                      {formatDate(job.application_deadline)}
                    </li>
                    <li className="mb-2">
                      <strong>Vacancies:</strong> {job.num_vacancies || "N/A"}
                    </li>
                    <li className="mb-2">
                      <strong>Category:</strong> {job.category?.name || "N/A"}
                    </li>
                    <li className="mb-2">
                      <strong>Employment Type:</strong>{" "}
                      {job.job_type?.name || "N/A"}
                    </li>
                    <li className="mb-2">
                      <strong>Location:</strong> {getLocationText(job.job_location)}
                    </li>
                    <li className="mb-2">
                      <strong>Status:</strong>{" "}
                      <span className="badge badge-success">{job.status || "N/A"}</span>
                    </li>
                    <li className="mb-2">
                      <strong>Salary Range:</strong> &#2547; {job.salary_min || "N/A"} - {job.salary_max || "N/A"}
                    </li>
                  </ul>
                </div>

                {/* Company Info */}
                <div className="widget shadow-sm p-4 bg-white rounded">
                  <h5 className="widget-title fw-bold">About Company</h5>
                  <p className="mt-3 text-muted small">
                    {job.company_description || "No company description."}
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <PortalFooter />
    </>
  );
};

export default JobDetails;
