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

export interface Room {
  id: string;
  name: string;
  templateId: string;
  items: FurnitureItem[];
  position?: { x: number; y: number };
  bounds?: { width: number; height: number };
}

export interface SavedProject {
  id: string;
  name: string;
  roomId: string | null;
  items: FurnitureItem[];
  timestamp: number;
  isMultiRoom?: boolean;
  rooms?: Room[];
}

export interface RoomTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  elements: Omit<FurnitureItem, 'id'>[];
}