import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { roomTemplates } from './constants';
import { useState } from 'react';

interface RoomSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (templateId: string, roomName: string) => void;
}

export default function RoomSelectionModal({ open, onClose, onSelect }: RoomSelectionModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [roomName, setRoomName] = useState('');

  const handleConfirm = () => {
    if (selectedTemplate && roomName.trim()) {
      onSelect(selectedTemplate, roomName.trim());
      setSelectedTemplate(null);
      setRoomName('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавить комнату</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Название комнаты</label>
            <Input
              placeholder="Например: Спальня 1"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Выберите тип комнаты</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {roomTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant={selectedTemplate === template.id ? 'default' : 'outline'}
                  className="h-auto py-4 flex flex-col items-center gap-2"
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <Icon name={template.icon as any} size={24} />
                  <div className="text-center">
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs opacity-70">{template.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!selectedTemplate || !roomName.trim()}
            >
              Добавить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
