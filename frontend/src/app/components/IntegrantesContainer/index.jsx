'use client';

import React from 'react';
import styles from './style.module.css';

export default function IntegrantesContainer({ students, mentor }) {
    
    const integrantes = [];

    if (mentor) {
        integrantes.push({ name: mentor, role: 'mentor' });
    }

    if (students && students.length > 0) {
        students.forEach(studentName => {
            integrantes.push({ name: studentName, role: 'student' });
        });
    }
    
    return (
        <div className={styles.integrantesContent}> 
            <div className={styles.linesContainer}> 
                
                {integrantes.map((integrante, index) => (
                    <div 
                        key={index} 
                        className={styles.integranteBlock} 
                    >
                        <p className={
                            integrante.role === 'mentor' ? styles.mentorName : styles.studentName
                        }>
                            {integrante.name} 
                            {integrante.role === 'mentor' && " (Mentor)"} 
                        </p>
                        
                        <div className={styles.line}></div> 
                    </div>
                ))}
                
                {integrantes.length === 0 && (
                    <p className={styles.emptyMessage}>Nenhum integrante cadastrado neste grupo.</p>
                )}
            </div>
        </div>
    );
}