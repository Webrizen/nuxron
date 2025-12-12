"use client"

import * as React from "react"
import * as d3 from "d3"
import { useEditorStore } from "@/lib/store"

const getRawSequence = (seq: string) => {
    if (!seq) return "";
    return seq.replace(/>.*\n?/, "").replace(/[^a-zA-Z]/g, "").toUpperCase();
}

export function CircularView() {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const { project, selection } = useEditorStore()
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })

    React.useEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    React.useEffect(() => {
        if (!project || !dimensions.width || !dimensions.height) return;

        const rawSeq = getRawSequence(project.sequence);
        const seqLength = rawSeq.length;
        if (!seqLength) return;

        const { width, height } = dimensions;
        const radius = Math.min(width, height) / 2 * 0.8;
        // Cleanup
        d3.select(containerRef.current).selectAll("svg").remove();

        const svg = d3.select(containerRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("user-select", "none");

        const g = svg.append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        // Scales
        const angleScale = d3.scaleLinear()
            .domain([1, seqLength + 1]) // +1 to close the loop conceptually
            .range([0, 2 * Math.PI]);

        // Backbone Arc
        const arc = d3.arc()
            .innerRadius(radius - 2)
            .outerRadius(radius + 2)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        g.append("path")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .attr("d", arc(null as any) || "")
            .attr("fill", "currentColor")
            .attr("opacity", 0.5);

        // Selection Arc
        if (selection) {
            // Check if selection crosses origin (wrap around) - ignored for linear project type for now
            // Simple sort just in case
            const start = selection.start;
            const end = selection.end;

            // Normalized inputs
            const selectionArc = d3.arc()
                .innerRadius(radius - 10)
                .outerRadius(radius + 10)
                .startAngle(angleScale(start))
                .endAngle(angleScale(end));

            g.append("path")
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .attr("d", selectionArc(null as any) || "")
                .attr("fill", "var(--primary)")
                .attr("opacity", 0.5);
        }

        // Ticks (e.g. every 1000bp or 10%)
        // Simple 10 ticks
        const tickCount = 10;
        const ticks = d3.range(0, seqLength, seqLength / tickCount);

        g.selectAll(".tick")
            .data(ticks)
            .enter()
            .append("line")
            .attr("class", "tick")
            .attr("x1", 0)
            .attr("y1", -radius + 5)
            .attr("x2", 0)
            .attr("y2", -radius - 5)
            .attr("stroke", "currentColor")
            .attr("opacity", 0.5)
            .attr("transform", d => `rotate(${(angleScale(d + 1) * 180 / Math.PI)})`);

    }, [project, dimensions, selection]);

    return (
        <div className="w-full flex-1 relative overflow-hidden flex flex-col">
            <div className="p-4 border-b bg-muted/20">
                <h4 className="font-semibold text-sm">Circular View</h4>
                <p className="text-xs text-muted-foreground">
                    {project?.sequence ? `${getRawSequence(project.sequence).length} bp` : 'No sequence'}
                </p>
            </div>
            <div ref={containerRef} className="flex-1 w-full bg-background" />
        </div>
    )
}
