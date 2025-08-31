import React, { useState } from 'react'
import styles from './CollapsibleSection.module.css'

const CollapsibleSection = ({ header, subHeader, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader} onClick={() => setCollapsed((prev) => !prev)}>
        <div className={styles.headerText}>
          <h2>{header}</h2>
          {subHeader && <h4>{subHeader}</h4>}
        </div>
        <button>
          <span className={`${styles.arrow} ${!collapsed ? styles.expanded : ''}`}>
            ▶
          </span>
        </button>
      </div>

      <div
        className={`${styles.fieldsWrapper} ${
          collapsed ? styles.collapsed : styles.expanded
        }`}
      >
        <div className={styles.fieldsContainer}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default CollapsibleSection;
