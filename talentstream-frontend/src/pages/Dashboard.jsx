import React, { Component } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";
import Chart from "react-apexcharts"; // Fixed import
import api from "../services/auth";

/* ---------------- CHART ERROR BOUNDARY ---------------- */
class ChartErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Chart Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-warning text-center">
          Chart failed to load
        </div>
      );
    }
    return this.props.children;
  }
}

/* ---------------- DASHBOARD ---------------- */
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      dashboardData: null,
    };
  }

  componentDidMount() {
    this.fetchDashboardData();
  }

  async fetchDashboardData() {
    try {
      const response = await api.get("/admin/dashboard");

      this.setState({
        dashboardData: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to connect to server",
        loading: false,
      });
    }
  }

  render() {
    const { loading, error, dashboardData } = this.state;

    if (loading) {
      return (
        <div className="p-5 text-center">
          <h3>Loading Dashboard...</h3>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger m-5">
          <h4>Error</h4>
          <p>{error}</p>
        </div>
      );
    }

    if (!dashboardData) {
      return (
        <div className="alert alert-warning m-5">
          No dashboard data available
        </div>
      );
    }

    const metrics = dashboardData.metrics || {};
    const charts = dashboardData.charts || {};

    /* -------- SAFE VALIDATIONS -------- */
    const validBar =
      charts.barChart &&
      charts.barChart.labels?.length &&
      charts.barChart.data?.length;

    const validPie =
      charts.pieChart &&
      charts.pieChart.labels?.length &&
      charts.pieChart.data?.length &&
      charts.pieChart.labels.length === charts.pieChart.data.length;

    const validLine =
      charts.lineChart &&
      charts.lineChart.labels?.length &&
      charts.lineChart.data?.length;

    return (
      <div className="wrapper">
        <Navbar />
        <Sidebar />

        <div className="main-container">
          <div className="pd-ltr-20">
            <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">
              <h2 className="text-center mb-4">Admin Dashboard</h2>

              {/* ---------------- METRICS ---------------- */}
              <div className="row mb-4">
                <div className="col-md-3">
                  <div className="card bg-primary text-white text-center">
                    <div className="card-body">
                      <h6>Total Jobs</h6>
                      <h3>{metrics.total_jobs ?? 0}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card bg-success text-white text-center">
                    <div className="card-body">
                      <h6>Total Applications</h6>
                      <h3>{metrics.total_applications ?? 0}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card bg-warning text-white text-center">
                    <div className="card-body">
                      <h6>Total Candidates</h6>
                      <h3>{metrics.total_candidates ?? 0}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card bg-info text-white text-center">
                    <div className="card-body">
                      <h6>Total Companies</h6>
                      <h3>{metrics.total_companies ?? 0}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------- CHARTS ---------------- */}
              <div className="row">

                {validBar && (
                  <div className="col-md-6 mb-4">
                    <ChartErrorBoundary>
                      <Chart
                        type="bar"
                        height={300}
                        series={[
                          {
                            name: "Applications",
                            data: charts.barChart.data.map(Number),
                          },
                        ]}
                        options={{
                          chart: { type: "bar" },
                          xaxis: {
                            categories: charts.barChart.labels,
                          },
                        }}
                      />
                    </ChartErrorBoundary>
                  </div>
                )}

                {validPie && (
                  <div className="col-md-6 mb-4">
                    <ChartErrorBoundary>
                      <Chart
                        type="pie"
                        height={300}
                        series={charts.pieChart.data.map(Number)}
                        options={{
                          chart: { type: "pie" },
                          labels: charts.pieChart.labels,
                          colors: charts.pieChart.colors,
                        }}
                      />
                    </ChartErrorBoundary>
                  </div>
                )}

                {validLine && (
                  <div className="col-md-12 mb-4">
                    <ChartErrorBoundary>
                      <Chart
                        type="line"
                        height={300}
                        series={[
                          {
                            name: "Jobs Posted",
                            data: charts.lineChart.data.map(Number),
                          },
                        ]}
                        options={{
                          chart: { type: "line" },
                          xaxis: {
                            categories: charts.lineChart.labels,
                          },
                        }}
                      />
                    </ChartErrorBoundary>
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
