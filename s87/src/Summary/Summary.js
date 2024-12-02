// src/Summary/Summary.js
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import './Summary.scss';

function Summary() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Simulate an asynchronous data retrieval
    const fetchData = async () => {
        const token = localStorage.getItem('token');
      // Replace this with your actual API endpoint
      const response = await fetch('http://localhost:3001/api/summary-data',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the request header
        'Content-Type': 'application/json',
      },
    });
      const data = await response.json();
      setChartData(data);
      drawChart(data);
    };
    
    fetchData();
  }, []);

  const drawChart = (data) => {
    
    // Define the scales and axes
    const margin = {top: 20, right: 20, bottom: 60, left: 60};
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Select the existing SVG container and clear any previous content
    const svg = d3.select("#summary-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleBand()
      .domain(data.map(d => d.sector))
      .range([0, width])
      .padding(0.1); // Adds spacing between bars

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.investment)])
      .nice()
      .range([height, 0]);

    // Create bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.sector))
      .attr("y", d => y(d.investment))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.investment))
      .style("fill", "#4daf4a");

    // X Axis with labels
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "12px") // Smaller font size for better readability

    // Y Axis with labels
    svg.append("g")
      .call(d3.axisLeft(y).ticks(6));

    // X Axis Label
    svg.append("text")
      .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom - 10) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Sector");

    // Y Axis Label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 10)
      .attr("x", -height / 2)
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Investment (in $ Billion)");
  };

  return (
    <div className="summary">
      <h1>Summary Page</h1>
      <svg id="summary-chart"></svg>
      <p>This chart illustrates the growth in clean energy investments over the last few years, highlighting significant trends in the industry.</p>
    </div>
  );
}

export default Summary;
