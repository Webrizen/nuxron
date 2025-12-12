import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Terminal, Activity, FileText } from "lucide-react";

export default function DocsPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 space-y-12">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Documentation</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Learn how to use Nuxron for your computational biology workflows.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Terminal className="h-5 w-5" />
                            </div>
                            <Badge variant="secondary">Core</Badge>
                        </div>
                        <CardTitle>Sequence Editor</CardTitle>
                        <CardDescription>
                            Master the powerful client-side sequence editor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            The sequence editor supports DNA, RNA, and Protein sequences.
                            It provides real-time validation, formatting, and analysis tools.
                        </p>
                        <Link href="/editor" className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-2">
                            Go to Editor <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                    </CardContent>
                </Card>

                <Card className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                <Activity className="h-5 w-5" />
                            </div>
                            <Badge variant="secondary">P3</Badge>
                        </div>
                        <CardTitle>Simulations</CardTitle>
                        <CardDescription>
                            Run complex biological simulations locally.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Execute heavy computational tasks like GC Content analysis, Translation,
                            and Molecular Weight calculation using Web Workers.
                        </p>
                        <Link href="/simulate" className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-2">
                            Run Simulations <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
                    <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                        <p>
                            Nuxron is designed to be used immediately without any setup.
                            Since it runs entirely in your browser, there are no accounts to create or software to install.
                        </p>
                        <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Key Features</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Local-first architecture ensuring data privacy.</li>
                            <li>Instant feedback loop with no server latency.</li>
                            <li>Persistent work-in-progress via IndexedDB.</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
                    <div className="grid gap-4">
                        <div className="p-4 border rounded-lg bg-card/50">
                            <h3 className="font-semibold mb-2">Is my data safe?</h3>
                            <p className="text-sm text-muted-foreground">
                                Yes. Your data never leaves your browser. All processing is done locally using JavaScript and WebAssembly.
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg bg-card/50">
                            <h3 className="font-semibold mb-2">Can I export my results?</h3>
                            <p className="text-sm text-muted-foreground">
                                Currently, we support visual inspection. Export functionality is on our roadmap for the next release.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
