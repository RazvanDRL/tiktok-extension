"use client";

import { useState, useEffect } from "react";
import Modal from "~components/Modal";
import { Button } from "~components/ui/button";
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
    // Don't call onClose() here - let the parent handle closing by changing step
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className='max-w-2xl'>
      <div className='flex flex-col gap-4 p-4'>
        <h2 className='text-xl font-semibold'>Select Audio/Songs</h2>

        {loading ? (
          <div className='flex justify-center py-8'>
            <MiniLoading />
          </div>
        ) : audios.length === 0 ? (
          <div className='text-center py-8 text-muted-foreground'>
            No audios found for this language
          </div>
        ) : (
          <>
            <div className='max-h-96 overflow-y-auto space-y-2'>
              {audios.map((audio) => (
                <div
                  key={audio._firestore_id}
                  className='flex items-center gap-3 p-3 border rounded-md hover:bg-accent cursor-pointer'
                >
                  <Checkbox
                    checked={selectedAudios.has(audio._firestore_id!)}
                    onCheckedChange={() => toggleAudio(audio._firestore_id!)}
                  />
                  <div
                    className='flex-1'
                    onClick={() => toggleAudio(audio._firestore_id!)}
                  >
                    <Label className='cursor-pointer'>{audio.name}</Label>
                  </div>
                  {audio.fileURL && (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => playAudio(audio.fileURL!)}
                      className={
                        playingAudio === audio.fileURL ? "text-primary-500" : ""
                      }
                    >
                      <FontAwesomeIcon icon={faVolumeUp} className='w-4 h-4' />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Audio Configuration */}
            <div className='border-t pt-4 mt-4 space-y-4'>
              <h3 className='font-semibold text-sm'>Audio Configuration</h3>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='audio-volume'>Audio Volume (%)</Label>
                  <Input
                    id='audio-volume'
                    type='number'
                    value={audioVolume}
                    onChange={(e) => setAudioVolume(Number(e.target.value))}
                    min={0}
                    max={100}
                    placeholder='40'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='audio-offset'>Audio Offset (seconds)</Label>
                  <Input
                    id='audio-offset'
                    type='number'
                    value={audioOffset}
                    onChange={(e) => setAudioOffset(Number(e.target.value))}
                    min={0}
                    placeholder='0'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='music-increase'>
                  Music Increase Threshold (seconds, 0 to exclude)
                </Label>
                <Input
                  id='music-increase'
                  type='number'
                  value={audioMusicIncreaseThreshold}
                  onChange={(e) =>
                    setAudioMusicIncreaseThreshold(Number(e.target.value))
                  }
                  min={0}
                  placeholder='0'
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
                  <Label htmlFor='hook-keep-sound' className='cursor-pointer'>
                    Keep hook video sound
                  </Label>
                </div>

                <div className='flex items-center gap-2'>
                  <Checkbox
                    id='body-keep-sound'
                    checked={bodyKeepSound}
                    onCheckedChange={(checked) =>
                      setBodyKeepSound(checked as boolean)
                    }
                  />
                  <Label htmlFor='body-keep-sound' className='cursor-pointer'>
                    Keep body video sound
                  </Label>
                </div>
              </div>
            </div>
          </>
        )}

        <div className='flex gap-2 justify-end mt-4'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={selectedAudios.size === 0}>
            Save ({selectedAudios.size} selected)
          </Button>
        </div>
      </div>
    </Modal>
  );
}
