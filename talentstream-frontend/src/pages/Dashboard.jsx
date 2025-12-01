import React, { Component } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      dashboardData: {
        metrics: {
          total_jobs: 0,
          total_applications: 0,
          total_candidates: 0,
          total_companies: 0,
        },
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
    const token = localStorage.getItem("token"); // Get token from login

    if (!token) {
      this.setState({ error: "No authentication token found", loading: false });
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json", // Ensure API returns JSON
          },
        }
      );

      const data = response.data;

      this.setState({
        dashboardData: {
          metrics: data.metrics,
          charts: data.charts,
        },
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Handle Laravel API errors (unauthenticated, forbidden, etc.)
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      this.setState({ error: errorMessage, loading: false });
    }
  }

  // Chart Options
  getBarChartOptions = () => ({
    chart: { type: 'bar' },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: this.state.dashboardData.charts.barChart.labels },
    title: { text: 'Applications Per Month' },
  });

  getPieChartOptions = () => ({
    chart: { type: 'pie' },
    labels: this.state.dashboardData.charts.pieChart.labels,
    colors: this.state.dashboardData.charts.pieChart.colors,
    legend: { position: 'bottom' },
    title: { text: 'Top Candidate Skills' },
  });

  getLineChartOptions = () => ({
    chart: { type: 'line' },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: { categories: this.state.dashboardData.charts.lineChart.labels },
    title: { text: 'Job Postings Trend' },
  });

  render() {
    const { loading, error, dashboardData } = this.state;
    const metrics = dashboardData.metrics;

    if (loading) {
      return (
        <div className="main-container text-center pt-5">
          <h2>Loading Dashboard Data...</h2>
        </div>
      );
    }

    if (error) {
      return (
        <div className="main-container text-center pt-5">
          <h2 style={{ color: "red" }}>Error: {error}</h2>
        </div>
      );
    }

    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="main-container">
          <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
              <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">
                <main className="flex-grow-1 p-4 bg-light">
                  <div className="container">
                    <h1 className="text-center mb-4">Dashboard Overview</h1>

                    {/* Metric Cards */}
                    <div className="row mb-4">
                      <div className="col-md-3 mb-3">
                        <div className="card text-white bg-primary h-100">
                          <div className="card-body">
                            <h5 className="card-title">Total Jobs</h5>
                            <p className="card-text display-6">{metrics.total_jobs}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="card text-white bg-success h-100">
                          <div className="card-body">
                            <h5 className="card-title">Total Applications</h5>
                            <p className="card-text display-6">{metrics.total_applications}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="card text-white bg-warning h-100">
                          <div className="card-body">
                            <h5 className="card-title">Total Candidates</h5>
                            <p className="card-text display-6">{metrics.total_candidates}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="card text-white bg-danger h-100">
                          <div className="card-body">
                            <h5 className="card-title">Total Companies</h5>
                            <p className="card-text display-6">{metrics.total_companies}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Charts */}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <ReactApexChart
                          options={this.getBarChartOptions()}
                          series={[{ name: 'Applications', data: dashboardData.charts.barChart.data }]}
                          type="bar"
                          height={300}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <ReactApexChart
                          options={this.getPieChartOptions()}
                          series={dashboardData.charts.pieChart.data}
                          type="pie"
                          height={300}
                        />
                      </div>
                      <div className="col-md-12 mb-4">
                        <ReactApexChart
                          options={this.getLineChartOptions()}
                          series={[{ name: 'Jobs Posted', data: dashboardData.charts.lineChart.data }]}
                          type="line"
                          height={350}
                        />
                      </div>
                    </div>
                  </div>
                </main>
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
