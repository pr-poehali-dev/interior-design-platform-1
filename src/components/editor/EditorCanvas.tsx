import { Card } from '@/components/ui/card';
import { FurnitureItem } from './types';

interface EditorCanvasProps {
  items: FurnitureItem[];
  selectedItem: string | null;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onMouseDown: (id: string, isFixed?: boolean) => void;
  onCanvasClick: () => void;
}

export default function EditorCanvas({
  items,
  selectedItem,
  onMouseMove,
  onMouseUp,
  onMouseDown,
  onCanvasClick,
}: EditorCanvasProps) {
  return (
    <Card className="p-0 overflow-hidden">
      <div 
        className="relative bg-white w-full h-[600px] cursor-move"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onCanvasClick();
          }
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        {items.map((item) => (
          <div
            key={item.id}
            className={`absolute transition-shadow ${
              item.isFixed 
                ? 'cursor-default' 
                : 'cursor-move hover:shadow-lg'
            } ${
              selectedItem === item.id ? 'ring-2 ring-primary' : ''
            }`}
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: `${item.width}px`,
              height: `${item.height}px`,
              backgroundColor: item.color,
              borderRadius: item.isFixed ? '4px' : '8px',
              opacity: item.isFixed ? 0.95 : 1,
              transform: `rotate(${item.rotation || 0}deg)`,
              transformOrigin: 'center',
            }}
            onMouseDown={() => onMouseDown(item.id, item.isFixed)}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
