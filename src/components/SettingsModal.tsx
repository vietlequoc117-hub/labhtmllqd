import React, { useState } from 'react';
import {
  X,
  Key,
  Sliders,
  Check,
  ShieldAlert,
  Info
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: number;
  onChangeFontSize: (size: number) => void;
  customApiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  fontSize,
  onChangeFontSize,
  customApiKey,
  onSaveApiKey,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState(customApiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(apiKeyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

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
            className="p-1 text-slate-400 hover:text-white rounded-lg transition"
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
            <div className="grid grid-cols-4 gap-2">
              {[12, 14, 16, 18].map((size) => (
                <button
                  key={size}
                  onClick={() => onChangeFontSize(size)}
                  className={`py-2 rounded-lg border font-semibold transition cursor-pointer ${
                    fontSize === size
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  {size}px
                </button>
              ))}
            </div>
          </div>

          {/* Gemini API Key Setting */}
          <div className="space-y-2 border-t border-slate-800 pt-4">
            <label className="font-bold text-slate-200 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-purple-400" />
              <span>Khóa API Gemini (Tùy chọn)</span>
            </label>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Nếu bạn muốn sử dụng khóa API Gemini cá nhân hoặc khi chạy ứng dụng trên máy không có sẵn biến môi trường máy chủ:
            </p>

            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Nhập khóa API Gemini (AIzaSy...)"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
              <Info className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <span>
                Khóa API này sẽ được lưu trong bộ nhớ trình duyệt (localStorage) của bạn và chỉ gửi qua kênh an toàn khi bạn nhờ AI trợ giúp.
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-950/70 border-t border-slate-800 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-medium transition cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer shadow-sm"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Đã lưu!</span>
              </>
            ) : (
              <span>Lưu thay đổi</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
