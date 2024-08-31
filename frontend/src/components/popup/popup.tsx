import SignInForm from "@/components/login/login";
import styles from "./popup.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Popup({ isOpen, onClose }: Props) {
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
}
