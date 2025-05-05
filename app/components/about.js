import React from 'react';
import Image from 'next/image';
import budgyIcon from '../../public/icon-budgy.png'; // Ensure the image is inside the public folder

const About = () => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Image
                    src={budgyIcon}
                    alt="Budgy Icon"
                    width={80}
                    height={80}
                    style={styles.image}
                />
                <h1 style={styles.title}>About <span style={styles.highlight}>Budgy</span></h1>
                <p style={styles.subtitle}>
                    Your smart assistant for budgeting and expense tracking.
                </p>
            </div>

            <p style={styles.description}>
                Budgy is designed to help you manage your finances effortlessly. Whether you're tracking daily expenses or planning long-term savings, Budgy gives you the tools to stay on track.
            </p>

            <div style={styles.features}>
                <h3 style={styles.sectionHeading}>Key Features</h3>
                <ul style={styles.featureList}>
                    <li>💡 Basic CRUD for categories, budgets & expenses</li>
                    <li>📈 Interactive charts using local data (e.g., Chart.js)</li>
                    <li>🔔 Budget alerts and recurring expense reminders</li>
                </ul>
            </div>

            <div style={styles.details}>
                <h3 style={styles.sectionHeading}>What You Can Do</h3>
                <ul>
                    <li>Create custom categories (e.g., food, utilities)</li>
                    <li>Track expenses against each category</li>
                    <li>Visualize spending with charts</li>
                    <li>Receive alerts when nearing budget limits</li>
                    <li>Set up recurring expenses</li>
                </ul>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '60px 30px',
        backgroundColor: '#fdfefe',
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2c3e50',
        lineHeight: '1.6',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    image: {
        marginBottom: '10px',
    },
    title: {
        fontSize: '2.5rem',
        margin: '10px 0 5px',
        fontWeight: 700,
    },
    highlight: {
        color: '#3B82F6',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#6b7280',
    },
    description: {
        fontSize: '1.1rem',
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto 40px',
        color: '#444',
    },
    sectionHeading: {
        fontSize: '1.4rem',
        fontWeight: 600,
        marginBottom: '12px',
        color: '#3B82F6',
    },
    features: {
        backgroundColor: '#f1f5f9',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '30px',
    },
    featureList: {
        listStyleType: 'none',
        paddingLeft: 0,
        lineHeight: '1.8',
    },
    details: {
        backgroundColor: '#eef2f7',
        padding: '20px',
        borderRadius: '10px',
    },
};

export default About;
