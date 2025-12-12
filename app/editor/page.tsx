"use client"

import * as React from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { OperationsPanel } from "@/components/editor/operations-panel"
import { TextEditor } from "@/components/editor/text-editor"
import { SequenceViewer } from "@/components/editor/sequence-viewer"
import { useEditorStore } from "@/lib/store"

export default function EditorPage() {
    const { initProject } = useEditorStore()

    React.useEffect(() => {
        // Basic initialization for development/demo
        if (!useEditorStore.getState().project) {
            initProject({
                id: crypto.randomUUID(),
                name: "Untitled Project",
                sequence: ">example_seq\nATGCGTACGATCGTAGCTAGCTAGCATGCTAGCTAGCTGATCGTAGCTAGCTAGC",
                type: "dna",
                created: Date.now(),
                updated: Date.now()
            })
        }

        const interval = setInterval(() => {
            useEditorStore.getState().save();
        }, 30000);

        return () => clearInterval(interval);
    }, [initProject]);

    return (
        <div className="h-[calc(100vh-3.5rem)] w-full flex flex-col bg-background">
            <div className="flex-1 overflow-hidden">
                <ResizablePanelGroup direction="horizontal" className="h-full w-full rounded-lg border">
                    <ResizablePanel defaultSize={50} minSize={20} className="bg-background">
                        <TextEditor />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50} minSize={20}>
                        <SequenceViewer />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
            <div className="flex-none h-12">
                <OperationsPanel />
            </div>
        </div>
    )
}
