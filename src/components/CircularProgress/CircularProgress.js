import React from 'react';
import styles from './CircularProgress.module.scss';


const CircularProgress = ({ progress, size = 100, strokeWidth = 10, color = '#4caf50' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className={styles.svgContainer}>
            <svg width={size} height={size}>
                <circle
                    className={styles.circleBackground}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e0e0e0"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    className={styles.progressCircle}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                />
                <text
                    x="50%"
                    y="50%"
                    className={styles.progressText}
                >
                    {progress}%
                </text>
            </svg>
        </div>
    );
};

export default CircularProgress;
