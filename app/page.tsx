import Image from "next/image";
import Link from "next/link";
import { stats } from "@/enums";
import { DnaHero } from "@/components/home/hero-3d";

export default function Home() {
  return (
    <main className="w-full">
      <section className="relative pt-10 xl:pt-14">
        <div className="mx-auto container w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
          <div className="mx-auto text-center lg:text-left flex flex-col max-w-3xl justify-center lg:justify-start lg:py-8 flex-1 lg:w-1/2 lg:max-w-none">
            <h1 className="text-indigo-950 dark:text-white text-4xl/snug sm:text-6xl/tight lg:text-5xl/tight xl:text-6xl/tight font-semibold text">
              Privacy‑First Bioinformatics Studio <span className="bg-indigo-50 dark:bg-zinc-900 dark:text-indigo-300 inline-block border border-dashed border-indigo-600 px-3">Laboratory Grade.</span>
            </h1>
            <p className="mt-10 text-zinc-700 dark:text-zinc-300 lg:text-lg max-w-2xl lg:max-w-none mx-auto">
              Edit sequences, simulate protein folding, and visualize genomic data directly in your browser. Zero cloud uploads. Your research never leaves your device.
            </p>
            <div className="mt-10 flex gap-4 justify-center lg:justify-start flex-wrap">
              <Link href="/editor" className="relative px-6 py-3 before:absolute before:inset-0 before:rounded-lg before:transition active:before:bg-indigo-700 text-white hover:before:bg-indigo-800 before:bg-indigo-600 hover:before:scale-105">
                <span className="relative">
                  Start Analyzing
                </span>
              </Link>
              <Link href="/simulate" className="relative px-6 py-3 before:absolute before:inset-0 before:rounded-lg before:transition before:bg-zinc-100 dark:before:bg-zinc-900 text-indigo-600 dark:text-white hover:before:scale-105">
                <span className="relative">
                  Run Simulation
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-1 lg:w-1/2 relative max-w-3xl mx-auto lg:max-w-none">
            <Image src="/og-image.png" alt="happy team" width={1850} height={1200} className="lg:absolute w-full lg:inset-x-0 object-cover lg:h-full dark:invert" />
          </div>
        </div>
      </section>
      <section className="py-24 sm:py-32 w-full">
        <div className="mx-auto px-6 container lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-400">Client‑side Bioinformatics</h2>
          <p className="mx-auto mt-2 max-w-4xl text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            Edit, visualize, and simulate DNA, entirely in your browser
          </p>

          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            {/* Browser-native / Local-first */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-zinc-800 lg:rounded-l-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Browser‑native & Local‑first</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-zinc-400 max-lg:text-center">
                    Nuxron runs entirely on the client — sequences are persisted in IndexedDB, computations happen in the browser, and no user data is uploaded to any server by default.
                  </p>
                </div>

                <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-zinc-700 bg-zinc-900 outline outline-white/20">
                    <Image
                      alt="Nuxron browser-native editor and 3D helix preview"
                      src="/mock-up.png"
                      width={888}
                      height={2364}
                      className="size-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
            </div>

            {/* Web Worker simulations */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-zinc-800 max-lg:rounded-t-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Web‑Worker Simulations</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-zinc-400 max-lg:text-center">
                    Heavy operations (GC content, reverse complement, translation) run in a Web Worker so the UI stays responsive even for long sequences.
                  </p>
                </div>

                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <img
                    alt="Background job worker processing DNA simulations"
                    src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png"
                    className="w-full max-lg:max-w-xs"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl" />
            </div>

            {/* Client-side biosecurity */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-zinc-800" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Client‑side Biosecurity</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-zinc-400 max-lg:text-center">
                    A local biosecurity screen scans sequences against a hashed blocklist in the browser, showing warnings without sending sensitive data to external services.
                  </p>
                </div>

                <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                  <img
                    alt="Biosecurity scanner UI detecting hazardous signatures locally"
                    src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png"
                    className="h-[min(152px,40cqw)] object-cover"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
            </div>

            {/* Editor, export, and code example */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-zinc-800 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Editor, Export & Integrations</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-zinc-400 max-lg:text-center">
                    Monaco-powered editor with FASTA support, 2D/3D visualizations, and local export (FASTA, PDF). Lightweight APIs let you script analyses while keeping data local.
                  </p>
                </div>

                <div className="relative min-h-120 w-full grow">
                  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-zinc-900/60 outline outline-white/10">
                    <div className="flex bg-zinc-900 outline outline-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-zinc-400">
                        <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                          sequence.fasta
                        </div>
                        <div className="border-r border-zinc-600/10 px-4 py-2">translate.worker.ts</div>
                      </div>
                    </div>

                    <div className="px-6 pt-6 pb-14">
                      <pre className="rounded-md bg-transparent text-sm/6 text-zinc-200">
                        {`>Example_Gene
ATGCGTACGTAGCTAGCTAGCTAGCTA

// translate.worker.ts (simplified)
export function translateDNA(dna: string): string {
  const table: Record<string,string> = {
    'ATG':'M','GCT':'A','GCC':'A','GCA':'A','GCG':'A',
    'TGA':'*','TAA':'*','TAG':'*'
    // ...full codon table omitted for brevity
  };
  let protein = '';
  const seq = dna.replace(/[^ATGCN]/gi, '').toUpperCase();
  for (let i = 0; i + 2 < seq.length; i += 3) {
    protein += table[seq.slice(i, i + 3)] ?? '-';
  }
  return protein;
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-1">
        <div className="mx-auto container px-6 lg:px-8">
          <dl
            className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3"
            aria-label="Nuxron product statistics"
          >
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-zinc-400 whitespace-nowrap">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {stat.displayValue}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] opacity-10" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] shadow-xl ring-1 shadow-indigo-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            alt="Nuxron — privacy-first bioinformatics studio logo"
            src="/logo.png"
            className="mx-auto h-12 dark:invert"
          />

          <figure className="mt-10">
            <blockquote className="text-center text-xl/8 font-semibold dark:text-white sm:text-2xl/9 italic">
              <p>
                “Nuxron transformed our lab onboarding — students can explore sequence
                translation and 3D visualizations without any server setup. The client‑side
                biosecurity screening and local storage gave our team the confidence to use
                Nuxron in sensitive projects while keeping all data on-device.”
              </p>
            </blockquote>

            <figcaption className="mt-10">
              <img
                alt="Dr. Aiko Tanaka — portrait"
                src="https://i.pinimg.com/1200x/af/1b/f1/af1bf11aad0f629f4ebd2cf1848c598d.jpg"
                className="mx-auto h-24 w-24 rounded-full object-cover"
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold dark:text-white">Dr. Aiko Tanaka</div>
                <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-white">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <div className="dark:text-zinc-400 text-zinc-600">Assistant Professor, Molecular Biology — Kyoto University</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="bg-gray-900">
        <div className="mx-auto container py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-800 px-6 pt-16 after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-white/10 sm:rounded-3xl sm:px-16 after:sm:rounded-3xl md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            >
              <circle r={512} cx={512} cy={512} fill="url(#nuxron-gradient)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="nuxron-gradient">
                  <stop stopColor="#00E6C9" />
                  <stop offset={1} stopColor="#6BD1FF" />
                </radialGradient>
              </defs>
            </svg>

            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                Explore DNA, privately, instantly, in your browser
              </h2>

              <p className="mt-6 text-lg/8 text-pretty text-gray-300">
                Nuxron is a local‑first bioinformatics studio, edit FASTA, visualize a 3D helix, run GC and translation
                simulations in a Web Worker, and export results (FASTA/PDF), all without uploading your data.
              </p>

              <div className="mt-6 flex items-center gap-3 text-sm text-gray-400">
                <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-1 text-xs font-medium whitespace-nowrap">
                  MIT · Open Source
                </span>
                <span className="text-xs">•</span>
                <span>Client‑side IndexedDB storage · Web Worker simulations</span>
              </div>
            </div>

            <div className="relative mt-16 h-80 lg:mt-8 lg:w-180">
              <DnaHero className="rounded-t-4xl" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
