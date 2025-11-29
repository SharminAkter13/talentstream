import React from 'react';

const HeroSection = () => {
    // NOTE: If you need to add state management or handlers for the search form, 
    // you would add them here.
    return (
        <section className="hero-area">
        <div className="container">
            <div className="row space-100 justify-content-center">
                <div className="col-lg-10 col-md-12 col-xs-12">
                    <div className="contents">
                        <h2 className="head-title">Find the job that fits your life</h2>
                        <p>Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus, <br /> id tincidunt nisi porta sit amet. Suspendisse et sapien varius, pellentesque dui non.</p>
                        <div className="job-search-form">
                            {/* Search Form - Consider making this a separate component for cleaner code */}
                            <form>
                                <div className="row">
                                    <div className="col-lg-5 col-md-6 col-xs-12">
                                        <div className="form-group">
                                            <input className="form-control" type="text" placeholder="Job Title or Company Name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-xs-12">
                                        <div className="form-group">
                                            <div className="search-category-container">
                                                <label className="styled-select">
                                                    <select>
                                                        <option value="none">Locations</option>
                                                        <option value="New York">New York</option>
                                                        <option value="California">California</option>
                                                        <option value="Washington">Washington</option>
                                                        <option value="Birmingham">Birmingham</option>
                                                        <option value="Chicago">Chicago</option>
                                                        <option value="Phoenix">Phoenix</option>
                                                    </select>
                                                </label>
                                            </div>
                                            <i className="lni-map-marker"></i>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-xs-12">
                                        <div className="form-group">
                                            <div className="search-category-container">
                                                <label className="styled-select">
                                                    <select>
                                                        <option value="">All Categories</option>
                                                        <option value="Finance">Finance</option>
                                                        <option value="IT & Engineering">IT & Engineering</option>
                                                        <option value="Education/Training">Education/Training</option>
                                                        <option value="Art/Design">Art/Design</option>
                                                        <option value="Sale/Markting">Sale/Markting</option>
                                                        <option value="Healthcare">Healthcare</option>
                                                        <option value="Science">Science</option>
                                                        <option value="Food Services">Food Services</option>
                                                    </select>
                                                </label>
                                            </div>
                                            <i className="lni-layers"></i>
                                        </div>
                                    </div>
                                    <div className="col-lg-1 col-md-6 col-xs-12">
                                        <button type="submit" className="button"><i className="lni-search"></i></button>
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