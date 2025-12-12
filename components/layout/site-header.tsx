"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold inline-block">Nuxron</span>
                    </Link>
                    <nav className="flex items-center gap-4 text-sm font-medium">
                        <Link
                            href="/editor"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Editor
                        </Link>
                        <Link
                            href="/simulate"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Simulate
                        </Link>
                        <Link
                            href="/docs"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Docs
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Add search here later if needed */}
                    </div>
                    <nav className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="https://github.com/Webrizen/nuxron" target="_blank" rel="noreferrer">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </Button>
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
