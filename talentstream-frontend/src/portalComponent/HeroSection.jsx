import React, { useState } from 'react';

// HeroSection receives data as props now
const HeroSection = ({ categories, locations }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Redirect to /browse-jobs with query params
        window.location.href = `/browse-jobs?q=${searchQuery}&location=${selectedLocation}&category=${selectedCategory}`;
    };

    return (
        <section className="hero-area mt-5">
            <div className="container mt-5">
                <div className="row space-100 justify-content-center">
                    <div className="col-lg-10 col-md-12 col-xs-12">
                        <div className="contents text-center">
                            <h2 className="head-title">Find the job that fits your life</h2>
                            <p>Browse through thousands of opportunities in your favorite industry.</p>
                            <div className="job-search-form mt-4">
                                <form onSubmit={handleSearch}>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-xs-12">
                                            <input type="text" className="form-control" placeholder="Job Title or Keyword" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-xs-12">
                                            <select className="form-control" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                                                <option value="">All Locations</option>
                                                {locations?.map(loc => (
                                                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-xs-12">
                                            <select className="form-control" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                                <option value="">All Categories</option>
                                                {categories?.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-2 col-md-6 col-xs-12">
                                            <button type="submit" className="button btn-block"><i className="lni-search"></i> Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;