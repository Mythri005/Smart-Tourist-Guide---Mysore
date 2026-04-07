import React from 'react';

const styles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '1.5rem',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s',
        cursor: 'pointer'
    },
    icon: {
        fontSize: '2.5rem',
        marginBottom: '0.5rem'
    },
    value: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '0.25rem'
    },
    label: {
        fontSize: '0.9rem',
        color: '#7f8c8d'
    }
};

function DashboardCard({ icon, value, label, color, onClick }) {
    return (
        <div 
            style={{
                ...styles.card,
                borderTop: `4px solid ${color}`,
                cursor: onClick ? 'pointer' : 'default'
            }}
            onClick={onClick}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={styles.icon}>{icon}</div>
            <div style={styles.value}>{value}</div>
            <div style={styles.label}>{label}</div>
        </div>
    );
}

export default DashboardCard;