export type LayerCategory = 'Core' | 'UI' | 'Logic' | 'Navigation' | 'State';

export type ArchitectureLayer = {
  name: string;
  category: LayerCategory;
  file: string;
  accent: string;
  summary: string;
  detail: string;
};
