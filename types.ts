
export enum Category {
  FIREPLACE = 'FIREPLACE',
  CHIMNEY = 'CHIMNEY',
  MATERIALS = 'MATERIALS',
  LABOR = 'LABOR',
  LOGISTICS = 'LOGISTICS'
}

export interface ProposalItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  total: number;
  category: Category;
}

export interface ProposalData {
  clientName: string;
  address: string;
  date: string;
  contractNumber: string;
  contractorName: string;
  items: ProposalItem[];
  notes: string;
  paymentTerms: string;
  additionalConditions: string;
  // Specific photo slots
  coverPhoto: string | null;
  fireplacePhoto: string | null;
  fireplaceDrawing: string | null;
  chimneyPhoto: string | null;
  chimneyDrawing: string | null;
  materialsPhotos: string[];
  laborPhotos: string[];
  logisticsPhotos: string[];
}

export interface CategoryMetadata {
  title: string;
  defaultImage: string;
  description: string;
}

export const CATEGORY_INFO: Record<Category, CategoryMetadata> = {
  [Category.FIREPLACE]: {
    title: 'Каминная топка и портал',
    defaultImage: 'https://images.unsplash.com/photo-1574360523441-216675df0507?auto=format&fit=crop&q=80&w=800',
    description: 'Центральный элемент вашего будущего камина.'
  },
  [Category.CHIMNEY]: {
    title: 'Система дымоудаления',
    defaultImage: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&q=80&w=800',
    description: 'Надежный дымоход — залог безопасности.'
  },
  [Category.MATERIALS]: {
    title: 'Материалы для монтажа',
    defaultImage: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=800',
    description: 'Профессиональная изоляция и огнестойкие плиты.'
  },
  [Category.LABOR]: {
    title: 'Монтажные работы',
    defaultImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    description: 'Полный комплекс работ по установке.'
  },
  [Category.LOGISTICS]: {
    title: 'Транспорт и логистика',
    defaultImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    description: 'Доставка и разгрузка оборудования.'
  }
};
