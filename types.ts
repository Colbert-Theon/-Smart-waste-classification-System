
export type Language = 'en' | 'fr' | 'pi';

export type WasteCategory = 'Plastic' | 'Metal' | 'Paper' | 'Organic' | 'Glass' | 'Other' | 'Uncertain';

export interface WasteClassification {
  wasteType: WasteCategory;
  sortingInstruction: string;
  educationalTip: string;
}

export interface WasteStats {
  totalScans: number;
  [key: string]: number; // To accommodate dynamic waste categories
}

export interface LocalizedStrings {
  title: string;
  description: string;
  uploadTitle: string;
  uploadOrDrag: string;
  uploadButton: string;
  changeImageButton: string;
  classifying: string;
  resultTitle: string;
  wasteType: string;
  sortingInstruction: string;
  educationalTip: string;
  error: string;
  initialPrompt: string;
  statsTitle: string;
  totalScans: string;
  wasteDistribution: string;
  syncButton: string;
  syncMessage: string;
  footer: string;
  [key: string]: string; // For dynamic keys
}
