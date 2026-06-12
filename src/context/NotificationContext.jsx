import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { FiCheckCircle, FiX, FiXCircle } from "react-icons/fi";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notice, setNotice] = useState(null);

  const notify = useCallback((message, type = "success") => {
    setNotice({ message, type });
    window.setTimeout(() => setNotice(null), 4000);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notice && (
        <div className="fixed right-4 top-4 z-[100] flex max-w-sm items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl">
          {notice.type === "error" ? (
            <FiXCircle className="shrink-0 text-xl text-red-500" />
          ) : (
            <FiCheckCircle className="shrink-0 text-xl text-emerald-500" />
          )}
          <p className="text-sm font-semibold text-ink">{notice.message}</p>
          <button onClick={() => setNotice(null)} aria-label="Dismiss">
            <FiX className="text-slate-400" />
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
