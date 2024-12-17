// /pages/index.js
"use client";
import Popup from "@/components/popup/popup";
import { useState } from "react";
import styles from "./page.module.scss";

const HomePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.homePage}>
      <button onClick={openPopup}>Sign In</button>
      <Popup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default HomePage;
