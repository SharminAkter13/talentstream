import React from "react";
import PortalFooter from './../../portalComponent/PortalFooter';
import PortalNavbar from './../../portalComponent/PortalNavbar';

const categories = [
  { icon: "ti-home", name: "Finance", jobs: 4286 },
  { icon: "ti-world", name: "Sales/Marketing", jobs: 2000 },
  { icon: "ti-book", name: "Education/Training", jobs: 1450 },
  { icon: "ti-desktop", name: "Technologies", jobs: 5100 },
  { icon: "ti-brush", name: "Art/Design", jobs: 5079 },
  { icon: "ti-heart", name: "Healthcare", jobs: 3235 },
  { icon: "ti-filter", name: "Science", jobs: 1800 },
  { icon: "ti-cup", name: "Food Services", jobs: 4286 },
];

const allCategories = [
  {
    title: "Business",
    subCount: 33,
    subCategories: [
      ["Accounting & Finance", "Asset Management", "Capital Markets", "Commercial Banking", "Commodities", "Consulting", "Corporate", "Credit"],
      ["Debt/Fixed Income", "Derivatives", "Equities", "FX & Money Markets", "Global Custody", "Government", "Graduates & Internships", "Hedge Funds"],
      ["Information Services", "Insurance", "Investment Consulting", "Investment Banking", "Islamic Finance", "Operations", "Private Banking & Wealth Management", "Private Equity & Venture Capital"],
      ["Quantitative Analytics", "Real Estate", "Research", "Retail Banking", "Risk Management", "Trading"]
    ]
  },
  {
    title: "Science",
    subCount: 34,
    subCategories: [
      ["Aeronautical Engineering","Aerospace Engineering","Algorithm","Biology","Broadcast Engineering","Circuit Design","Civil Engineering","Clean Technology","Construction Monitoring"],
      ["Climate Sciences","Cryptography","Data Mining","Data Science","Digital Design","Drones","Electrical Engineering","Electronics","Engineering"],
      ["Geology","Human Science","Imaging","Industrial Engineering","Instrumentation","Machine Learning","Mathematics","Mechanical Engineering","Medical"],
      ["Nanotechnology","Natural Language","Physics","Quantum","Remote Sensing","Robotics","Statistics","Wireless"]
    ]
  },
  {
    title: "Sales & Marketing",
    subCount: 21,
    subCategories: [
      ["Display Advertising","Email Marketing","Lead Generation","Market & Customer Research"],
      ["Marketing Strategy","Public Relations","Telemarketing & Telesales","Other - Sales & Marketing"],
      ["SEM - Search Engine Marketing","SEO - Search Engine Optimization","SMM - Social Media Marketing"],
      ["Climate Sciences","Cryptography","Data Mining","Digital Design"]
    ]
  }
];

const BrowseCategories = () => {
  return (
    <>
      <PortalNavbar />

      {/* Featured Categories */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Browse Categories</h2>
          <div className="row">
            {categories.map((cat, idx) => (
              <div key={idx} className="col-md-3 col-sm-3 col-xs-12 f-category">
                <a href="/browse-categories">
                  <div className="icon">
                    <i className={cat.icon}></i>
                  </div>
                  <h3>{cat.name}</h3>
                  <p>{cat.jobs} jobs</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Categories */}
      <section className="all-categories section">
        <div className="container">
          <h2 className="section-title">Browse All Categories</h2>
          <div className="row">
            {allCategories.map((cat, idx) => (
              <React.Fragment key={idx}>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <h3 className="cat-title">{cat.title} <span>({cat.subCount} Sub Categories)</span></h3>
                </div>
                {cat.subCategories.map((subList, i) => (
                  <div key={i} className="col-md-3 col-sm-6 col-xs-12">
                    <ul>
                      {subList.map((sub, j) => (
                        <li key={j}><a href="#">{sub}</a></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <PortalFooter />
    </>
  );
};

export default BrowseCategories;
