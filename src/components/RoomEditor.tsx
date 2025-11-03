import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FurnitureItem {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  icon: string;
}

const furnitureLibrary = [
  { type: 'sofa', name: 'Диван', width: 120, height: 80, color: '#8B5CF6', icon: 'RectangleHorizontal' },
  { type: 'table', name: 'Стол', width: 80, height: 80, color: '#1A1F2C', icon: 'Square' },
  { type: 'chair', name: 'Стул', width: 40, height: 40, color: '#7E69AB', icon: 'Square' },
  { type: 'bed', name: 'Кровать', width: 100, height: 120, color: '#6E59A5', icon: 'RectangleVertical' },
  { type: 'wardrobe', name: 'Шкаф', width: 120, height: 60, color: '#1A1F2C', icon: 'RectangleHorizontal' },
  { type: 'plant', name: 'Растение', width: 30, height: 30, color: '#22C55E', icon: 'Circle' },
];

export default function RoomEditor() {
  const [items, setItems] = useState<FurnitureItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const addItem = (template: typeof furnitureLibrary[0]) => {
    const newItem: FurnitureItem = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      name: template.name,
      x: 100,
      y: 100,
      width: template.width,
      height: template.height,
      color: template.color,
      icon: template.icon,
    };
    setItems([...items, newItem]);
  };

  const handleMouseDown = (id: string) => {
    setSelectedItem(id);
    setDraggedItem(id);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggedItem) return;
    
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setItems(items.map(item => 
      item.id === draggedItem 
        ? { ...item, x: x - item.width / 2, y: y - item.height / 2 }
        : item
    ));
  };

  const handleMouseUp = () => {
    setDraggedItem(null);
  };

  const deleteItem = () => {
    if (selectedItem) {
      setItems(items.filter(item => item.id !== selectedItem));
      setSelectedItem(null);
    }
  };

  const clearCanvas = () => {
    setItems([]);
    setSelectedItem(null);
  };

  return (
    <section className="min-h-screen pt-24 pb-12 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4">Редактор помещений</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Разместите мебель и элементы интерьера на плане помещения
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          <Card className="p-6 h-fit">
            <Tabs defaultValue="furniture" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="furniture">Мебель</TabsTrigger>
                <TabsTrigger value="tools">Инструменты</TabsTrigger>
              </TabsList>
              
              <TabsContent value="furniture" className="space-y-2 mt-4">
                {furnitureLibrary.map((item) => (
                  <Button
                    key={item.type}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => addItem(item)}
                  >
                    <Icon name={item.icon as any} size={20} className="mr-2" />
                    {item.name}
                  </Button>
                ))}
              </TabsContent>

              <TabsContent value="tools" className="space-y-2 mt-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={deleteItem}
                  disabled={!selectedItem}
                >
                  <Icon name="Trash2" size={20} className="mr-2" />
                  Удалить
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive"
                  onClick={clearCanvas}
                  disabled={items.length === 0}
                >
                  <Icon name="X" size={20} className="mr-2" />
                  Очистить всё
                </Button>
              </TabsContent>
            </Tabs>

            {selectedItem && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-sm font-medium mb-2">Выбрано:</div>
                <div className="text-sm text-muted-foreground">
                  {items.find(i => i.id === selectedItem)?.name}
                </div>
              </div>
            )}
          </Card>

          <Card className="p-0 overflow-hidden">
            <div 
              className="relative bg-white w-full h-[600px] cursor-move"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedItem(null);
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
                  className={`absolute cursor-move transition-shadow hover:shadow-lg ${
                    selectedItem === item.id ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                    backgroundColor: item.color,
                    borderRadius: '8px',
                  }}
                  onMouseDown={() => handleMouseDown(item.id)}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
