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
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  fontSize,
  onChangeFontSize,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-slate-800">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Cài đặt phòng thực hành ảo</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 text-xs text-slate-700">
          {/* Font Size Option */}
          <div>
            <label className="font-bold text-slate-900 block mb-2">
              Cỡ chữ trình soạn thảo (Font size)
            </label>
            <p className="text-[11px] text-slate-500 mb-3">
              Điều chỉnh kích thước chữ hiển thị trong khung soạn thảo HTML &amp; CSS:
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[12, 14, 16, 18].map((size) => (
                <button
                  key={size}
                  onClick={() => onChangeFontSize(size)}
                  className={`py-2 rounded-lg border font-semibold transition cursor-pointer ${
                    fontSize === size
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {size}px
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer shadow-xs"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};
