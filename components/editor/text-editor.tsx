"use client"

import { useRef, useEffect, useState } from "react"
import Editor, { OnMount } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { useEditorStore } from "@/lib/store"
import { checkSequence, SafetyCheckResult } from "@/lib/safety/blocklist"
import { SafetyWarning } from "./safety-warning"

export function TextEditor() {
    const { theme } = useTheme()
    const { project, updateSequence, setSelection } = useEditorStore()
    const [safetyStatus, setSafetyStatus] = useState<SafetyCheckResult | null>(null)
    const editorRef = useRef<any>(null)

    // Safety Check Effect
    useEffect(() => {
        if (!project?.sequence) return;

        const timer = setTimeout(async () => {
            const result = await checkSequence(project.sequence);
            setSafetyStatus(result.safe ? null : result);
        }, 500); // Debounce

        return () => clearTimeout(timer);
    }, [project?.sequence]);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        // Define Custom Theme
        monaco.editor.defineTheme('dna-theme', {
            base: 'vs',
            inherit: true,
            rules: [
                { token: 'base-a', foreground: '4ade80', fontStyle: 'bold' }, // A - Green
                { token: 'base-t', foreground: 'f87171', fontStyle: 'bold' }, // T - Red
                { token: 'base-g', foreground: '60a5fa', fontStyle: 'bold' }, // G - Blue
                { token: 'base-c', foreground: 'facc15', fontStyle: 'bold' }, // C - Yellow
                { token: 'base-n', foreground: '94a3b8' }, // N - Gray
                { token: 'invalid', foreground: 'ff0000', fontStyle: 'underline' },
                { token: 'comment', foreground: '808080', fontStyle: 'italic' }
            ],
            colors: {
                'editor.background': '#ffffff00',
            }
        });

        // Define Custom DNA Language
        monaco.languages.register({ id: 'dna' });
        monaco.languages.setMonarchTokensProvider('dna', {
            tokenizer: {
                root: [
                    [/A/, "base-a"],
                    [/T/, "base-t"],
                    [/G/, "base-g"],
                    [/C/, "base-c"],
                    [/N/, "base-n"],
                    [/[^ATGCN\s\d>]/, "invalid"],
                    [/>.*/, "comment"],
                ]
            }
        });

        // Listen for cursor changes to update store selection
        editor.onDidChangeCursorSelection((e) => {
            const selection = e.selection;
            const model = editor.getModel();
            if (model) {
                const start = model.getOffsetAt(selection.getStartPosition());
                const end = model.getOffsetAt(selection.getEndPosition());
                setSelection(start, end);
            }
        });
    }

    return (
        <div className="h-full flex flex-col p-4">
            {safetyStatus && (
                <SafetyWarning
                    reason={safetyStatus.reason || "Unknown safety risk"}
                    match={safetyStatus.match}
                />
            )}
            <Editor
                height="100%"
                defaultLanguage="dna"
                value={project?.sequence || ""}
                onChange={(val) => val !== undefined && updateSequence(val)}
                theme="dna-theme"
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: true },
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true
                }}
                loading={
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <span className="animate-spin mr-2">⟳</span>
                        Initialize DNA Engine...
                    </div>
                }
            />
        </div>
    )
}
