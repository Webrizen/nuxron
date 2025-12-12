// Basic analysis worker
// We use a plain TS file that will be imported as a worker 

self.onmessage = (e: MessageEvent) => {
    const { type, sequence, id } = e.data;

    if (!sequence) {
        self.postMessage({ id, error: "No sequence provided" });
        return;
    }

    try {
        let result = null;
        const normalized = sequence.replace(/>.*\n?/, "").replace(/[^a-zA-Z]/g, "").toUpperCase();

        switch (type) {
            case 'gc-content':
                result = calculateGC(normalized);
                break;
            case 'translation':
                result = translate(normalized);
                break;
            case 'mw':
                result = calculateMW(normalized);
                break;
            default:
                throw new Error("Unknown job type");
        }

        self.postMessage({ id, result, status: 'complete' });

    } catch (err: any) {
        self.postMessage({ id, error: err.message, status: 'error' });
    }
};

function calculateGC(seq: string) {
    let gc = 0;
    for (let i = 0; i < seq.length; i++) {
        if (seq[i] === 'G' || seq[i] === 'C') gc++;
    }
    return {
        percentage: (gc / seq.length) * 100,
        count: gc,
        total: seq.length
    };
}

function translate(dna: string) {
    const table: Record<string, string> = {
        'ATA': 'I', 'ATC': 'I', 'ATT': 'I', 'ATG': 'M',
        'ACA': 'T', 'ACC': 'T', 'ACG': 'T', 'ACT': 'T',
        'AAC': 'N', 'AAT': 'N', 'AAA': 'K', 'AAG': 'K',
        'AGC': 'S', 'AGT': 'S', 'AGA': 'R', 'AGG': 'R',
        'CTA': 'L', 'CTC': 'L', 'CTG': 'L', 'CTT': 'L',
        'CCA': 'P', 'CCC': 'P', 'CCG': 'P', 'CCT': 'P',
        'CAC': 'H', 'CAT': 'H', 'CAA': 'Q', 'CAG': 'Q',
        'CGA': 'R', 'CGC': 'R', 'CGG': 'R', 'CGT': 'R',
        'GTA': 'V', 'GTC': 'V', 'GTG': 'V', 'GTT': 'V',
        'GCA': 'A', 'GCC': 'A', 'GCG': 'A', 'GCT': 'A',
        'GAC': 'D', 'GAT': 'D', 'GAA': 'E', 'GAG': 'E',
        'GGA': 'G', 'GGC': 'G', 'GGG': 'G', 'GGT': 'G',
        'TCA': 'S', 'TCC': 'S', 'TCG': 'S', 'TCT': 'S',
        'TTC': 'F', 'TTT': 'F', 'TTA': 'L', 'TTG': 'L',
        'TAC': 'Y', 'TAT': 'Y', 'TAA': '_', 'TAG': '_',
        'TGC': 'C', 'TGT': 'C', 'TGA': '_', 'TGG': 'W',
    };

    let protein = "";
    for (let i = 0; i < dna.length - 2; i += 3) {
        const codon = dna.substring(i, i + 3);
        protein += table[codon] || "X";
    }
    return protein;
}

function calculateMW(seq: string) {
    // Rough estimate for ssDNA
    return seq.length * 330.15;
}
