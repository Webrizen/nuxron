import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[35%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-purple-500/20 rounded-full blur-[100px]" />
            </div>

            <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-screen-2xl">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        v1.0 Public Beta
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70 max-w-7xl">
                        Empowering Computational Biology in Your Browser, Privately, Instantly.
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Perform complex sequence analysis, simulations, and visualization directly in your browser.
                        <span className="font-semibold text-foreground"> Private. Instant. Serverless.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Button size="lg" className="gap-2 h-12 px-8 text-base" asChild>
                            <Link href="/editor">
                                Start Analyzing <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base" asChild>
                            <Link href="/simulate">
                                <Code2 className="h-4 w-4" /> Run Simulation
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left max-w-7xl w-full">
                        <div className="flex flex-col gap-2 p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:bg-background/80">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
                            </div>
                            <h3 className="font-semibold text-lg">Private by Design</h3>
                            <p className="text-sm text-muted-foreground">Zero data collection. All processing happens locally on your machine via WebAssembly.</p>
                        </div>
                        <div className="flex flex-col gap-2 p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:bg-background/80">
                            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><path d="M4 14.7 17.2 2.5a.5.5 0 0 1 .8.6l-5.6 11.1H20a.5.5 0 0 1 .4.8L7.1 27.5a.5.5 0 0 1-.8-.6l5.6-11.1H4a.5.5 0 0 1-.4-.8Z" /></svg>
                            </div>
                            <h3 className="font-semibold text-lg">Instant Results</h3>
                            <p className="text-sm text-muted-foreground">No server queues or upload times. Get immediate feedback on your sequences.</p>
                        </div>
                        <div className="flex flex-col gap-2 p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:bg-background/80">
                            <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></svg>
                            </div>
                            <h3 className="font-semibold text-lg">Local Persistence</h3>
                            <p className="text-sm text-muted-foreground">Work offline. Your projects are saved automatically to your browser&apos;s storage.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
