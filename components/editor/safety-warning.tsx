import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface SafetyWarningProps {
    reason: string;
    match?: string;
}

export function SafetyWarning({ reason, match }: SafetyWarningProps) {
    return (
        <Alert variant="destructive" className="mb-4 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Safety Warning: Biohazard Detected</AlertTitle>
            <AlertDescription>
                <div className="flex flex-col gap-1 mt-1">
                    <span>The current sequence matches a known hazardous signature.</span>
                    <span className="font-semibold text-xs bg-destructive-foreground/10 p-1 rounded">
                        Details: {reason}
                    </span>
                    {match && (
                        <span className="text-xs font-mono">
                            Match: {match}
                        </span>
                    )}
                    <span className="text-xs italic mt-2">
                        This is a client-side screen. Please verify regulations before synthesis.
                    </span>
                </div>
            </AlertDescription>
        </Alert>
    )
}
