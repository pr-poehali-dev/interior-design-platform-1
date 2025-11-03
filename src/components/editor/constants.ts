import { RoomTemplate } from './types';

export const furnitureLibrary = [
  { type: 'sofa', name: 'Диван', width: 120, height: 80, color: '#8B5CF6', icon: 'RectangleHorizontal' },
  { type: 'table', name: 'Стол', width: 80, height: 80, color: '#1A1F2C', icon: 'Square' },
  { type: 'chair', name: 'Стул', width: 40, height: 40, color: '#7E69AB', icon: 'Square' },
  { type: 'bed', name: 'Кровать', width: 100, height: 120, color: '#6E59A5', icon: 'RectangleVertical' },
  { type: 'wardrobe', name: 'Шкаф', width: 120, height: 60, color: '#1A1F2C', icon: 'RectangleHorizontal' },
  { type: 'plant', name: 'Растение', width: 30, height: 30, color: '#22C55E', icon: 'Circle' },
];

export const roomTemplates: RoomTemplate[] = [
  {
    id: 'living-room',
    name: 'Гостиная',
    description: 'Прямоугольная комната с окном и дверью',
    icon: 'Home',
    elements: [
      { type: 'wall-v', name: 'Стена', x: 50, y: 50, width: 10, height: 500, color: '#94A3B8', icon: 'RectangleVertical', isFixed: true },
      { type: 'wall-v', name: 'Стена', x: 690, y: 50, width: 10, height: 500, color: '#94A3B8', icon: 'RectangleVertical', isFixed: true },
      { type: 'wall-h', name: 'Стена', x: 50, y: 50, width: 650, height: 10, color: '#94A3B8', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'wall-h', name: 'Стена', x: 50, y: 540, width: 650, height: 10, color: '#94A3B8', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'window', name: 'Окно', x: 300, y: 50, width: 150, height: 10, color: '#60A5FA', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'door', name: 'Дверь', x: 690, y: 250, width: 10, height: 80, color: '#92400E', icon: 'RectangleVertical', isFixed: true },
    ]
  },
  {
    id: 'bedroom',
    name: 'Спальня',
    description: 'Квадратная комната с окном',
    icon: 'Bed',
    elements: [
      { type: 'wall-v', name: 'Стена', x: 80, y: 80, width: 10, height: 440, color: '#94A3B8', icon: 'RectangleVertical', isFixed: true },
      { type: 'wall-v', name: 'Стена', x: 660, y: 80, width: 10, height: 440, color: '#94A3B8', icon: 'RectangleVertical', isFixed: true },
      { type: 'wall-h', name: 'Стена', x: 80, y: 80, width: 590, height: 10, color: '#94A3B8', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'wall-h', name: 'Стена', x: 80, y: 510, width: 590, height: 10, color: '#94A3B8', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'window', name: 'Окно', x: 280, y: 80, width: 180, height: 10, color: '#60A5FA', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'door', name: 'Дверь', x: 660, y: 280, width: 10, height: 80, color: '#92400E', icon: 'RectangleVertical', isFixed: true },
    ]
  },
  {
    id: 'kitchen',
    name: 'Кухня',
    description: 'Узкая комната с окном и дверью',
    icon: 'ChefHat',
    elements: [
      { type: 'wall-v', name: 'Стена', x: 100, y: 100, width: 10, height: 400, color: '#94A3B8', icon: 'RectangleVertical', isFixed: true },
      { type: 'wall-v', name: 'Стена', x: 640, y: 100, width: 10, height: 400, color: '#94A3B8', icon: 'RectangleVertical', isFixed: true },
      { type: 'wall-h', name: 'Стена', x: 100, y: 100, width: 550, height: 10, color: '#94A3B8', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'wall-h', name: 'Стена', x: 100, y: 490, width: 550, height: 10, color: '#94A3B8', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'window', name: 'Окно', x: 250, y: 100, width: 140, height: 10, color: '#60A5FA', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'door', name: 'Дверь', x: 100, y: 240, width: 10, height: 80, color: '#92400E', icon: 'RectangleVertical', isFixed: true },
    ]
  },
  {
    id: 'office',
    name: 'Кабинет',
    description: 'Комната с двумя окнами',
    icon: 'Briefcase',
    elements: [
      { type: 'wall-v', name: 'Стена', x: 70, y: 70, width: 10, height: 460, color: '#94A3B8', icon: 'RectangleVertical', isFixed: true },
      { type: 'wall-v', name: 'Стена', x: 670, y: 70, width: 10, height: 460, color: '#94A3B8', icon: 'RectangleVertical', isFixed: true },
      { type: 'wall-h', name: 'Стена', x: 70, y: 70, width: 610, height: 10, color: '#94A3B8', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'wall-h', name: 'Стена', x: 70, y: 520, width: 610, height: 10, color: '#94A3B8', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'window', name: 'Окно', x: 150, y: 70, width: 120, height: 10, color: '#60A5FA', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'window', name: 'Окно', x: 480, y: 70, width: 120, height: 10, color: '#60A5FA', icon: 'RectangleHorizontal', isFixed: true },
      { type: 'door', name: 'Дверь', x: 70, y: 260, width: 10, height: 80, color: '#92400E', icon: 'RectangleVertical', isFixed: true },
    ]
  },
];
