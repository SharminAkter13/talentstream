import React, { Component } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";
import ReactApexChart from 'react-apexcharts';
import api from "../services/auth"; 

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      dashboardData: {
        metrics: { total_jobs: 0, total_applications: 0, total_candidates: 0, total_companies: 0 },
        charts: {
          barChart: { labels: [], data: [] },
          pieChart: { labels: [], data: [], colors: [] },
          lineChart: { labels: [], data: [] },
        },
      },
    };
  }

  componentDidMount() {
    this.fetchDashboardData();
  }

  async fetchDashboardData() {
    try {
      // Connects to the index() method in AdminDashboardController.php
      const response = await api.get("/admin/dashboard");
      this.setState({
        dashboardData: {
          metrics: response.data.metrics,
          charts: response.data.charts,
        },
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: error.response?.data?.message || "Failed to load admin data",
        loading: false,
      });
    }
  }

  // Chart configurations mapping to your Controller's JSON output
  getBarChartOptions = () => ({
    chart: { type: 'bar' },
    xaxis: { categories: this.state.dashboardData.charts.barChart.labels },
    title: { text: 'Applications Per Month', align: 'center' },
    colors: ['#007bff']
  });

  getPieChartOptions = () => ({
    chart: { type: 'pie' },
    labels: this.state.dashboardData.charts.pieChart.labels,
    legend: { position: 'bottom' },
    title: { text: 'Top Candidate Skills', align: 'center' },
  });

  getLineChartOptions = () => ({
    chart: { type: 'line' },
    stroke: { curve: 'smooth' },
    xaxis: { categories: this.state.dashboardData.charts.lineChart.labels },
    title: { text: 'Job Postings Trend (Weekly)', align: 'center' },
  });

  render() {
    const { loading, error, dashboardData } = this.state;
    const { metrics } = dashboardData;

    if (loading) return <div className="text-center p-5"><h3>Loading Admin Panel...</h3></div>;

    return (
      <div className="wrapper">
        <Navbar />
        <Sidebar />
        <div className="main-container">
          <div className="pd-ltr-20">
            <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">
              <h2 className="text-center mb-4">Admin System Overview</h2>

              {/* Dynamic Metric Cards from AdminDashboardController */}
              <div className="row mb-4">
                <div className="col-md-3">
                  <div className="card text-white bg-primary mb-3">
                    <div className="card-body">
                      <h6>Total Jobs</h6>
                      <h3>{metrics.total_jobs}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white bg-success mb-3">
                    <div className="card-body">
                      <h6>Total Applications</h6>
                      <h3>{metrics.total_applications}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white bg-warning mb-3">
                    <div className="card-body">
                      <h6>Total Candidates</h6>
                      <h3>{metrics.total_candidates}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white bg-danger mb-3">
                    <div className="card-body">
                      <h6>Total Companies</h6>
                      <h3>{metrics.total_companies}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <ReactApexChart 
                    options={this.getBarChartOptions()} 
                    series={[{ name: 'Apps', data: dashboardData.charts.barChart.data }]} 
                    type="bar" height={300} 
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <ReactApexChart 
                    options={this.getPieChartOptions()} 
                    series={dashboardData.charts.pieChart.data} 
                    type="pie" height={300} 
                  />
                </div>
                <div className="col-md-12">
                  <ReactApexChart 
                    options={this.getLineChartOptions()} 
                    series={[{ name: 'Jobs', data: dashboardData.charts.lineChart.data }]} 
                    type="line" height={300} 
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;