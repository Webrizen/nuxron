/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register standard font if needed, otherwise Helvetica is default
// Font.register({ family: 'Inter', src: '...' });

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 40,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 24,
        color: '#0F172A',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 10,
        color: '#64748B',
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#334155',
    },
    text: {
        fontSize: 10,
        marginBottom: 5,
        color: '#475569',
        lineHeight: 1.5,
    },
    sequenceContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#F8FAFC',
        borderRadius: 5,
    },
    sequenceText: {
        fontFamily: 'Courier',
        fontSize: 10,
        lineHeight: 1.5,
        color: '#334155',
        overflow: 'hidden',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        fontSize: 8,
        textAlign: 'center',
        color: '#94A3B8',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingTop: 10
    }
});

interface ProjectData {
    name: string;
    type: string;
    created: number;
    updated: number;
    sequence: string;
}

// Function to chunk sequence for PDF rendering (prevent simple truncation if engine supports wrapping, but explicit chunking often safer for large text blocks in react-pdf)
const chunkString = (str: string, length: number) => {
    return str.match(new RegExp('.{1,' + length + '}', 'g')) || [];
};

export const ProjectPDF = ({ data }: { data: ProjectData }) => {
    // Basic cleaning
    const rawSeq = data.sequence.replace(/>.*\n?/, "").replace(/[^a-zA-Z]/g, "").toUpperCase();
    const length = rawSeq.length;
    const gcCount = (rawSeq.match(/[GC]/g) || []).length;
    const gcPercent = length > 0 ? ((gcCount / length) * 100).toFixed(2) : "0";

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Nuxron Report</Text>
                        <Text style={styles.subtitle}>Generated on {new Date().toLocaleDateString()}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 10, color: '#64748B' }}>Project: {data.name}</Text>
                        <Text style={{ fontSize: 8, color: '#94A3B8' }}>{data.type}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <Text style={styles.text}>Sequence Length: {length} bp</Text>
                    <Text style={styles.text}>GC Content: {gcPercent}%</Text>
                    <Text style={styles.text}>Created: {new Date(data.created).toLocaleString()}</Text>
                </View>

                <View style={styles.section} wrap={false}>
                    <Text style={styles.sectionTitle}>Sequence Preview</Text>
                    <View style={styles.sequenceContainer}>
                        <Text style={styles.sequenceText}>
                            {/* React-PDF handles wrapping reasonably well for monospace text usually */}
                            {rawSeq.substring(0, 3000)}
                            {rawSeq.length > 3000 ? "\n... (sequence truncated for PDF preview)" : ""}
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text>Nuxron - Private, Client-Side Bioinformatics</Text>
                </View>
            </Page>
        </Document>
    );
};
