import React, { useState, useEffect } from 'react';

const HeroSection = () => {
    // State for dropdown data
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    
    // State for form inputs
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Fetch dynamic data from your backend API
    useEffect(() => {
        // Replace these URLs with your actual Laravel API endpoints
        const fetchDropdownData = async () => {
            try {
                const [catRes, locRes] = await Promise.all([
                    fetch('http://your-api.com/api/categories'),
                    fetch('http://your-api.com/api/locations')
                ]);
                const categoriesData = await catRes.json();
                const locationsData = await locRes.json();
                
                setCategories(categoriesData);
                setLocations(locationsData);
            } catch (error) {
                console.error("Error fetching dynamic data:", error);
            }
        };

        fetchDropdownData();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", { searchQuery, selectedLocation, selectedCategory });
        // Implement your search redirection or API call here
    };

    return (
        <section className="hero-area mt-5">
            <div className="container mt-5">
                <div className="row space-100 justify-content-center">
                    <div className="col-lg-10 col-md-12 col-xs-12">
                        <div className="contents">
                            <h2 className="head-title">Find the job that fits your life</h2>
                            <p>Browse through thousands of opportunities in your favorite industry.</p>
                            <div className="job-search-form">
                                <form onSubmit={handleSearch}>
                                    <div className="row">
                                        {/* Job Title / Keyword Input */}
                                        <div className="col-lg-5 col-md-6 col-xs-12">
                                            <div className="form-group">
                                                <input 
                                                    className="form-control" 
                                                    type="text" 
                                                    placeholder="Job Title or Company Name"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Dynamic Locations Dropdown */}
                                        <div className="col-lg-3 col-md-6 col-xs-12">
                                            <div className="form-group">
                                                <div className="search-category-container">
                                                    <label className="styled-select">
                                                        <select 
                                                            value={selectedLocation} 
                                                            onChange={(e) => setSelectedLocation(e.target.value)}
                                                        >
                                                            <option value="">All Locations</option>
                                                            {locations.map(loc => (
                                                                <option key={loc.id} value={loc.city}>
                                                                    {loc.city}, {loc.state}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </label>
                                                </div>
                                                <i className="lni-map-marker"></i>
                                            </div>
                                        </div>

                                        {/* Dynamic Categories Dropdown */}
                                        <div className="col-lg-3 col-md-6 col-xs-12">
                                            <div className="form-group">
                                                <div className="search-category-container">
                                                    <label className="styled-select">
                                                        <select 
                                                            value={selectedCategory} 
                                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                                        >
                                                            <option value="">All Categories</option>
                                                            {categories.map(cat => (
                                                                <option key={cat.id} value={cat.id}>
                                                                    {cat.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </label>
                                                </div>
                                                <i className="lni-layers"></i>
                                            </div>
                                        </div>

                                        <div className="col-lg-1 col-md-6 col-xs-12">
                                            <button type="submit" className="button">
                                                <i className="lni-search"></i>
                                            </button>
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