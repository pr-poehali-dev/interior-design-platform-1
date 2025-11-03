import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Room, FurnitureItem } from './types';
import { roomTemplates } from './constants';

interface MultiRoomCanvasProps {
  rooms: Room[];
  onRoomClick: (roomId: string) => void;
  onAddRoom: () => void;
  onDeleteRoom: (roomId: string) => void;
}

export default function MultiRoomCanvas({
  rooms,
  onRoomClick,
  onAddRoom,
  onDeleteRoom,
}: MultiRoomCanvasProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const calculateRoomBounds = (items: FurnitureItem[]) => {
    if (items.length === 0) return { minX: 0, minY: 0, maxX: 200, maxY: 200 };
    
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    items.forEach(item => {
      minX = Math.min(minX, item.x);
      minY = Math.min(minY, item.y);
      maxX = Math.max(maxX, item.x + item.width);
      maxY = Math.max(maxY, item.y + item.height);
    });
    
    return { minX, minY, maxX, maxY };
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">План квартиры</h3>
        <Button onClick={onAddRoom} size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить комнату
        </Button>
      </div>

      <div className="relative bg-white rounded-lg border-2 border-dashed border-border p-8 min-h-[600px]">
        <div className="absolute inset-0 p-8" style={{
          backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        <div className="relative grid grid-cols-2 md:grid-cols-3 gap-6">
          {rooms.map((room) => {
            const template = roomTemplates.find(t => t.id === room.templateId);
            const bounds = calculateRoomBounds(room.items);
            const roomWidth = bounds.maxX - bounds.minX;
            const roomHeight = bounds.maxY - bounds.minY;
            const scale = 0.3;

            return (
              <div
                key={room.id}
                className="relative group"
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
              >
                <div
                  className="relative bg-white border-2 border-border rounded-lg cursor-pointer transition-all hover:border-primary hover:shadow-lg overflow-hidden"
                  style={{
                    width: `${roomWidth * scale}px`,
                    height: `${roomHeight * scale}px`,
                    minWidth: '180px',
                    minHeight: '180px',
                  }}
                  onClick={() => onRoomClick(room.id)}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox={`${bounds.minX} ${bounds.minY} ${roomWidth} ${roomHeight}`}
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {room.items.map((item) => (
                      <rect
                        key={item.id}
                        x={item.x}
                        y={item.y}
                        width={item.width}
                        height={item.height}
                        fill={item.color}
                        rx={item.isFixed ? 2 : 4}
                        opacity={item.isFixed ? 0.95 : 1}
                        transform={`rotate(${item.rotation || 0} ${item.x + item.width/2} ${item.y + item.height/2})`}
                      />
                    ))}
                  </svg>

                  {hoveredRoom === room.id && (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                        <p className="text-sm font-medium">Открыть комнату</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {template && <Icon name={template.icon as any} size={16} />}
                    <p className="text-sm font-medium">{room.name}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteRoom(room.id);
                    }}
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            );
          })}

          {rooms.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Icon name="Home" size={48} className="mb-4 opacity-20" />
              <p className="text-lg mb-2">Нет комнат</p>
              <p className="text-sm">Добавьте первую комнату в план квартиры</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
