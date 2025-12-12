"use client"

import * as React from "react"
import { Upload, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function SequenceInput() {
    const router = useRouter()
    const [sequence, setSequence] = React.useState("")

    const handleAnalyze = () => {
        if (!sequence.trim()) return
        // TODO: Save to IndexedDB here
        router.push("/editor")
    }

    return (
        <Card className="p-6 w-full max-w-4xl mx-auto border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm shadow-xl">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">New Project</h3>
                    </div>
                    <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Import File
                    </Button>
                </div>
                <Textarea
                    placeholder="Paste raw sequence, FASTA, or GenBank format here..."
                    className="min-h-[250px] font-mono text-sm resize-y"
                    value={sequence}
                    onChange={(e) => setSequence(e.target.value)}
                    spellCheck={false}
                />
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Supports: FASTA, GenBank, Plain Text</span>
                    <Button onClick={handleAnalyze} size="lg" className="px-8 font-semibold">
                        Open Editor
                    </Button>
                </div>
            </div>
        </Card>
    )
}
