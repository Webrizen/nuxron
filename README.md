# Nuxron 🧬

**Nuxron** is a privacy-first, client-side bioinformatics studio designed for researchers, students, and hobbyists. It allows you to edit, visualize, and simulate DNA sequences directly in your browser without uploading data to a central server.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/stack-Next.js_15_|_Three.js_|_D3.js-black)

---

## 📚 Table of Contents
- [Introduction](#introduction)
- [Core Concepts (Theory)](#core-concepts-theory)
- [How to Use](#how-to-use)
  - [Entering Data](#entering-data)
  - [Visualizations](#visualizations)
  - [Simulations](#simulations)
  - [Exporting](#exporting)
- [Safety System](#safety-system)
- [Technical Architecture](#technical-architecture)

---

## Introduction

Traditional bioinformatics tools often require complex command-line setups or cloud-based platforms that compromise data privacy. **Nuxron** runs entirely on your local machine via the browser. It combines a professional code editor (Monaco) with high-performance 2D/3D graphics and multi-threaded simulation engines.

**Key Features:**
*   **Zero-Server Persistence**: Your data is stored in your browser's IndexedDB.
*   **Interactive Editing**: Syntax highlighting for DNA sequences.
*   **3D Visualization**: Procedural generation of DNA double helix structures.
*   **Simulations**: Calculate GC content and translate DNA to Protein in the background.

---

## Core Concepts (Theory)

If you are new to bioinformatics, here are the basics you need to know to use this tool effectively:

### 1. The Sequence (DNA)
DNA is composed of four nucleotides represented by letters:
*   **A** (Adenine)
*   **T** (Thymine)
*   **G** (Guanine)
*   **C** (Cytosine)

Nuxron expects input in this 4-letter alphabet. (Currently, 'N' is also supported for unknown bases).

### 2. Complementarity
DNA is double-stranded. 
*   **A** pairs with **T**
*   **G** pairs with **C**
Nuxron automatically calculates and displays this "Reverse Complement" in the 3D view and simulations.

### 3. Translation (The Central Dogma)
DNA is transcribed into RNA, which is then **translated** into Proteins (chains of amino acids). 
*   **Simulation**: The "Translate" feature simulates this process, converting your DNA text strings into Protein amino acid codes (e.g., "M-K-L-V...").

---

## How to Use

### 🚀 Getting Started
1.  **Install**: Ensure you have Node.js installed. Run `npm install` in the project directory.
2.  **Run**: Execute `npm run dev`.
3.  **Open**: Navigate to `http://localhost:3000` in your browser.

### ✍️ Entering Data
You can enter DNA data in two ways:
1.  **Manual Entry**: Type directly into the editor. It functions like a code editor (VS Code).
    *   Valid characters: `A`, `T`, `G`, `C`, `N`.
    *   Comments: Lines starting with `>` are treated as headers (FASTA format style).
    *   *Example*:
        ```text
        > My Synthetic Gene
        ATGCGTACGTAGCTAGCTAGCTAGCTA...
        ```
2.  **File Import** (Coming Soon): The UI supports the flow for `.fasta` or `.gb` file uploads (currently parses text content).

### 👁️ Visualizations
The "Visualization" panel on the right offers three modes:
1.  **Linear View (2D)**: A flat map of your sequence. Useful for navigating long genes. showing the base pair scale.
2.  **Circular View (Plasmid)**: Wraps the sequence into a circle. Ideal for bacterial plasmids.
3.  **3D View (WebGL)**: Generates a 3D double-helix model.
    *   **Controls**: Left-click to rotate, Right-click to pan, Scroll to zoom.
    *   **Colors**: A=Green, T=Red, G=Blue, C=Yellow.

### 🧪 Simulations
Navigate to the **Simulations** dashboard (via URL `/simulate` or Dashboard link):
1.  **GC Content**: Calculates the percentage of G and C bases (important for stability analysis).
2.  **Translation**: Converts your DNA sequence into a protein string.
    *   *Note*: These run in a **Web Worker**, so they won't freeze your UI even for long sequences.

### 📤 Exporting
You can save your work locally:
1.  Click the **Tools** -> **Export** button in the editor toolbar.
2.  **FASTA**: Downloads a standard `.fasta` text file compatible with other tools (BLAST, SnapGene).
3.  **PDF Report**: Generates a professional PDF summary including the project name, date, statistics (GC%, Length), and sequence preview.

---

## Safety System ⚠️

Nuxron includes a proof-of-concept **Client-Side Biosecurity Screen**.
It scans your sequence in real-time against a local "Blocklist" of hazardous signatures (e.g., toxins, pathogens).

*   **How to Test**: Type `ATGCATGCATGC` (a mock hazard signature) into the editor.
*   **Result**: A red "Biohazard Detected" alert will appear.
*   *Note*: In a real-world deployment, this would use hashed signatures to detect regulated pathogens without revealing the specific target to the user.

---

## Technical Architecture

This project uses a modern "Local-First" architecture:

*   **Frontend**: Next.js 15 (App Router), React 19.
*   **Styling**: Tailwind CSS + shadcn/ui.
*   **Editor Engine**: Monaco Editor (VS Code engine) with custom Monarch tokenizer for DNA.
*   **State Management**: Zustand (for reactive state) + IndexedDB (for persisting large genomic files).
*   **Graphics**: 
    *   `D3.js` for SVG-based data visualization.
    *   `@react-three/fiber` (Three.js) for WebGL 3D rendering.

No data is sent to the cloud. You own your genome.
