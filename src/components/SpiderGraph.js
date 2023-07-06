import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
// import './SpiderChart.css'

function SpiderGraph() {

    const chartRef = useRef(null);



    useEffect(() => {
        const data = [
            { axis: 'T48-1', value: 800 },
            { axis: 'T48-2', value: 760 },
            { axis: 'T48-3', value: 750 },
            { axis: 'T48-4', value: 800 },
            { axis: 'T48-5', value: 820 },
            { axis: 'T48-6', value: 880 },
            { axis: 'T48-7', value: 780 },
            { axis: 'T48-8', value: 850 },
        ]

        const width = 500;
        const height = 500;
        const radius = Math.min(width, height) / 2.9;
        const angleSlice = (Math.PI * 2) / data.length;

        const rScale = d3.scaleLinear()
            .domain([740, 880])
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
            .attr('x2', (d, i) => rScale(Math.floor(880)) * Math.sin(angleSlice * i))
            .attr('y2', (d, i) => -rScale(Math.floor(880)) * Math.cos(angleSlice * i))
            .attr('stroke', 'lightgray')
            .attr('stroke-width', 2.5)
            .attr('stroke-dasharray', '4 9')

        // Add spider web labels
        spider.selectAll('.spider-axis-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'spider-axis-label')
            .attr('x', (d, i) => rScale(Math.floor(920)) * Math.sin(angleSlice * i))
            .attr('y', (d, i) => -rScale(Math.floor(920)) * Math.cos(angleSlice * i))
            .attr('dy', '0.35rem')
             .attr('dx', '-1rem')
            .text((d) => d.axis)

        spider.append('path')
            .datum(data)
            .attr('class', 'spider-path')
            .attr('d', (d) => line(d))
            .attr('stroke', '#3238a8')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('opacity', 0.5)



        spider.selectAll('.spider-web-label')
            .data(d3.range(740, 900, 20))
            .enter()
            .append('text')
            .attr('class', 'spider-web-label')
            .attr('x', -12)
            // .attr('y', (d) => -rScale(Math.floor(d * 1000)))
            // .text((d) => Math.floor(d * 1000));
            .attr('y', (d) => -rScale(d))
            .text((d) => d)
            .style('font-size', 14)
            .style(' text-anchor', 'end')


        // Add spider web circles
        spider.selectAll('.spider-web-circle')
            .data(d3.range(740, 900, 20))
            .enter()
            .append('circle')
            .attr('class', 'spider-web-circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', (d) => rScale(d))
            // .attr('r', (d) => rScale(Math.floor(d * 1000)))
            .attr('stroke', 'darkgray')
            .attr('stroke-width', 0.5)
            .attr('fill', 'none');


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

export default SpiderGraph