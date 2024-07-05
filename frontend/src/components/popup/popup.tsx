import SignInForm from "@/components/login/login";
import styles from "./popup.module.scss";

const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div onClick={onClose} className={styles.popupOverlay}></div>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <SignInForm close={onClose} />
      </div>
    </div>
  );
};

export default Popup;
