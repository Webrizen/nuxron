"use client"

import * as React from "react"
import * as d3 from "d3"
import { useEditorStore } from "@/lib/store"

// Helper to clean sequence of newlines/headers for visualization
const getRawSequence = (seq: string) => {
    if (!seq) return "";
    return seq.replace(/>.*\n?/, "").replace(/[^a-zA-Z]/g, "").toUpperCase();
}

export function LinearView() {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const { project, selection, setSelection } = useEditorStore()
    const [width, setWidth] = React.useState(0)

    React.useEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    React.useEffect(() => {
        if (!project || !width || width === 0) return;

        const rawSeq = getRawSequence(project.sequence);
        if (!rawSeq) return;

        const height = 150;
        const margin = { top: 20, right: 30, bottom: 30, left: 30 };
        const innerWidth = width - margin.left - margin.right;

        // Cleanup
        d3.select(containerRef.current).selectAll("svg").remove();

        const svg = d3.select(containerRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("user-select", "none");

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scales
        const xScale = d3.scaleLinear()
            .domain([1, rawSeq.length])
            .range([0, innerWidth]);

        // Axis
        const xAxis = d3.axisBottom(xScale)
            .ticks(Math.min(20, Math.floor(rawSeq.length / 10)));

        g.append("g")
            .attr("transform", `translate(0, 50)`)
            .call(xAxis);

        // Backbone line
        g.append("line")
            .attr("x1", 0)
            .attr("x2", innerWidth)
            .attr("y1", 25)
            .attr("y2", 25)
            .attr("stroke", "currentColor")
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 0.5);

        // Selection rect
        if (selection) {
            const startX = xScale(selection.start);
            const endX = xScale(selection.end);

            g.append("rect")
                .attr("x", startX)
                .attr("y", 10)
                .attr("width", Math.max(1, endX - startX))
                .attr("height", 30)
                .attr("fill", "var(--primary)")
                .attr("opacity", 0.3);
        }

        // Overlay for interaction
        // We use a separate group for brush to avoid conflict, 
        // but syncing brush state with store is tricky (loop). 
        // For now, simple click/drag to set store. 
        // D3 brush might fight with controlled state if not careful.
        // Let's use simple click/drag logic instead of d3-brush for now to keep it lightweight.

        const overlay = g.append("rect")
            .attr("width", innerWidth)
            .attr("height", 60)
            .attr("fill", "transparent")
            .style("cursor", "crosshair");

        let isDragging = false;
        let startPos = 0;

        overlay.on("mousedown", (event) => {
            isDragging = true;
            const [x] = d3.pointer(event);
            startPos = Math.round(xScale.invert(x));
            setSelection(startPos, startPos);
        });

        overlay.on("mousemove", (event) => {
            if (!isDragging) return;
            const [x] = d3.pointer(event);
            const currentPos = Math.round(xScale.invert(x));
            setSelection(Math.min(startPos, currentPos), Math.max(startPos, currentPos));
        });

        overlay.on("mouseup", () => {
            isDragging = false;
        });

        overlay.on("mouseleave", () => {
            isDragging = false;
        });

    }, [project, width, selection, setSelection]);

    return (
        <div className="w-full flex-1 relative overflow-hidden flex flex-col">
            <div className="p-4 border-b bg-muted/20">
                <h4 className="font-semibold text-sm">Linear View</h4>
                <p className="text-xs text-muted-foreground">
                    {project?.sequence ? `${getRawSequence(project.sequence).length} bp` : 'No sequence'}
                </p>
            </div>
            <div ref={containerRef} className="flex-1 w-full bg-background" />
        </div>
    )
}
