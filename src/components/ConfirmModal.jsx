import { FiAlertTriangle, FiX } from "react-icons/fi";

export default function ConfirmModal({ open, title, message, confirmLabel = "Delete", busy, onConfirm, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-xl text-red-600"><FiAlertTriangle /></span>
          <button onClick={onClose} className="text-xl text-slate-400" aria-label="Close"><FiX /></button>
        </div>
        <h2 className="mt-5 text-xl font-bold text-ink">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{message}</p>
        <div className="mt-7 flex justify-end gap-3">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60" disabled={busy} onClick={onConfirm}>
            {busy ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
