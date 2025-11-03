export interface FurnitureItem {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  icon: string;
  isFixed?: boolean;
  rotation?: number;
}

export interface SavedProject {
  id: string;
  name: string;
  roomId: string | null;
  items: FurnitureItem[];
  timestamp: number;
}

export interface RoomTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  elements: Omit<FurnitureItem, 'id'>[];
}
