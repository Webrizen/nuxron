import { SequenceInput } from "@/components/editor/sequence-input";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-24 selection:bg-primary selection:text-primary-foreground">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-5xl space-y-12 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Nuxron
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Free, anonymous, client-side computational biology platform.
            <br />
            No signup required.
          </p>
        </div>

        <SequenceInput />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left max-w-4xl mx-auto pt-12">
          <div className="p-4 rounded-lg bg-card/30 border border-border/50 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">🔒 Private by Design</h3>
            <p className="text-sm text-muted-foreground">All analysis happens in your browser. Data never leaves your device unless you choose to.</p>
          </div>
          <div className="p-4 rounded-lg bg-card/30 border border-border/50 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">⚡ Instant Analysis</h3>
            <p className="text-sm text-muted-foreground">Powered by WebAssembly and client-side visualization tools.</p>
          </div>
          <div className="p-4 rounded-lg bg-card/30 border border-border/50 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">📂 Local Storage</h3>
            <p className="text-sm text-muted-foreground">Projects persist automatically using your browser&apos;s IndexedDB.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
