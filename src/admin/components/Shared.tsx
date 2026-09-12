import { ReactNode, useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// StatusBadge
// ---------------------------------------------------------------------------

const statusStyles: Record<string, string> = {
  publicado: "bg-gray-900 text-white border-gray-900",
  ativa: "bg-gray-900 text-white border-gray-900",
  ativo: "bg-gray-900 text-white border-gray-900",
  aprovado: "bg-gray-900 text-white border-gray-900",
  respondido: "bg-gray-900 text-white border-gray-900",
  rascunho: "bg-gray-100 text-gray-600 border-gray-200",
  agendado: "bg-red-50 text-[#C41230] border-red-100",
  arquivado: "bg-gray-100 text-gray-500 border-gray-200",
  inativa: "bg-gray-100 text-gray-500 border-gray-200",
  inativo: "bg-gray-100 text-gray-500 border-gray-200",
  pendente: "bg-red-50 text-[#C41230] border-red-100",
  novo: "bg-red-50 text-[#C41230] border-red-100",
  lido: "bg-gray-100 text-gray-600 border-gray-200",
  spam: "bg-[#C41230] text-white border-[#C41230]",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200";
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${cls}`}>
      {status}
    </span>
  );
}

// ---------------------------------------------------------------------------
// EmptyState
// ---------------------------------------------------------------------------

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="text-center py-16 px-6 bg-gray-50 rounded-lg border border-gray-100">
      <div className="w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {action}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TableSkeleton
// ---------------------------------------------------------------------------

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg">
          <div className="skeleton w-10 h-10 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3.5 w-1/3 rounded" />
            <div className="skeleton h-3 w-1/2 rounded" />
          </div>
          <div className="skeleton h-6 w-16 rounded-full flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function useDelayedLoading(deps: unknown[], ms = 350) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return loading;
}

// ---------------------------------------------------------------------------
// ConfirmDialog
// ---------------------------------------------------------------------------

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, description, confirmLabel = "Confirmar", danger, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-sm w-full p-6">
        <h2 id="confirm-dialog-title" className="font-bold text-gray-900 text-base mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{description}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-bold rounded-lg text-white transition-colors ${danger ? "bg-[#C41230] hover:bg-[#9B0E25]" : "bg-gray-900 hover:bg-gray-800"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toast (feedback de sucesso simples)
// ---------------------------------------------------------------------------

export function Toast({ message, onClose }: { message: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-lg shadow-xl flex items-center gap-2" role="status">
      <svg className="w-4 h-4 text-white/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PageHeader
// ---------------------------------------------------------------------------

export function AdminPageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}
