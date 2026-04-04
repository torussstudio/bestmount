import Modal from "./Modal";
import { FiAlertTriangle } from "react-icons/fi";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,

  message,

  title = "Confirm Action",

  confirmText = "Confirm",

  confirmButtonClass = "bg-red-600 hover:bg-red-500 shadow-red-900/30 cursor-pointer",
}) {
  function handleConfirm() {
    onConfirm();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center px-2 py-1">
        {/* icon */}
        <div className="mb-4 w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <FiAlertTriangle className="text-red-500 text-xl" />
        </div>

        {/* title */}
        <h3 className="text-base font-semibold text-slate-800">{title}</h3>

        {/* message */}
        <p className="text-slate-500 text-sm mt-2 leading-relaxed">{message}</p>

        {/* buttons */}
        <div className="flex gap-3 mt-6 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className={`flex-1 py-2.5  cursor-pointer rounded-xl text-white text-sm font-semibold transition shadow-lg ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
