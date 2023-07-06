import React, { useRef, useEffect } from 'react';

import * as d3 from 'd3';



function SpiderRadius() {
    const chartRef = useRef(null);



    useEffect(() => {
        const data = [
            { axis: 'Axco', value: 6 },
            { axis: 'Vent', value: 7 },
            { axis: 'Inlet', value: 5 },
            { axis: 'PT_airflow', value: 6 },
            { axis: 'Min_oil', value: 6 },
            { axis: 'PT_vibs', value: 3 },
            { axis: 'Synth_oil', value: 4 },
            { axis: 'GG_vibs', value: 6 },
            { axis: 'Comb', value: 4},
            { axis: 'Fuel', value: 9 },
            
        ]


        const width = 500;
        const height = 500;
        const radius = Math.min(width, height) / 2.7;
        const angleSlice = (Math.PI * 2) / data.length;




        const rScale = d3.scaleLinear()
            .domain([0, 10])
            .range([0, Math.floor(radius)]);


        const line = d3.lineRadial()
            .angle((d, i) => i * angleSlice)
            .radius((d) => rScale(d.value))
            .curve(d3.curveLinearClosed);


        const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)


        const spider = svg
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);



        spider.selectAll('.spider-axis')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'spider-axis')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (d, i) => rScale(Math.floor(10)) * Math.sin(angleSlice * i))
            .attr('y2', (d, i) => -rScale(Math.floor(10)) * Math.cos(angleSlice * i))
            .attr('stroke', 'lightgray')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '4 9')



        spider.selectAll('.spider-axis-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'spider-axis-label')
            .attr('x', (d, i) => rScale(Math.floor(12)) * Math.sin(angleSlice * i))
            .attr('y', (d, i) => -rScale(Math.floor(12)) * Math.cos(angleSlice * i))
            .attr('dy', '0.35rem')
             .attr('dx', '-1.7rem')
            .text((d) => d.axis)


        spider.append('path')
            .datum(data)
            .attr('class', 'spider-path')
            .attr('d', (d) => line(d))
            .attr('stroke', '#3238a8')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('opacity', 0.5);


        // Spider web path

        spider.selectAll('.spider-web-circle')
            .data(d3.range(0, 11, 2))
            .enter()
            .append('circle')
            .attr('class', 'spider-web-circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', (d) => rScale(d))
            // .attr('r', (d) => rScale(Math.floor(d * 10)))
            .attr('stroke', 'darkgray')
            .attr('stroke-width', 0.5)
            .attr('fill', 'none');



      

        // Create the scale line
        spider.append('line')
            .attr('class', 'scale-line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', rScale(10))
            .attr('y2', 0)
            .attr('stroke', 'black')
            .attr('stroke-width', 1);

        // Create the scale numbers
        spider.selectAll('.scale-number')
            .data(d3.range(0, 11, 2))  // Set the values for the scale numbers
            .enter().append('text')
            .attr('class', 'scale-number')
            .attr('x', function (d) { return rScale(d); }) // Position the numbers on the scale line
            .attr('y', 12) // Offset the numbers from the scale line
            .text(function (d) { return d; })
        
      



        console.log(rScale(1)); // should return the value of `radius`
        console.log(rScale(0)); // should return 0
        console.log(line(data));


        return () => {
            svg.remove();
        };

    }, []);


    return (
        <div ref={chartRef}
         style={{
             overflow: 'visible',
              scrollBehavior: 'auto'
            }}
            >
        </div>
    )
}

export default SpiderRadius


