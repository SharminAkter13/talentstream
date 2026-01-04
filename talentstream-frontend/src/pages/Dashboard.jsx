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
      dashboardData: null, // Start as null to detect when data arrives
    };
  }

  componentDidMount() {
    this.fetchDashboardData();
  }

  async fetchDashboardData() {
    try {
      // Log exactly what URL we are hitting
      console.log("Fetching from: /admin/dashboard");
      
      const response = await api.get("/admin/dashboard");
      console.log("Full API Response:", response);

      if (response.data) {
        this.setState({
          dashboardData: response.data,
          loading: false,
          error: null
        });
      } else {
        throw new Error("Response success but no data found");
      }
    } catch (error) {
      console.error("Dashboard API Error:", error);
      this.setState({
        error: error.response?.data?.message || error.message || "Failed to connect to server",
        loading: false,
      });
    }
  }

  render() {
    const { loading, error, dashboardData } = this.state;

    // --- DEBUG HELPERS ---
    if (loading) return <div className="p-5 text-center"><h3>Checking API Connection...</h3></div>;
    
    if (error) return (
        <div className="alert alert-danger m-5">
            <h4>Connection Error</h4>
            <p>{error}</p>
            <small>Check if your Laravel server is running at 127.0.0.1:8000</small>
        </div>
    );

    // If we reach here, loading is false and error is null. 
    // If dashboardData is still null, the API returned nothing.
    if (!dashboardData) return <div className="alert alert-warning m-5">API returned empty data.</div>;

    // Safely extract variables from the now-confirmed dashboardData
    const metrics = dashboardData.metrics || {};
    const charts = dashboardData.charts || {};

    return (
      <div className="wrapper">
        <Navbar />
        <Sidebar />
        <div className="main-container">
          <div className="pd-ltr-20">
            <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">
              <h2 className="text-center mb-4">Admin System Overview</h2>

              {/* Metrics */}
              <div className="row mb-4">
                <div className="col-md-3">
                  <div className="card text-white bg-primary mb-3 text-center">
                    <div className="card-body">
                      <h6>Total Jobs</h6>
                      <h3>{metrics.total_jobs ?? 0}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white bg-success mb-3 text-center">
                    <div className="card-body">
                      <h6>Total Applications</h6>
                      <h3>{metrics.total_applications ?? 0}</h3>
                    </div>
                  </div>
                </div>
                {/* ... other metric cards ... */}
              </div>

              {/* Charts */}
              <div className="row">
                {charts.barChart && (
                  <div className="col-md-6 mb-4">
                    <ReactApexChart 
                      options={{
                        chart: { type: 'bar' },
                        xaxis: { categories: charts.barChart.labels || [] }
                      }} 
                      series={[{ name: 'Apps', data: charts.barChart.data || [] }]} 
                      type="bar" height={300} 
                    />
                  </div>
                )}
                
                {charts.pieChart && (
                  <div className="col-md-6 mb-4">
                    <ReactApexChart 
                      options={{
                        chart: { type: 'pie' },
                        labels: charts.pieChart.labels || []
                      }} 
                      series={charts.pieChart.data || []} 
                      type="pie" height={300} 
                    />
                  </div>
                )}
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