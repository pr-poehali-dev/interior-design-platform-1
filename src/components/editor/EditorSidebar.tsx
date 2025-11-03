import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { RoomTemplate, SavedProject, FurnitureItem } from './types';
import { roomTemplates, furnitureLibrary } from './constants';
import PropertyPanel from './PropertyPanel';

interface EditorSidebarProps {
  selectedRoom: string | null;
  selectedItem: string | null;
  items: FurnitureItem[];
  savedProjects: SavedProject[];
  projectName: string;
  showSaveInput: boolean;
  onLoadRoomTemplate: (template: RoomTemplate) => void;
  onAddItem: (template: typeof furnitureLibrary[0]) => void;
  onRotateItem: () => void;
  onDeleteItem: () => void;
  onClearCanvas: () => void;
  onSaveProject: () => void;
  onLoadProject: (project: SavedProject) => void;
  onDeleteProject: (projectId: string) => void;
  onProjectNameChange: (name: string) => void;
  onShowSaveInputChange: (show: boolean) => void;
  onChangeWallsColor: (color: string) => void;
  onUpdateItemColor: (color: string) => void;
  onUpdateItemSize: (dimension: 'width' | 'height', value: number) => void;
}

export default function EditorSidebar({
  selectedRoom,
  selectedItem,
  items,
  savedProjects,
  projectName,
  showSaveInput,
  onLoadRoomTemplate,
  onAddItem,
  onRotateItem,
  onDeleteItem,
  onClearCanvas,
  onSaveProject,
  onLoadProject,
  onDeleteProject,
  onProjectNameChange,
  onShowSaveInputChange,
  onChangeWallsColor,
  onUpdateItemColor,
  onUpdateItemSize,
}: EditorSidebarProps) {
  return (
    <Card className="p-6 h-fit">
      <Tabs defaultValue="rooms" className="w-full">
        <TabsList className="grid w-full grid-cols-4 text-xs">
          <TabsTrigger value="rooms">Комнаты</TabsTrigger>
          <TabsTrigger value="furniture">Мебель</TabsTrigger>
          <TabsTrigger value="projects">Проекты</TabsTrigger>
          <TabsTrigger value="tools">Действия</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rooms" className="space-y-2 mt-4">
          {roomTemplates.map((template) => (
            <Button
              key={template.id}
              variant={selectedRoom === template.id ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => onLoadRoomTemplate(template)}
            >
              <Icon name={template.icon as any} size={20} className="mr-2" />
              <div className="text-left">
                <div className="font-medium">{template.name}</div>
                <div className="text-xs opacity-70">{template.description}</div>
              </div>
            </Button>
          ))}
        </TabsContent>
        
        <TabsContent value="furniture" className="space-y-2 mt-4">
          {furnitureLibrary.map((item) => (
            <Button
              key={item.type}
              variant="outline"
              className="w-full justify-start"
              onClick={() => onAddItem(item)}
            >
              <Icon name={item.icon as any} size={20} className="mr-2" />
              {item.name}
            </Button>
          ))}
        </TabsContent>

        <TabsContent value="projects" className="space-y-2 mt-4">
          {!showSaveInput ? (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onShowSaveInputChange(true)}
              disabled={items.length === 0}
            >
              <Icon name="Save" size={20} className="mr-2" />
              Сохранить проект
            </Button>
          ) : (
            <div className="space-y-2">
              <Input
                placeholder="Название проекта"
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSaveProject()}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={onSaveProject} disabled={!projectName.trim()}>
                  Сохранить
                </Button>
                <Button size="sm" variant="outline" onClick={() => {
                  onShowSaveInputChange(false);
                  onProjectNameChange('');
                }}>
                  Отмена
                </Button>
              </div>
            </div>
          )}
          
          {savedProjects.length > 0 && (
            <div className="pt-4 border-t border-border">
              <div className="text-xs font-medium mb-2 text-muted-foreground">Сохранённые проекты</div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {savedProjects.map((project) => (
                  <div key={project.id} className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 justify-start text-xs"
                      onClick={() => onLoadProject(project)}
                    >
                      <Icon name="FolderOpen" size={16} className="mr-2" />
                      {project.name}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteProject(project.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="tools" className="space-y-2 mt-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onRotateItem}
            disabled={!selectedItem || items.find(i => i.id === selectedItem)?.isFixed}
          >
            <Icon name="RotateCw" size={20} className="mr-2" />
            Повернуть
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onDeleteItem}
            disabled={!selectedItem}
          >
            <Icon name="Trash2" size={20} className="mr-2" />
            Удалить
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-destructive"
            onClick={onClearCanvas}
            disabled={items.length === 0}
          >
            <Icon name="X" size={20} className="mr-2" />
            Очистить всё
          </Button>
        </TabsContent>
      </Tabs>

      <PropertyPanel
        selectedItem={selectedItem}
        items={items}
        onChangeWallsColor={onChangeWallsColor}
        onUpdateItemColor={onUpdateItemColor}
        onUpdateItemSize={onUpdateItemSize}
        onRotateItem={onRotateItem}
      />
    </Card>
  );
}
