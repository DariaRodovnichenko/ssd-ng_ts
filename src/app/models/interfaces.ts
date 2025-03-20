export interface NutritionalInfo {
  allergens?: string | null;
  displayString?: string | null;
}

export interface ItemAttributeInfo {
  dietaryLabels?: string[] | null;
}

export interface Recipe {
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  uuid: string;
  nutritionalInfo?: NutritionalInfo;
  suspendUntil: number;
  classifications: string[];
  hasCustomizations: boolean;
  itemAttributeInfo?: ItemAttributeInfo;
  tagSection?: any | null;
}

export interface Category {
  itemUuids: string[];
  title: string;
  uuid: string;
  displayType?: string | null;
  recipes: Recipe[];
}

export interface Restaurant {
  title: string;
  data: Category[];
  photo: string;
  etaRange: string;
  location: string;
  fareBadge: string;
}
