export interface SafetyCheckResult {
    safe: boolean;
    reason?: string;
    match?: string;
}

// Mock blocklist for demonstration
// In a real app, this would be a large compressed generic bloom filter or similar
const HAZARDOUS_SIGNATURES: Record<string, string> = {
    'GATACA': 'Restricted Sequence (Dummy)', // Toy example
    'TTTTTCCCCC': 'Synthetic Polymer Repeat (Dummy)',
    // Anthrax toxin fragments (mock for demo)
    'ATGCATGCATGC': 'Bacillus anthracis toxin fragment (Mock)',
};

/**
 * Checks a DNA sequence against local blocklists of known pathogens/toxins.
 * This runs entirely client-side.
 */
export async function checkSequence(sequence: string): Promise<SafetyCheckResult> {
    const normalized = sequence.toUpperCase().replace(/[^a-zA-Z]/g, "").replace(/\s/g, "");

    // Simple scan
    for (const [sig, reason] of Object.entries(HAZARDOUS_SIGNATURES)) {
        if (normalized.includes(sig)) {
            return {
                safe: false,
                reason: reason,
                match: sig
            };
        }
    }

    // Heuristics (e.g. extremely low complexity)
    // const uniqueBases = new Set(normalized).size;
    // if (normalized.length > 50 && uniqueBases < 3) {
    //      return { safe: false, reason: "Low complexity sequence (potential repetitive element)" };
    // }

    return { safe: true };
}
