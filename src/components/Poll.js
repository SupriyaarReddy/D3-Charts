import React, { useRef, useEffect } from 'react';

import * as d3 from 'd3';

const Poll = ({ openCases = 10, closedCases = 16 }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = d3.select(chartRef.current);

        // Clear any previous chart content
        chart.selectAll('*').remove();

        // Set up chart dimensions
        const width = 400;
        const height = 50;

        // Set up scales
        const maxValue = 20; // Maximum value for the domain (0 to 20)
        const xScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([0, width]);

        // Add open cases background
        chart
            .append('rect')
            .attr('width', width)
            .attr('height', height / 2)
            .attr('fill', '#f2f2f2');

        // Add closed cases background
        chart
            .append('rect')
            .attr('width', width)
            .attr('height', height / 2)
            .attr('y', height / 2 + 20)
            .attr('fill', '#f2f2f2');

        // Calculate the scaled values for openCases and closedCases
        const scaledOpenCases = xScale(Math.min(openCases, maxValue));
        const scaledClosedCases = xScale(Math.min(closedCases, maxValue));

        // Add open cases bar
        chart
            .append('rect')
            .attr('width', scaledOpenCases)
            .attr('height', height / 2)
            .attr('fill', '#04AA6D');

        // Add closed cases bar
        chart
            .append('rect')
            .attr('width', scaledClosedCases)
            .attr('height', height / 2)
            .attr('y', height / 2 + 20)
            .attr('fill', 'lightpink');

        // Add open cases value number
        chart
            .append('text')
            .attr('x', width + 10) 
            .attr('y', height / 2 - 8)
            .attr('text-anchor', 'start')
            .text(openCases)
            .style('fill', 'black')
            .style('font-weight', 'bold');

        // Add closed cases value number
        chart
            .append('text')
            .attr('x', width + 10) 
            .attr('y', height + 12) 
            .attr('text-anchor', 'start')
            .style('fill', 'black')
            .style('font-weight', 'bold')
            .text(closedCases);

        // Add open cases label
        chart
            .append('text')
            .attr('x', -18)
            .attr('y', height / 2 - 5)
            .attr('text-anchor', 'end')
            .text('Open Cases')
            .style('fill', 'black')
           
        
        

        // Add closed cases label
        chart
            .append('text')
            .attr('x', -10)
            .attr('y', height - -10)
            .attr('text-anchor', 'end')
            .style('fill', 'black')
            .text('Closed Cases');
    }, [openCases, closedCases]);
    

    return (
        <svg
            ref={chartRef}
            width={400}
            height={100}
            style={{
             
                marginRight: '340px',
                overflow: 'visible',
                transform: 'translate(50%, 20%)',
                scrollBehavior: 'auto'
            }}
        />
    );
};

export default Poll;
