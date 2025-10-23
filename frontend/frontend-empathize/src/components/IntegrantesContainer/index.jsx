import React from "react";
import styles from "./style.module.css";

export default function IntegrantesContainer() {
  const placeholderCount = 7;

  return (
    // Esta div .integrantesContent ocupa toda a área abaixo do título
    <div className={styles.integrantesContent}> 
      
      <div className={styles.linesContainer}>
        {/* A lógica visual para as 7 linhas (placeholders) */}
        {[...Array(placeholderCount)].map((_, i) => (
          <div key={i} className={styles.line}></div>
        ))}
        {/* Futuramente, esta será a área onde você fará o mapeamento dos dados do backend */}
      </div>
      
    </div>
  );
}