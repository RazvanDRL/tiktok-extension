"use client";

import { useState, useEffect } from "react";
import Modal from "~components/Modal";
import { Label } from "~components/ui/label";
import { Checkbox } from "~components/ui/checkbox";
import { Input } from "~components/ui/input";
import type { IAudio } from "~models/videos";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "~firebase/firebaseClient";
import MiniLoading from "~components/MiniLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

export interface AudioConfig {
  selectedAudios: IAudio[];
  audioVolume: number;
  audioMusicIncreaseThreshold: number;
  audioOffset: number;
  hookKeepSound: boolean;
  bodyKeepSound: boolean;
}

interface AudioSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (audioConfig: AudioConfig) => void;
  language: string;
}

export default function AudioSelectionDialog({
  isOpen,
  onClose,
  onSave,
  language,
}: AudioSelectionDialogProps) {
  const [audios, setAudios] = useState<IAudio[]>([]);
  const [selectedAudios, setSelectedAudios] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(
    null
  );
  const [playingAudio, setPlayingAudio] = useState<string>("");

  // Audio configuration states
  const [audioVolume, setAudioVolume] = useState<number>(40);
  const [audioMusicIncreaseThreshold, setAudioMusicIncreaseThreshold] =
    useState<number>(0);
  const [audioOffset, setAudioOffset] = useState<number>(0);
  const [hookKeepSound, setHookKeepSound] = useState<boolean>(true);
  const [bodyKeepSound, setBodyKeepSound] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      fetchAudios();
    }
  }, [isOpen, language]);

  const fetchAudios = async () => {
    setLoading(true);
    try {
      const audiosQuery = query(
        collection(db, "audios"),
        orderBy("addedOn", "desc")
      );
      const querySnapshot = await getDocs(audiosQuery);
      const audiosList: IAudio[] = [];
      querySnapshot.forEach((doc) => {
        audiosList.push({
          _firestore_id: doc.id,
          ...doc.data(),
        } as IAudio);
      });
      setAudios(audiosList);
    } catch (error) {
      console.error("Error fetching audios:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAudio = (audioId: string) => {
    setSelectedAudios((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(audioId)) {
        newSet.delete(audioId);
      } else {
        newSet.add(audioId);
      }
      return newSet;
    });
  };

  const playAudio = (audioUrl: string) => {
    if (audioInstance) {
      audioInstance.pause();
      if (playingAudio === audioUrl) {
        setAudioInstance(null);
        setPlayingAudio("");
        return;
      }
    }

    const audio = new Audio(audioUrl);
    audio.play();
    setAudioInstance(audio);
    setPlayingAudio(audioUrl);

    audio.onended = () => {
      setAudioInstance(null);
      setPlayingAudio("");
    };
  };

  const stopKeyPropagation = (event: React.KeyboardEvent) => {
    event.stopPropagation();
    const nativeEvent = event.nativeEvent as KeyboardEvent & {
      stopImmediatePropagation?: () => void;
    };
    nativeEvent.stopImmediatePropagation?.();
  };

  const handleSave = () => {
    const selected = audios.filter((audio) =>
      selectedAudios.has(audio._firestore_id!)
    );

    const audioConfig: AudioConfig = {
      selectedAudios: selected,
      audioVolume,
      audioMusicIncreaseThreshold,
      audioOffset,
      hookKeepSound,
      bodyKeepSound,
    };

    onSave(audioConfig);
    setSelectedAudios(new Set());
    if (audioInstance) {
      audioInstance.pause();
      setAudioInstance(null);
      setPlayingAudio("");
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='w-full max-w-2xl'
    >
      <div
        className='flex flex-col gap-5 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 shadow-xl p-6'
        style={{ backgroundColor: '#0f172a' }}
      >
        <div>
          <h2 className='text-xl font-bold text-slate-100 mb-1'>Select Audio/Songs</h2>
          <p className='text-sm text-slate-300'>
            Choose background audio tracks and configure audio settings for your ad.
          </p>
        </div>

        {loading ? (
          <div className='flex justify-center py-8'>
            <MiniLoading />
          </div>
        ) : audios.length === 0 ? (
          <div className='text-center py-8 text-slate-400'>
            No audios found for this language
          </div>
        ) : (
          <>
            <div className='max-h-96 overflow-y-auto space-y-2'>
              {audios.map((audio) => (
                <div
                  key={audio._firestore_id}
                  className='flex items-center gap-3 p-3 border border-slate-700 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors'
                >
                  <Checkbox
                    checked={selectedAudios.has(audio._firestore_id!)}
                    onCheckedChange={() => toggleAudio(audio._firestore_id!)}
                  />
                  <div
                    className='flex-1'
                    onClick={() => toggleAudio(audio._firestore_id!)}
                  >
                    <label className='cursor-pointer text-slate-200'>{audio.name}</label>
                  </div>
                  {audio.fileURL && (
                    <button
                      type='button'
                      onClick={() => playAudio(audio.fileURL!)}
                      className={`p-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors ${playingAudio === audio.fileURL ? "text-blue-400" : ""
                        }`}
                    >
                      <FontAwesomeIcon icon={faVolumeUp} className='w-4 h-4' />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Audio Configuration */}
            <div className='border-t border-slate-700 pt-4 mt-4 space-y-4'>
              <h3 className='font-semibold text-sm text-slate-200'>Audio Configuration</h3>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label htmlFor='audio-volume' className='block text-sm font-medium text-slate-200'>
                    Audio Volume (%)
                  </label>
                  <input
                    id='audio-volume'
                    type='number'
                    value={audioVolume}
                    onChange={(e) => setAudioVolume(Number(e.target.value))}
                    min={0}
                    max={100}
                    placeholder='40'
                    onKeyDown={stopKeyPropagation}
                    onKeyUp={stopKeyPropagation}
                    className='w-full p-3 text-sm text-slate-100 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 placeholder-slate-400'
                    style={{ backgroundColor: '#1e293b', color: '#f1f5f9', borderColor: '#334155' }}
                  />
                </div>

                <div className='space-y-2'>
                  <label htmlFor='audio-offset' className='block text-sm font-medium text-slate-200'>
                    Audio Offset (seconds)
                  </label>
                  <input
                    id='audio-offset'
                    type='number'
                    value={audioOffset}
                    onChange={(e) => setAudioOffset(Number(e.target.value))}
                    min={0}
                    placeholder='0'
                    onKeyDown={stopKeyPropagation}
                    onKeyUp={stopKeyPropagation}
                    className='w-full p-3 text-sm text-slate-100 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 placeholder-slate-400'
                    style={{ backgroundColor: '#1e293b', color: '#f1f5f9', borderColor: '#334155' }}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label htmlFor='music-increase' className='block text-sm font-medium text-slate-200'>
                  Music Increase Threshold (seconds, 0 to exclude)
                </label>
                <input
                  id='music-increase'
                  type='number'
                  value={audioMusicIncreaseThreshold}
                  onChange={(e) =>
                    setAudioMusicIncreaseThreshold(Number(e.target.value))
                  }
                  min={0}
                  placeholder='0'
                  onKeyDown={stopKeyPropagation}
                  onKeyUp={stopKeyPropagation}
                  className='w-full p-3 text-sm text-slate-100 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 placeholder-slate-400'
                  style={{ backgroundColor: '#1e293b', color: '#f1f5f9', borderColor: '#334155' }}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <Checkbox
                    id='hook-keep-sound'
                    checked={hookKeepSound}
                    onCheckedChange={(checked) =>
                      setHookKeepSound(checked as boolean)
                    }
                  />
                  <label htmlFor='hook-keep-sound' className='cursor-pointer text-slate-200'>
                    Keep hook video sound
                  </label>
                </div>

                <div className='flex items-center gap-2'>
                  <Checkbox
                    id='body-keep-sound'
                    checked={bodyKeepSound}
                    onCheckedChange={(checked) =>
                      setBodyKeepSound(checked as boolean)
                    }
                  />
                  <label htmlFor='body-keep-sound' className='cursor-pointer text-slate-200'>
                    Keep body video sound
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

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
            disabled={selectedAudios.size === 0}
            className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            style={{ backgroundColor: '#2563eb' }}
          >
            Save ({selectedAudios.size} selected)
          </button>
        </div>
      </div>
    </Modal>
  );
}
