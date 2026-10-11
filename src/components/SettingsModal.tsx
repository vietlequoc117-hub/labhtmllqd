import React from 'react';
import {
  X,
  Sliders
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: number;
  onChangeFontSize: (size: number) => void;
  customApiKey?: string;
  onSaveApiKey?: (key: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  fontSize,
  onChangeFontSize,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Cài đặt phòng thực hành ảo</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 text-xs text-slate-300">
          {/* Font Size Option */}
          <div>
            <label className="font-bold text-slate-200 block mb-2">
              Cỡ chữ trình soạn thảo (Font size)
            </label>
            <p className="text-[11px] text-slate-400 mb-3">
              Điều chỉnh kích thước chữ hiển thị trong khung soạn thảo HTML &amp; CSS:
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[12, 14, 16, 18].map((size) => (
                <button
                  key={size}
                  onClick={() => onChangeFontSize(size)}
                  className={`py-2 rounded-lg border font-semibold transition cursor-pointer ${
                    fontSize === size
                      ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  {size}px
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-950/70 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer shadow-sm"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};
