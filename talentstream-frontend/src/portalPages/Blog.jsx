import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
     
 
<div>
  {/* Page Header Start */}
  <div className="page-header" style={{background: 'url(assets/img/banner1.jpg)'}}>
    <div className="container">
      <div className="row">         
        <div className="col-md-12">
          <div className="breadcrumb-wrapper">
            <h2 className="product-title">Blog</h2>
            <ol className="breadcrumb">
              <li><Link to="/"><i className="ti-home" /> Home</Link></li>
              <li className="current">Blog</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Page Header End */}    
  {/* Start Content */}
  <div id="content">
    <div className="container">
      <div className="row">
        {/* Start Blog Posts */}
        <div className="col-md-9">             
          {/* Start Post */}
          <div className="blog-post">
            {/* Post thumb */}
            <div className="post-thumb">
              <Link to="#"><img src="portal-assets/Linkssets/img/blog/blog1.jpg" alt /></Link>
              <div className="hover-wrap">
              </div>
            </div>
            {/* End Post post-thumb */}
            {/* Post author */}
            <div className="blog-author">
              <img src="portal-assets/Linkssets/img/blog/Linkuthor.jpg" alt />
            </div>
            {/* Post End */}
            {/* Post Content */}
            <div className="post-content">                     
              <h3 className="post-title"><Link to="#">Let's explore 5 cool new features in JobBoard theme</Link></h3>
              <div className="meta">                    
                <span className="meta-part"><Link to="#"><i className="ti-user" /> By Admin</Link></span>
                <span className="meta-part"><i className="ti-calendar" /><Link to="#"> 20.02.2018</Link></span>
                <span className="meta-part"><Link to="#"><i className="ti-comment-alt" /> 5Comments</Link></span>                    
              </div>
              <p>Fusce fermentum ipsum mauris, rutrum ultrices ligula sodales et. Maecenas pellentesque aliquet arcu, vel elementum magna facilisis vitae. Nam in cursus lorem. Donec ac tellus nisl. Sed volutpat quis orci nec placerat. Fusec ex magna, congue sed vulpu-tate rhoncus, laoreet nec sapien.</p>
              <Link to="#" className="btn btn-common">Read More</Link>
            </div>
            {/* Post Content */}
          </div>
          {/* End Post */}
          {/* Start Post */}
          <div className="blog-post">
            {/* Post thumb */}
            <div className="post-thumb">
              <Link to="#"><img src="assets/img/blog/blog2.jpg" alt /></Link>
              <div className="hover-wrap">
              </div>
            </div>
            {/* End Post post-thumb */}
            {/* Post author */}
            <div className="blog-author">
              <img src="assets/img/blog/Linkuthor.jpg" alt />
            </div>
            {/* Post End */}
            {/* Post Content */}
            <div className="post-content">                     
              <h3 className="post-title"><Link to="#">Employer branding: Get behind the wheel!</Link></h3>
              <div className="meta">                    
                <span className="meta-part"><Link to="#"><i className="ti-user" /> By Admin</Link></span>
                <span className="meta-part"><i className="ti-calendar" /><Link to="#"> 20.02.2018</Link></span>
                <span className="meta-part"><Link to="#"><i className="ti-comment-alt" /> 5Comments</Link></span>                    
              </div>
              <p>Fusce fermentum ipsum mauris, rutrum ultrices ligula sodales et. Maecenas pellentesque aliquet arcu, vel elementum magna facilisis vitae. Nam in cursus lorem. Donec ac tellus nisl. Sed volutpat quis orci nec placerat. Fusec ex magna, congue sed vulpu-tate rhoncus, laoreet nec sapien.</p>
              <Link to="#" className="btn btn-common">Read More</Link>
            </div>
            {/* Post Content */}
          </div>
          {/* End Post */}
          {/* Start Post */}
          <div className="blog-post">
            {/* Post thumb */}
            <div className="post-thumb">
              <Link to="#"><img src="assets/img/blog/blog3.jpg" alt /></Link>
              <div className="hover-wrap">
              </div>
            </div>
            {/* End Post post-thumb */}
            {/* Post author */}
            <div className="blog-author">
              <img src="assets/img/blog/Linkuthor.jpg" alt />
            </div>
            {/* Post End */}
            {/* Post Content */}
            <div className="post-content">                     
              <h3 className="post-title"><Link to="#">How to convince recruiters and get your dream job</Link></h3>
              <div className="meta">                    
                <span className="meta-part"><Link to="#"><i className="ti-user" /> By Admin</Link></span>
                <span className="meta-part"><i className="ti-calendar" /><Link to="#"> 20.02.2018</Link></span>
                <span className="meta-part"><Link to="#"><i className="ti-comment-alt" /> 5Comments</Link></span>                    
              </div>
              <p>Fusce fermentum ipsum mauris, rutrum ultrices ligula sodales et. Maecenas pellentesque aliquet arcu, vel elementum magna facilisis vitae. Nam in cursus lorem. Donec ac tellus nisl. Sed volutpat quis orci nec placerat. Fusec ex magna, congue sed vulpu-tate rhoncus, laoreet nec sapien.</p>
              <Link to="#" className="btn btn-common">Read More</Link>
            </div>
            {/* Post Content */}
          </div>
          {/* End Post */}              
          {/* Start Pagination */}
          <ul className="pagination">              
            <li className="active"><Link to="#" className="btn btn-common"><i className="ti-angle-left" /> prev</Link></li>
            <li><Link to="#">1</Link></li>
            <li><Link to="#">2</Link></li>
            <li><Link to="#">3</Link></li>
            <li><Link to="#">4</Link></li>
            <li><Link to="#">5</Link></li>
            <li className="active"><Link to="#" className="btn btn-common">Next <i className="ti-angle-right" /></Link></li>
          </ul>
          {/* End Pagination */}
        </div>
        {/* End Blog Posts */}
        {/*Sidebar*/}
        <aside id="sidebar" className="col-md-3 right-sidebar">
          {/* Search Widget */}
          <div className="widget widget-search">
            <h5 className="widget-title">Search This Site</h5>
            <form action="#">
              <input className="form-control search" type="search" placeholder="Enter your keyword" />
              <button className="search-btn" type="submit"><i className="fa fa-search" /></button>
            </form>
          </div>
          {/* Categories Widget */}
          <div className="widget widget-categories">
            <h5 className="widget-title">Categories</h5>
            <ul className="cat-list">
              <li>
                <Link to="#">Announcement <span className="num-posts">(4)</span></Link>                    
              </li>
              <li>
                <Link to="#">Indeed Events <span className="num-posts">(2)</span></Link>                    
              </li>
              <li>
                <Link to="#">Tips &amp; Tricks <span className="num-posts">(3)</span></Link>                    
              </li>
              <li>
                <Link to="#">Experiences <span className="num-posts">(5)</span></Link>                    
              </li>
              <li>
                <Link to="#">Case Studies <span className="num-posts">(6)</span></Link>                    
              </li>
              <li>
                <Link to="#">Labor Market News <span className="num-posts">(9)</span></Link>                    
              </li>
              <li>
                <Link to="#">HR Best Practices <span className="num-posts">(17)</span></Link>                   
              </li>
            </ul>
          </div>
          {/* Popular Posts widget */}
          <div className="widget widget-popular-posts">
            <h5 className="widget-title">Recent Post</h5>
            <ul className="posts-list">
              <li>
                <div className="widget-content">
                  <Link to="#">Tips to write an impressive resume online for beginner</Link>
                  <span><i className="icon-calendar" /> 25 March, 2018</span>
                </div>
                <div className="clearfix" />
              </li>
              <li>
                <div className="widget-content">
                  <Link to="#">The sceret to pitching for new business</Link>
                  <span><i className="icon-calendar" /> 25 March, 2018</span>
                </div>
                <div className="clearfix" />
              </li>
              <li>
                <div className="widget-content">
                  <Link to="#">7 things you should never say to your boss</Link>
                  <span><i className="icon-calendar" /> 25 March, 2018</span>
                </div>
                <div className="clearfix" />
              </li>
            </ul>
          </div>
          {/* Tag Media */}
          <div className="widget tag">
            <h5 className="widget-title">Tags</h5>
            <Link to="#"> Jobpress</Link>
            <Link to="#"> Recruiter</Link>
            <Link to="#"> Interview</Link> 
            <Link to="#"> Employee</Link>                                 
            <Link to="#"> Labor</Link>
            <Link to="#"> HR</Link>
            <Link to="#"> Salary</Link>
            <Link to="#"> Employer</Link>
          </div> 
          {/* Archives Widget */}
          <div className="widget widget-archives">
            <h5 className="widget-title">Archives</h5>
            <ul className="cat-list">
              <li>
                <Link to="#">October 2016 <span className="num-posts">(29)</span></Link>                    
              </li>
              <li>
                <Link to="#">September 2016 <span className="num-posts">(34)</span></Link>                    
              </li>
              <li>
                <Link to="#">August 2016 <span className="num-posts">(23)</span></Link>                    
              </li>
              <li>
                <Link to="#">July 2016 <span className="num-posts">(38)</span></Link>                    
              </li>
              <li>
                <Link to="#">June 2016 <span className="num-posts">(16)</span></Link>                    
              </li>
              <li>
                <Link to="#">May 2016 <span className="num-posts">(14)</span></Link>                    
              </li>
              <li>
                <Link to="#">April 2016 <span className="num-posts">(17)</span></Link>                   
              </li>
            </ul>
          </div>
       
        {/*End sidebar*/}
        </aside>
      </div>
    </div>
  </div>
  {/* End Content */}  
</div>
    );
};

export default Blog;