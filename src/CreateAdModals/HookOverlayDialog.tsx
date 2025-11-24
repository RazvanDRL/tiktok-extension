"use client";

import { useState } from "react";
import Modal from "~components/Modal";

interface HookOverlayDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    text: string,
    position: "top" | "center" | "bottom",
    hookTimeLimit?: number
  ) => void;
}

export default function HookOverlayDialog({
  isOpen,
  onClose,
  onSave,
}: HookOverlayDialogProps) {
  const [text, setText] = useState("");
  const [position, setPosition] = useState<"top" | "center" | "bottom">(
    "center"
  );
  const [hookTimeLimit, setHookTimeLimit] = useState<number>(3);

  const stopKeyPropagation = (event: React.KeyboardEvent) => {
    event.stopPropagation();
    const nativeEvent = event.nativeEvent as KeyboardEvent & {
      stopImmediatePropagation?: () => void;
    };
    nativeEvent.stopImmediatePropagation?.();
  };

  const handleSave = () => {
    if (!text.trim()) {
      return;
    }
    onSave(text, position, hookTimeLimit);
    // Don't call onClose() here - let parent handle the transition
    setText("");
    setPosition("center");
    setHookTimeLimit(3);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='w-full max-w-xl'
    >
      <div
        className='flex flex-col gap-5 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 shadow-xl p-6'
        style={{ backgroundColor: '#0f172a' }}
      >
        <div>
          <h2 className='text-xl font-bold text-slate-100 mb-1'>Hook Overlay</h2>
          <p className='text-sm text-slate-300'>
            Choose a hook, position and time limit. This text will be burned into the ad.
          </p>
        </div>

        <div className='space-y-2'>
          <label htmlFor='hook-text' className='block text-sm font-medium text-slate-200'>
            Hook Text
          </label>
          <textarea
            id='hook-text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter your hook text...'
            rows={8}
            onKeyDown={stopKeyPropagation}
            onKeyUp={stopKeyPropagation}
            className='w-full p-3 text-sm text-slate-100 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 placeholder-slate-400 resize-none'
            style={{ backgroundColor: '#1e293b', color: '#f1f5f9', borderColor: '#334155' }}
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-200'>
            Position
          </label>
          <div className='flex gap-2'>
            {(['top', 'center', 'bottom'] as const).map((pos) => (
              <button
                key={pos}
                type='button'
                onClick={() => setPosition(pos)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${position === pos
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                  }`}
                style={
                  position === pos
                    ? { backgroundColor: '#2563eb' }
                    : { backgroundColor: '#1e293b', borderColor: '#334155' }
                }
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <div className='space-y-2'>
          <label htmlFor='hook-time-limit' className='block text-sm font-medium text-slate-200'>
            Hook Time Limit (seconds)
          </label>
          <input
            id='hook-time-limit'
            type='number'
            value={hookTimeLimit}
            onChange={(e) => setHookTimeLimit(Number(e.target.value))}
            placeholder='3'
            min={1}
            max={10}
            onKeyDown={stopKeyPropagation}
            onKeyUp={stopKeyPropagation}
            className='w-full p-3 text-sm text-slate-100 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 placeholder-slate-400'
            style={{ backgroundColor: '#1e293b', color: '#f1f5f9', borderColor: '#334155' }}
          />
        </div>

        <div className='flex gap-3 justify-end pt-4'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800 rounded-lg hover:bg-slate-700 border border-slate-700 transition-colors'
            style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleSave}
            disabled={!text.trim()}
            className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            style={{ backgroundColor: '#2563eb' }}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
