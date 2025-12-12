import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { ProjectPDF } from '@/components/export/pdf-document';
import React from 'react';

interface ProjectData {
    name: string;
    type: string;
    created: number;
    updated: number;
    sequence: string;
}

export const downloadFASTA = (project: ProjectData) => {
    const header = `> ${project.name} | ${project.type} | Downloaded from Nuxron`;
    // Ensure sequence is clean for FASTA
    const cleanSeq = project.sequence.replace(/>.*\n?/, "").replace(/[^a-zA-Z]/g, "").toUpperCase();
    const formattedSeq = cleanSeq.match(/.{1,80}/g)?.join('\n') || cleanSeq;

    const content = `${header}\n${formattedSeq}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${project.name.replace(/\s+/g, '_')}.fasta`);
};

export const downloadPDF = async (project: ProjectData) => {
    try {
        // We use the pdf() function from render to create a blob
        // Note: ProjectPDF is a react component
        const blob = await pdf(<ProjectPDF data={ project } />).toBlob();
        saveAs(blob, `${project.name.replace(/\s+/g, '_')}_report.pdf`);
    } catch (e) {
        console.error("PDF Generation failed", e);
        alert("Failed to generate PDF. See console for details.");
    }
};
