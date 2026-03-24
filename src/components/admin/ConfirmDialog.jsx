'use no memo';
import Modal from "./Modal";

/**
 * Delete confirmation dialog.
 * Props: isOpen, onClose, onConfirm, message
 */
export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  message,
  title = "Confirm Delete",
  confirmText = "Delete",
  confirmButtonClass = "bg-red-600 hover:bg-red-500 shadow-red-500/20"
}) {
  function handleConfirm() {
    // Just call onConfirm — if it's async, it manages its own close via finally
    onConfirm();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-slate-600 text-sm leading-relaxed mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className={`px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition cursor-pointer shadow-md ${confirmButtonClass}`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
