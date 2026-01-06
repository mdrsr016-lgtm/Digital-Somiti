import { TranslationKey, translations, Language } from "../data/translations";

interface ForgotPasswordModalProps {
  show: boolean;
  onClose: () => void;
  language: Language;
}

export function ForgotPasswordModal({
  show,
  onClose,
  language,
}: ForgotPasswordModalProps) {
  if (!show) return null;

  const t = translations[language];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{t.modalTitle}</h3>
        <p className="modal-message">{t.modalMessage}</p>
        <button className="modal-button" onClick={onClose}>
          {t.modalButton}
        </button>
      </div>
    </div>
  );
}
