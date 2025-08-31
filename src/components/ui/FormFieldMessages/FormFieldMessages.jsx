import React from "react";
import styles from "./FormFieldMessages.module.css";

const FormFieldMessages = ({ messages = [] }) => {
  if (!messages || messages.length === 0) return null;

  return (
    <ul className={styles.messageList}>
      {messages.map((msg, index) => (
        <li
          key={index}
          className={`${styles.message} ${styles[msg.type || "info"]}`}
        >
          {msg.text}
        </li>
      ))}
    </ul>
  );
};

export default FormFieldMessages;
