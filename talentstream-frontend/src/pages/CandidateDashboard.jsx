import React, { Component } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";

class Dashboard extends Component {
  componentDidMount() {
    this.drawBarChart();
    this.drawPieChart();
    this.drawLineChart();
  }

  drawBarChart() {
    const canvas = document.getElementById("barChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const data = [10, 20, 15, 30, 25, 40];

    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / data.length - 20;

    ctx.clearRect(0, 0, width, height);
    ctx.font = "14px Arial";
    ctx.textAlign = "center";

    data.forEach((value, index) => {
      const x = index * (barWidth + 20) + 10;
      const y = height - value * 5;
      ctx.fillStyle = "blue";
      ctx.fillRect(x, y, barWidth, value * 5);
      ctx.fillStyle = "black";
      ctx.fillText(labels[index], x + barWidth / 2, height - 5);
    });
  }

  drawPieChart() {
    const canvas = document.getElementById("pieChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const data = [30, 40, 20, 10];
    const colors = ["red", "green", "blue", "orange"];
    const labels = ["JavaScript", "Python", "PHP", "Java"];
    const total = data.reduce((a, b) => a + b, 0);

    let startAngle = 0;
    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      ctx.fillStyle = colors[index];
      ctx.beginPath();
      ctx.moveTo(150, 100); // center
      ctx.arc(150, 100, 100, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      // Labels
      const midAngle = startAngle + sliceAngle / 2;
      const labelX = 150 + Math.cos(midAngle) * 70;
      const labelY = 100 + Math.sin(midAngle) * 70;
      ctx.fillStyle = "black";
      ctx.fillText(labels[index], labelX, labelY);

      startAngle += sliceAngle;
    });
  }

  drawLineChart() {
    const canvas = document.getElementById("lineChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const data = [5, 15, 10, 20, 25, 30];
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "purple";
    ctx.lineWidth = 2;

    ctx.beginPath();
    data.forEach((point, index) => {
      const x = (index * width) / (data.length - 1);
      const y = height - point * 5;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  render() {
    return (
              <div>
            {/* Navbar */}
            <Navbar/>
            {/* Sidebar */}
            <Sidebar/>
  <div className="main-container">
    <div className="pd-ltr-20 xs-pd-20-10">
      <div className="min-height-200px">
        <div className="page-header">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="title">
                <h4>blank</h4>
              </div>
              <nav aria-label="breadcrumb" role="navigation">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">blank</li>
                </ol>
              </nav>
            </div>
            
          </div>
        </div>
        <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">

          <main className="flex-grow-1 p-4 bg-light">
            <div className="container">
              <h1 className="text-center mb-4">Dashboard Overview</h1>

              <div className="row mb-4">
                <div className="col-md-3 mb-3">
                  <div className="card text-white bg-primary h-100">
                    <div className="card-body">
                      <h5 className="card-title">Total Jobs</h5>
                      <p className="card-text display-6">120</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-white bg-success h-100">
                    <div className="card-body">
                      <h5 className="card-title">Total Applications</h5>
                      <p className="card-text display-6">350</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-white bg-warning h-100">
                    <div className="card-body">
                      <h5 className="card-title">Total Candidates</h5>
                      <p className="card-text display-6">200</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-white bg-danger h-100">
                    <div className="card-body">
                      <h5 className="card-title">Total Companies</h5>
                      <p className="card-text display-6">15</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <h4>Applications Per Month</h4>
                  <canvas id="barChart" width="400" height="200"></canvas>
                </div>
                <div className="col-md-6 mb-4">
                  <h4>Top Candidate Skills</h4>
                  <canvas id="pieChart" width="300" height="200"></canvas>
                </div>
                <div className="col-md-12 mb-4">
                  <h4>Job Postings Trend</h4>
                  <canvas id="lineChart" width="600" height="200"></canvas>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </div>

       
    );
  }
}

export default Dashboard;
