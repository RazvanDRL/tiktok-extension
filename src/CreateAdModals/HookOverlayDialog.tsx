"use client";

import { useState } from "react";
import Modal from "~components/Modal";
import { Button } from "~components/ui/button";
import { Input } from "~components/ui/input";
import { Label } from "~components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~components/ui/select";
import { Textarea } from "~components/ui/textarea";

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col gap-4 p-4'>
        <h2 className='text-xl font-semibold'>Hook Overlay</h2>

        <div className='space-y-2'>
          <Label htmlFor='hook-text'>Hook Text</Label>
          <Textarea
            id='hook-text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter your hook text...'
            className='w-full'
            rows={8}
            cols={32}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='hook-position'>Position</Label>
          <Select
            value={position}
            onValueChange={(value: any) => setPosition(value)}
          >
            <SelectTrigger id='hook-position'>
              <SelectValue placeholder='Select position' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='top'>Top</SelectItem>
              <SelectItem value='center'>Center</SelectItem>
              <SelectItem value='bottom'>Bottom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='hook-time-limit'>Hook Time Limit (seconds)</Label>
          <Input
            id='hook-time-limit'
            type='number'
            value={hookTimeLimit}
            onChange={(e) => setHookTimeLimit(Number(e.target.value))}
            placeholder='Enter hook time limit...'
            min={1}
            max={10}
            className='w-full'
          />
        </div>

        <div className='flex gap-2 justify-end mt-4'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!text.trim()}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
