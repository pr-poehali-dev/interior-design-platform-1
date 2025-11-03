import { useState } from 'react';
import { FurnitureItem, SavedProject, RoomTemplate } from './editor/types';
import { furnitureLibrary } from './editor/constants';
import EditorSidebar from './editor/EditorSidebar';
import EditorCanvas from './editor/EditorCanvas';

export default function RoomEditor() {
  const [items, setItems] = useState<FurnitureItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>(() => {
    const saved = localStorage.getItem('designspace-projects');
    return saved ? JSON.parse(saved) : [];
  });
  const [projectName, setProjectName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);

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
      rotation: 0,
    };
    setItems([...items, newItem]);
  };

  const loadRoomTemplate = (template: RoomTemplate) => {
    const templateItems = template.elements.map((element, index) => ({
      ...element,
      id: `${element.type}-${Date.now()}-${index}`,
    }));
    setItems(templateItems);
    setSelectedRoom(template.id);
    setSelectedItem(null);
  };

  const handleMouseDown = (id: string, isFixed?: boolean) => {
    if (isFixed) return;
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

  const updateItemColor = (color: string) => {
    if (selectedItem) {
      setItems(items.map(item => 
        item.id === selectedItem ? { ...item, color } : item
      ));
    }
  };

  const updateItemSize = (dimension: 'width' | 'height', value: number) => {
    if (selectedItem) {
      setItems(items.map(item => 
        item.id === selectedItem ? { ...item, [dimension]: value } : item
      ));
    }
  };

  const changeWallsColor = (color: string) => {
    setItems(items.map(item => 
      item.type.includes('wall') ? { ...item, color } : item
    ));
  };

  const rotateItem = () => {
    if (selectedItem) {
      setItems(items.map(item => 
        item.id === selectedItem 
          ? { 
              ...item, 
              rotation: ((item.rotation || 0) + 90) % 360,
              width: item.height,
              height: item.width
            }
          : item
      ));
    }
  };

  const saveProject = () => {
    if (!projectName.trim()) return;
    
    const newProject: SavedProject = {
      id: Date.now().toString(),
      name: projectName,
      roomId: selectedRoom,
      items: items,
      timestamp: Date.now(),
    };
    
    const updatedProjects = [...savedProjects, newProject];
    setSavedProjects(updatedProjects);
    localStorage.setItem('designspace-projects', JSON.stringify(updatedProjects));
    setProjectName('');
    setShowSaveInput(false);
  };

  const loadProject = (project: SavedProject) => {
    setItems(project.items);
    setSelectedRoom(project.roomId);
    setSelectedItem(null);
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = savedProjects.filter(p => p.id !== projectId);
    setSavedProjects(updatedProjects);
    localStorage.setItem('designspace-projects', JSON.stringify(updatedProjects));
  };

  const clearCanvas = () => {
    setItems([]);
    setSelectedItem(null);
    setSelectedRoom(null);
  };

  const handleCanvasClick = () => {
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
          <EditorSidebar
            selectedRoom={selectedRoom}
            selectedItem={selectedItem}
            items={items}
            savedProjects={savedProjects}
            projectName={projectName}
            showSaveInput={showSaveInput}
            onLoadRoomTemplate={loadRoomTemplate}
            onAddItem={addItem}
            onRotateItem={rotateItem}
            onDeleteItem={deleteItem}
            onClearCanvas={clearCanvas}
            onSaveProject={saveProject}
            onLoadProject={loadProject}
            onDeleteProject={deleteProject}
            onProjectNameChange={setProjectName}
            onShowSaveInputChange={setShowSaveInput}
            onChangeWallsColor={changeWallsColor}
            onUpdateItemColor={updateItemColor}
            onUpdateItemSize={updateItemSize}
          />

          <EditorCanvas
            items={items}
            selectedItem={selectedItem}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onCanvasClick={handleCanvasClick}
          />
        </div>
      </div>
    </section>
  );
}
