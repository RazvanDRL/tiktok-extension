"use client";

import { useState } from "react";
import Modal from "~components/Modal";
import { Button } from "~components/ui/button";
import { Label } from "~components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

interface BodyOverlayDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string, position: "top" | "center" | "bottom") => void;
  predefinedText: string;
}

export default function BodyOverlayDialog({
  isOpen,
  onClose,
  onSave,
  predefinedText,
}: BodyOverlayDialogProps) {
  const [text, setText] = useState(predefinedText);
  const [position, setPosition] = useState<"top" | "center" | "bottom">(
    "center"
  );

  const handleSave = () => {
    if (!text.trim()) {
      return;
    }
    onSave(text, position);
    setPosition("center");
    // Don't call onClose() here - let the parent handle closing by changing step
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col gap-4 p-4'>
        <h2 className='text-xl font-semibold'>Body Overlay</h2>

        <div className='space-y-2'>
          <Label htmlFor='body-text'>Body Text</Label>
          <Textarea
            id='body-text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter your body text...'
            className='w-full'
            rows={4}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='body-position'>Position</Label>
          <Select
            value={position}
            onValueChange={(value: any) => setPosition(value)}
          >
            <SelectTrigger id='body-position'>
              <SelectValue placeholder='Select position' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='top'>Top</SelectItem>
              <SelectItem value='center'>Center</SelectItem>
              <SelectItem value='bottom'>Bottom</SelectItem>
            </SelectContent>
          </Select>
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
