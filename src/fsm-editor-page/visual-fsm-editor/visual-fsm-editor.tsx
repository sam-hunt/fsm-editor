import * as React from 'react';
import * as d3 from 'd3';
import { FsmInput } from '../fsm/fsm-input.interface';
import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

const VisualFsmEditor: React.FC<{ fsmInput: FsmInput<string, string> }> = ({ fsmInput }) => {
    /**
     * The useRef Hook creates a variable that "holds on" to a value across rendering passes.
     * In this case it will hold our component's SVG DOM element.
     * It's initialized null and React will assign it later (see the return statement)
     */
    const d3Container = React.useRef(null);

    /**
     * The useEffect Hook is for running side effects outside of React,
     * for instance inserting elements into the DOM using D3
     */
    React.useEffect(
        () => {
            const fsmLinks = fsmInput.transitions.map(t => ({ source: t.from, target: t.to, name: t.name, type: 'resolved' }));
            const fsmNodes = Array.from(new Set(fsmInput.transitions.flatMap(t => ([t.from, t.to])))).map(id => ({id}));

            const data = ({nodes: Array.from(new Set(fsmLinks.flatMap(l => [l.source, l.target])), id => ({id})), links: fsmLinks});

            const links = data.links.map(d => Object.create(d));
            const nodes = data.nodes.map(d => Object.create(d));

            const types = Array.from(new Set(links.map(d => d.type)));

            const color = d3.scaleOrdinal(types, d3.schemeCategory10);

            const linkArc = (d: any) => {
                const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
                return `
                  M${d.source.x},${d.source.y}
                  A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
                `;
            }

            const drag = (simulation: d3.Simulation<SimulationNodeDatum, SimulationLinkDatum<SimulationNodeDatum>>) => {

                function dragstarted(event: any, d: any) {
                  if (!event.active) simulation.alphaTarget(0.3).restart();
                  d.fx = d.x;
                  d.fy = d.y;
                }

                function dragged(event: any, d: any) {
                  d.fx = event.x;
                  d.fy = event.y;
                }

                function dragended(event: any, d: any) {
                  if (!event.active) simulation.alphaTarget(0);
                  d.fx = null;
                  d.fy = null;
                }

                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
              }

            if (fsmInput && d3Container.current) {
                const svg = d3.select(d3Container.current);

                const el = document.getElementsByClassName('d3-component').item(0) as SVGElement;
                const width = el.clientWidth, height = el.clientHeight;


                const simulation = d3.forceSimulation(nodes)
                    .force("link", d3.forceLink(links).id((d: any) => d.id))
                    .force("charge", d3.forceManyBody().strength(-10000))
                    .force("x", d3.forceX())
                    .force("y", d3.forceY());

                svg
                    .attr("viewBox", [-width / 2, -height / 2, width, height] as any)
                    .style("font", "12px sans-serif");

                // Per-type markers, as they don't inherit styles.
                svg.append("defs").selectAll("marker")
                    .data(types)
                    .join("marker")
                    .attr("id", d => `arrow-${d}`)
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 15)
                    .attr("refY", -0.5)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 6)
                    .attr("orient", "auto")
                    .append("path")
                    .attr("fill", color)
                    .attr("d", "M0,-5L10,0L0,5");

                const link = svg.append("g")
                    .attr("fill", "none")
                    .attr("stroke-width", 5)
                    .selectAll("path")
                    .data(links)
                    .join("path")
                    .attr("stroke", d => color(d.type))
                    .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, window.location as any)})`);

                const node = svg.append("g")
                    .attr("fill", "currentColor")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-linejoin", "round")
                    .selectAll("g")
                    .data(nodes)
                    .join("g")
                    .call(drag(simulation) as any);

                node.append("circle")
                    .attr("stroke", "white")
                    .attr("stroke-width", 1.5)
                    .attr("r", 4);

                node.append("text")
                    .attr("x", 8)
                    .attr("y", "0.31em")
                    .text(d => d.id)
                    .clone(true).lower()
                    .attr("fill", "none")
                    .attr("stroke", "white")
                    .attr("stroke-width", 3);

                simulation.on("tick", () => {
                    link.attr("d", linkArc);
                    node.attr("transform", d => `translate(${d.x},${d.y})`);
                });

                // invalidation.then(() => simulation.stop());

                // return svg.node();

            }
        },

        /**
         * useEffect has a dependency array (below). It's a list of dependency
         * variables for this useEffect block. The block will run after mount
         * and whenever any of these variables change. We still have to check
         * if the variables are valid, but we do not have to compare old props
         * to next props to decide whether to rerender.
         */
        [fsmInput, d3Container.current])

    return (
        <svg
            className="d3-component"
            // width={400}
            // height={200}
            ref={d3Container}
        />
    );
}

export default VisualFsmEditor;

