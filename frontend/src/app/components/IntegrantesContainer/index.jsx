'use client';

import React from 'react';
import styles from './style.module.css';

export default function IntegrantesContainer(props) {
    const informations = props.data;

    const students = informations?.informationsGroup.students || [];
    return (
        <div className={styles.container}>
            {students.map((student) => (
                <p>{student}</p>
            ))}
        </div>
    );
}