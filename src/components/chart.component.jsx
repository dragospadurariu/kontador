import React, { useRef, useEffect } from 'react';
import './chart.styles.scss';
import {
  select,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleBand,
} from 'd3';
import { max } from 'd3-array';

const Chart = ({ data }) => {
  const svgRef = useRef();

  const WIDTH = data.length * 50;
  const HEIGHT = 300;
  const maxValue = max(data.map((value) => value.counter));
  const yScalePadding = 2;


  useEffect(() => {
    const svg = select(svgRef.current)
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

    const xScale = scaleBand()
      .domain(data.map((element, index) => index))
      .range([0, WIDTH])
      .padding(0.3);

    const yScale = scaleLinear()
      .domain([0, maxValue + yScalePadding])
      .range([HEIGHT, 0]);

    const colorScale = scaleLinear()
      .domain([0, maxValue / 2, maxValue - maxValue / 3, maxValue])
      .range(['red', 'orange', 'yellow', 'green']);

    const x = axisBottom(xScale).tickFormat((i) => data[i].month);
    const y = axisRight(yScale);

    svg.select('.x-axis').style('transform', `translateY(${HEIGHT}px)`).call(x);
    svg.select('.y-axis').style('transform', `translateX(${WIDTH}px)`).call(y);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform','scale(1,-1')
 
      .attr('fill', (data, index) => colorScale(data.counter))
      .attr('x', (data, index) => xScale(index))
      .attr('width', xScale.bandwidth())
      .attr('height', (data) => HEIGHT - yScale(data.counter))
      .attr('y', -HEIGHT)
      .on('mouseenter', (event, dataArray) => {
        console.log(dataArray);
        svg
          .selectAll('.tooltip')
          .data([dataArray])
          .join('text')
          .attr('class', 'tooltip')
          .text(dataArray.counter)
          .attr('x',xScale(data.indexOf(dataArray)) + xScale.bandwidth()/2)
          .attr('text-anchor','middle')
          .transition()
          .attr('y',yScale(dataArray.counter) - 10)
          
      })
      .on('mouseleave',()=>svg.select('.tooltip').remove())
      .transition();

  });
  return (
    <svg ref={svgRef}>
      <g className='x-axis' style={{ color: 'white' }} />
      <g className='y-axis' style={{ color: 'white' }} />
    </svg>
  );
};

export default Chart;
