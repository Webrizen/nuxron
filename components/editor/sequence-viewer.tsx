"use client"

import * as React from "react"
import { LinearView } from "@/components/visualization/linear-view"
import { CircularView } from "@/components/visualization/circular-view"
import { DNA3DViewer } from "@/components/visualization/dna-3d-view"
import { Button } from "@/components/ui/button"
import { Circle, Activity, Cuboid } from "lucide-react"

export function SequenceViewer() {
    const [viewMode, setViewMode] = React.useState<"linear" | "circular" | "3d">("linear")

    return (
        <div className="h-full w-full flex flex-col bg-muted/10 border-l">
            <div className="flex items-center justify-between p-2 bg-background border-b">
                <span className="text-xs font-semibold text-muted-foreground ml-2">Visualization</span>
                <div className="flex space-x-1">
                    <Button
                        variant={viewMode === "linear" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setViewMode("linear")}
                        title="Linear View"
                    >
                        <Activity className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "circular" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setViewMode("circular")}
                        title="Circular View (Plasmid)"
                    >
                        <Circle className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "3d" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setViewMode("3d")}
                        title="3D View"
                    >
                        <Cuboid className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
                {viewMode === "linear" && <LinearView />}
                {viewMode === "circular" && <CircularView />}
                {viewMode === "3d" && <DNA3DViewer />}
            </div>
        </div>
    )
}
