"use client"

import * as React from "react"
import { useEditorStore } from "@/lib/store"
import { useSimulationStore } from "@/lib/simulations/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Trash2 } from "lucide-react"

export default function SimulationsPage() {
    const { project } = useEditorStore()
    const { jobs, addJob, updateJob } = useSimulationStore()
    const workerRef = React.useRef<Worker>(null)

    React.useEffect(() => {
        // Initialize Worker
        workerRef.current = new Worker(new URL('../../lib/simulations/analysis.worker.ts', import.meta.url));

        workerRef.current.onmessage = (e) => {
            const { id, result, status, error } = e.data;
            updateJob(id, {
                status: status,
                result: result,
                error: error
            });
        };

        return () => {
            workerRef.current?.terminate();
        }
    }, [updateJob]);

    const runSimulation = (type: 'gc-content' | 'translation' | 'mw') => {
        if (!project) return;

        const id = crypto.randomUUID();
        const job = {
            id,
            type,
            status: 'queued' as const,
            submitted: Date.now(),
            projectName: project.name
        };

        addJob(job);
        updateJob(id, { status: 'running' });

        workerRef.current?.postMessage({
            id,
            type,
            sequence: project.sequence
        });
    }

    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Simulations</h2>
                <div className="space-x-2">
                    <Button onClick={() => runSimulation('gc-content')}>
                        <Play className="mr-2 h-4 w-4" /> Run GC Analysis
                    </Button>
                    <Button onClick={() => runSimulation('translation')} variant="secondary">
                        <Play className="mr-2 h-4 w-4" /> Translate
                    </Button>
                </div>
            </div>

            <div className="grid gap-4">
                {jobs.length === 0 && (
                    <div className="text-center p-12 text-muted-foreground border-2 border-dashed rounded-lg">
                        No simulations running. Start one above.
                    </div>
                )}

                {jobs.map((job) => (
                    <Card key={job.id} className="p-4 flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold capitalize">{job.type.replace('-', ' ')}</span>
                                <Badge variant={
                                    job.status === 'complete' ? 'default' :
                                        job.status === 'error' ? 'destructive' : 'secondary'
                                }>
                                    {job.status}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {new Date(job.submitted).toLocaleTimeString()} • {job.projectName}
                            </p>
                        </div>

                        <div className="flex-1 mx-8">
                            {job.status === 'complete' && job.result && job.type === 'gc-content' && (
                                <div className="text-sm">
                                    GC Content: <span className="font-bold">{job.result.percentage.toFixed(2)}%</span>
                                    <span className="mx-2 text-muted-foreground">|</span>
                                    Count: {job.result.count} / {job.result.total}
                                </div>
                            )}
                            {job.status === 'complete' && job.result && job.type === 'translation' && (
                                <div className="text-sm font-mono truncate max-w-[400px]" title={job.result}>
                                    Protein: {job.result.substring(0, 50)}...
                                </div>
                            )}
                            {job.error && <span className="text-sm text-destructive">{job.error}</span>}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => useSimulationStore.getState().removeJob(job.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    )
}
