import { useState } from 'react';
import { FurnitureItem, SavedProject, RoomTemplate, Room } from './editor/types';
import { furnitureLibrary, roomTemplates } from './editor/constants';
import EditorSidebar from './editor/EditorSidebar';
import EditorCanvas from './editor/EditorCanvas';
import MultiRoomCanvas from './editor/MultiRoomCanvas';
import RoomSelectionModal from './editor/RoomSelectionModal';
import { Button } from './ui/button';
import Icon from './ui/icon';

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
  
  const [isMultiRoomMode, setIsMultiRoomMode] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [showRoomModal, setShowRoomModal] = useState(false);

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

  const switchToMultiRoomMode = () => {
    if (items.length > 0 && !activeRoomId) {
      const currentRoom: Room = {
        id: `room-${Date.now()}`,
        name: 'Комната 1',
        templateId: selectedRoom || 'living-room',
        items: items,
      };
      setRooms([currentRoom]);
      setActiveRoomId(currentRoom.id);
    }
    setIsMultiRoomMode(true);
  };

  const switchToSingleRoomMode = () => {
    if (activeRoomId) {
      const room = rooms.find(r => r.id === activeRoomId);
      if (room) {
        setItems(room.items);
        setSelectedRoom(room.templateId);
      }
    }
    setIsMultiRoomMode(false);
  };

  const addNewRoom = (templateId: string, roomName: string) => {
    const template = roomTemplates.find(t => t.id === templateId);
    if (!template) return;

    const templateItems = template.elements.map((element, index) => ({
      ...element,
      id: `${element.type}-${Date.now()}-${index}`,
    }));

    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: roomName,
      templateId: templateId,
      items: templateItems,
    };

    setRooms([...rooms, newRoom]);
  };

  const openRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      if (activeRoomId) {
        setRooms(rooms.map(r => 
          r.id === activeRoomId ? { ...r, items } : r
        ));
      }
      setActiveRoomId(roomId);
      setItems(room.items);
      setSelectedRoom(room.templateId);
      setSelectedItem(null);
    }
  };

  const deleteRoom = (roomId: string) => {
    setRooms(rooms.filter(r => r.id !== roomId));
    if (activeRoomId === roomId) {
      setActiveRoomId(null);
      setItems([]);
    }
  };

  const saveCurrentRoomState = () => {
    if (activeRoomId) {
      setRooms(rooms.map(r => 
        r.id === activeRoomId ? { ...r, items } : r
      ));
    }
  };

  const backToOverview = () => {
    saveCurrentRoomState();
    setActiveRoomId(null);
  };

  return (
    <section className="min-h-screen pt-24 pb-12 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-foreground mb-4">Редактор помещений</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Разместите мебель и элементы интерьера на плане помещения
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          <Button
            variant={!isMultiRoomMode ? 'default' : 'outline'}
            onClick={switchToSingleRoomMode}
            disabled={!isMultiRoomMode}
          >
            <Icon name="Maximize2" size={18} className="mr-2" />
            Одна комната
          </Button>
          <Button
            variant={isMultiRoomMode ? 'default' : 'outline'}
            onClick={switchToMultiRoomMode}
          >
            <Icon name="LayoutGrid" size={18} className="mr-2" />
            Вся квартира
          </Button>
        </div>

        {isMultiRoomMode && !activeRoomId ? (
          <MultiRoomCanvas
            rooms={rooms}
            onRoomClick={openRoom}
            onAddRoom={() => setShowRoomModal(true)}
            onDeleteRoom={deleteRoom}
          />
        ) : (
          <>
            {isMultiRoomMode && activeRoomId && (
              <div className="mb-4">
                <Button variant="outline" onClick={backToOverview}>
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Назад к плану квартиры
                </Button>
              </div>
            )}
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
          </>
        )}

        <RoomSelectionModal
          open={showRoomModal}
          onClose={() => setShowRoomModal(false)}
          onSelect={addNewRoom}
        />
      </div>
    </section>
  );
}