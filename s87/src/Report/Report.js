// src/Reports/Reports.js
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import './Report.scss';

function Reports() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Replace this with your actual API endpoint
      const token = localStorage.getItem('token');
      const response = await fetch('http://104.131.13.39:3001/api/report-data',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the request header
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setChartData(data);
      drawChart(data);
    };
    
    fetchData();
  }, []);

  const drawChart = (data) => {
    const margin = {top: 20, right: 30, bottom: 60, left: 60};
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// const svg = 

const svg = d3.select("#report-chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleLinear()
  .domain([2014, 2023])
  .range([0, width]);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.capacity)])
  .nice()
  .range([height, 0]);

// Smooth line using a curve
const line = d3.line()
  .x(d => x(d.year))
  .y(d => y(d.capacity))
  .curve(d3.curveMonotoneX); // Smooth curve

svg.append("path")
  .data([data])
  .attr("class", "line")
  .attr("d", line)
  .style("stroke", "#4daf4a") // Line color
  .style("fill", "none")
  .style("stroke-width", 2);

// X Axis with labels
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).ticks(5)); // Fewer ticks for clarity

// Y Axis with labels
svg.append("g")
  .call(d3.axisLeft(y).ticks(6));

// X Axis Label
svg.append("text")
  .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom - 10) + ")")
  .style("text-anchor", "middle")
  .style("font-size", "12px")
  .text("Year");

// Y Axis Label
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 10)
  .attr("x", -height / 2)
  .style("text-anchor", "middle")
  .style("font-size", "12px")
  .text("Solar Capacity (GW)");
  };

  return (
    <div className="reports">
      <h1>Reports Page</h1>
      <svg id="report-chart"></svg>
      <p>This chart showcases the increase in renewable energy generation capacity over the past few years, emphasizing the transition towards cleaner energy sources.</p>
    </div>
  );
}

export default Reports;
