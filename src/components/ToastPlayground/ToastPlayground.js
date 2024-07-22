import React, { useCallback, useState } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = useState("");
  const [checkedOption, setCheckedOption] = useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = useState([]);

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleChangeOption = (e) => {
    setCheckedOption(e.target.value);
  };

  const handleSubmit = () => {
    setToasts((currentValue) => [
      ...currentValue,
      { id: Math.random(), message, variant: checkedOption },
    ]);
    setMessage("");
    setCheckedOption(VARIANT_OPTIONS[0]);
  };

  const handleRemoveItem = useCallback(
    (id) => {
      const filterToasts = toasts.filter((item) => id !== item.id);
      setToasts([...filterToasts]);
    },
    [toasts]
  );

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              onChange={handleChangeMessage}
              value={message}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {/* TODO Other Variant radio buttons here */}
            {VARIANT_OPTIONS.map((option) => (
              <label htmlFor={`$variant-${option}`} key={Math.random()}>
                <input
                  id={`$variant-${option}`}
                  type="radio"
                  name="variant"
                  value={option}
                  checked={option === checkedOption}
                  onChange={handleChangeOption}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={handleSubmit}>Pop Toast!</Button>
          </div>
        </div>
      </div>
      <ToastShelf toasts={toasts} handleRemoveItem={handleRemoveItem} />
    </div>
  );
}

export default ToastPlayground;
