import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api, getHomePortalData, ASSET_URL } from "../services/auth";
import HeroSection from "./../portalComponent/HeroSection";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [locations, setLocations] = useState([]); // New state for locations
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const response = await getHomePortalData();
        setCategories(response.categories || []);
        setJobs(response.jobs || []);
        setLocations(response.locations || []); // Set locations from centralized API
      } catch (err) {
        console.error("Home data load error", err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);
  // 2. Load Pricing Packages
 useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get("/packages");
        // Accessing res.data.data because of the wrapper in Controller
        setPackages(res.data.data || []);
      } catch (err) {
        console.error("Package fetch error", err);
      }
    };
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Pass categories to HeroSection if it needs them for dropdowns */}
      <HeroSection categories={categories} locations={locations} />

      {/* Service Section */}
      <section id="service-main" className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="service-item text-center">
                <div className="icon-wrapper">
                  <i className="ti-search" style={{ fontSize: "2.5rem" }}></i>
                </div>
                <h2>Search Millions of jobs</h2>
                <p>
                  Explore a vast database of career opportunities across every industry. 
                  Our intelligent filters help you find the perfect role in seconds.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="service-item text-center">
                <div className="icon-wrapper">
                  <i className="ti-world" style={{ fontSize: "2.5rem" }}></i>
                </div>
                <h2>Location Base Search</h2>
                <p>
                  Find opportunities right in your neighborhood or plan your next move. 
                  Search by city, state, or zip code to discover top companies.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="service-item text-center">
                <div className="icon-wrapper">
                  <i className="ti-stats-up" style={{ fontSize: "2.5rem" }}></i>
                </div>
                <h2>Top Careers</h2>
                <p>
                  Take the next step in your professional journey by browsing trending roles. 
                  Get insights into the most sought-after skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="category section bg-gray">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Browse Categories</h2>
          </div>
          <div className="row">
            {categories.map((cat, index) => (
              <div className="col-lg-3 col-md-6 f-category" key={cat.id}>
                <Link to={`/browse-jobs?category=${cat.id}`}>
                  <div className={`icon bg-color-${(index % 8) + 1}`}>
                    {cat.image_path ? (
                      <img
                        src={`${ASSET_URL}/storage/${cat.image_path}`}
                        alt={cat.name}
                        style={{ width: "50px", height: "50px", objectFit: "contain" }}
                      />
                    ) : (
                      <i className="lni-layers"></i>
                    )}
                  </div>
                  <h3>{cat.name}</h3>
                  <p>({cat.jobs_count || 0} jobs)</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section id="latest-jobs" className="section bg-gray">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Latest Jobs</h2>
          </div>
          <div className="row">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div className="col-lg-6 col-md-12" key={job.id}>
                  <div className="jobs-latest">
                    <div className="img-thumb">
                      <img
                        src={
                          job.employer?.company?.logo
                            ? `${ASSET_URL}/storage/${job.employer.company.logo}`
                            : "/portal-assets/assets/img/features/img1.png"
                        }
                        alt="Logo"
                        style={{ width: '60px', height: '60px', borderRadius: '4px' }}
                      />
                    </div>
                    <div className="content">
                      <h3>
                        <Link to={`/job-details/${job.id}`}>{job.title}</Link>
                      </h3>
                      <p className="brand">{job.employer?.company?.name || "Company Name"}</p>
                      <div className="tags">
                        <span>
                          <i className="lni-map-marker"></i> {job.job_location?.name || "Remote"}
                        </span>
                      </div>
                      <span className={job.job_type?.name === "Full Time" ? "full-time" : "part-time"}>
                        {job.job_type?.name || "Job Type"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">No latest jobs found.</div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section bg-gray">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Pricing Plan</h2>
          </div>
          <div className="row g-4 d-flex align-items-stretch"> {/* Forces equal row height */}
            {packages.map((pkg) => (
              <div className="col-lg-3 col-md-6 col-12 d-flex" key={pkg.id}>
                {/* h-100 makes the div fill the column height, d-flex flex-column pushes button to bottom */}
                <div className={`pricing-table shadow-sm h-100 d-flex flex-column border-top-wide ${pkg.borderColorClass || 'border-primary'}`} style={{ width: '100%', background: '#fff', padding: '30px' }}>
                  <div className="pricing-details flex-grow-1"> {/* flex-grow-1 pushes the button div down */}
                    <div className="icon text-center mb-3">
                      <i className={pkg.iconClass} style={{ fontSize: '30px' }}></i>
                    </div>
                    <h2 className="text-center">{pkg.name}</h2>
                    <div className="price text-center mb-3">
                      <span style={{ fontSize: '24px', fontWeight: 'bold' }}>&#2547; {pkg.price}</span>
                    </div>
                    <p className="text-muted text-center small">{pkg.duration_days} Days Validity</p>
                    <ul className="list-unstyled mt-4">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="mb-2 d-flex align-items-start">
                          <i className="lni-check-mark-circle text-success mt-1 mr-2"></i> 
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="plan-button mt-auto pt-4 text-center">
                    <Link to={`/buy-package/${pkg.id}`} className="btn btn-info w-100 fw-bold text-light">
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;