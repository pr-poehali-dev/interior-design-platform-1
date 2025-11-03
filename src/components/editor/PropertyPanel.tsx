import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { FurnitureItem } from './types';

interface PropertyPanelProps {
  selectedItem: string | null;
  items: FurnitureItem[];
  onChangeWallsColor: (color: string) => void;
  onUpdateItemColor: (color: string) => void;
  onUpdateItemSize: (dimension: 'width' | 'height', value: number) => void;
  onRotateItem: () => void;
}

export default function PropertyPanel({
  selectedItem,
  items,
  onChangeWallsColor,
  onUpdateItemColor,
  onUpdateItemSize,
  onRotateItem,
}: PropertyPanelProps) {
  return (
    <div className="mt-6 pt-6 border-t border-border space-y-4">
      <div>
        <Label className="text-sm font-medium mb-2 block">Цвет стен</Label>
        <div className="grid grid-cols-4 gap-2">
          {['#94A3B8', '#E2E8F0', '#FDE1D3', '#D3E4FD', '#E5DEFF', '#FFDEE2'].map((color) => (
            <button
              key={color}
              className="w-10 h-10 rounded-lg border-2 border-border hover:border-primary transition-colors"
              style={{ backgroundColor: color }}
              onClick={() => onChangeWallsColor(color)}
            />
          ))}
        </div>
      </div>

      {selectedItem && (() => {
        const item = items.find(i => i.id === selectedItem);
        return item && !item.isFixed ? (
          <div className="space-y-4">
            <div className="text-sm font-semibold">Выбран: {item.name}</div>
            
            <div>
              <Label className="text-sm mb-2 block">Цвет</Label>
              <Input
                type="color"
                value={item.color}
                onChange={(e) => onUpdateItemColor(e.target.value)}
                className="h-10 cursor-pointer"
              />
            </div>

            <div>
              <Label className="text-sm mb-2 block">Ширина: {item.width}px</Label>
              <Slider
                value={[item.width]}
                min={20}
                max={200}
                step={10}
                onValueChange={(value) => onUpdateItemSize('width', value[0])}
              />
            </div>

            <div>
              <Label className="text-sm mb-2 block">Высота: {item.height}px</Label>
              <Slider
                value={[item.height]}
                min={20}
                max={200}
                step={10}
                onValueChange={(value) => onUpdateItemSize('height', value[0])}
              />
            </div>

            <div>
              <Label className="text-sm mb-2 block">Поворот: {item.rotation || 0}°</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onRotateItem}
                  className="flex-1"
                >
                  <Icon name="RotateCw" size={16} className="mr-1" />
                  90°
                </Button>
              </div>
            </div>
          </div>
        ) : item ? (
          <div className="text-xs text-muted-foreground">
            Элементы помещения (стены, окна, двери) нельзя редактировать
          </div>
        ) : null;
      })()}
    </div>
  );
}
