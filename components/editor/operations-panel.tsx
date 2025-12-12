"use client"

import { Button } from "@/components/ui/button"
import { Dna, Scissors, Copy, RotateCcw, Share, FileText, FileDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEditorStore } from "@/lib/store"
import { downloadFASTA, downloadPDF } from "@/lib/export/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function OperationsPanel() {
    const { project } = useEditorStore()

    const handleExportFASTA = () => {
        if (project) downloadFASTA(project);
    }

    const handleExportPDF = () => {
        if (project) downloadPDF(project);
    }

    return (
        <div className="h-full flex items-center px-4 space-x-2 overflow-x-auto bg-background border-t">
            <div className="flex items-center space-x-1 mr-4">
                <Dna className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Tools</span>
            </div>

            <Button variant="ghost" size="sm" className="h-8">
                <RotateCcw className="mr-2 h-4 w-4" />
                Rev. Comp
            </Button>

            <Button variant="ghost" size="sm" className="h-8">
                <Scissors className="mr-2 h-4 w-4" />
                Digest
            </Button>

            <Button variant="ghost" size="sm" className="h-8">
                <Copy className="mr-2 h-4 w-4" />
                Copy
            </Button>

            <div className="flex-1" />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                        <Share className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleExportFASTA}>
                        <FileText className="mr-2 h-4 w-4" />
                        Export as FASTA
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportPDF}>
                        <FileDown className="mr-2 h-4 w-4" />
                        Export as PDF Report
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="ml-2 pl-2 border-l">
                <ThemeToggle />
            </div>
        </div>
    )
}
