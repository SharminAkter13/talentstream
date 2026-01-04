import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHomePortalData, ASSET_URL } from "../services/auth";
import HeroSection from "./../portalComponent/HeroSection";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load categories and jobs
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const response = await getHomePortalData();
        setCategories(response.categories || []);
        setJobs(response.jobs || []);
      } catch (err) {
        console.error("Home data load error", err);
        setCategories([]);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  // Load packages
useEffect(() => {
  const fetchPackages = async () => {
    try {
      const res = await api.get("/admin/packages"); // <-- use axios instance
      setPackages(res.data.data || res.data || []); // depends if Laravel returns paginated or array
    } catch (err) {
      console.error("Error fetching packages", err);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  fetchPackages();
}, []);

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div>
      <HeroSection />

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
                  Explore a vast database of career opportunities across every
                  industry. Our intelligent filters help you find the perfect
                  role tailored to your expertise and career goals in seconds.
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
                  Find opportunities right in your neighborhood or plan your next
                  big move. Search by city, state, or zip code to discover
                  top-rated companies hiring near you.
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
                  Take the next step in your professional journey by browsing
                  trending roles and high-growth industries. Get insights into
                  the most sought-after skills and highest-paying positions
                  available today.
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
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
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
            {jobs.map((job) => (
              <div className="col-lg-6 col-md-12" key={job.id}>
                <div className="jobs-latest">
                  <div className="img-thumb">
                    <img
                      src={
                        job.company_logo
                          ? `${ASSET_URL}/storage/${job.company_logo}`
                          : "/portal-assets/assets/img/features/img1.png"
                      }
                      alt="Logo"
                    />
                  </div>
                  <div className="content">
                    <h3>
                      <Link to={`/job-details/${job.id}`}>{job.title}</Link>
                    </h3>
                    <p className="brand">{job.company_name}</p>
                    <div className="tags">
                      <span>
                        <i className="lni-map-marker"></i> {job.location}
                      </span>
                    </div>
                    <span
                      className={job.type === "Full Time" ? "full-time" : "part-time"}
                    >
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section bg-gray">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Pricing Plan</h2>
          </div>
          <div className="row g-4">
            {packages.map((pkg) => (
              <div className="col-lg-4 col-md-6 col-12" key={pkg.id}>
                <div className={`pricing-table ${pkg.borderColorClass}`}>
                  <div className="pricing-details">
                    <div className="icon">
                      <i className={pkg.iconClass}></i>
                    </div>
                    <h2>{pkg.name}</h2>
                    <ul>
                      {pkg.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <div className="price">
                      <span>$</span>
                      {pkg.price}
                      <span>/Month</span>
                    </div>
                  </div>
                  <div className="plan-button">
                    <Link to={`/buy-package/${pkg.id}`} className="btn btn-border">
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
