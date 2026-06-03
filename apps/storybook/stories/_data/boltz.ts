// Shared demo data for Storybook stories & example screens.
// Lives in the Storybook app (NOT @boltz/ui) so it never ships in the package.
// This is the "per-component data array" pattern: realistic, typed sample data
// that stories and screens map over instead of hand-coding content inline.

export type BadgeTone = 'primary' | 'secondary' | 'tertiary';

export interface BoltzModel {
  id: string;
  name: string;
  badge?: { label: string; tone: BadgeTone };
  body: string;
}

export const models: BoltzModel[] = [
  {
    id: 'botzmol',
    name: 'BoltzMol 1.1',
    badge: { label: 'Beta', tone: 'primary' },
    body: 'Small-molecule screening and hit discovery, powered by multi-modal foundation models trained on 200M+ compound–protein interaction pairs.',
  },
  {
    id: 'botzprot',
    name: 'BoltzProt 1.1',
    badge: { label: 'New', tone: 'secondary' },
    body: 'State-of-the-art protein structure prediction, exceeding AlphaFold2 GDT_TS on novel folds.',
  },
  {
    id: 'boltzrna',
    name: 'BoltzRNA 1.0',
    badge: { label: 'Coming soon', tone: 'tertiary' },
    body: 'RNA secondary and tertiary structure prediction for therapeutic design.',
  },
];

export interface BoltzStat {
  value: string;
  label: string;
}

export const stats: BoltzStat[] = [
  { value: '1M+', label: 'scientists worldwide' },
  { value: '10,000+', label: 'total learners' },
  { value: 'Top 20', label: 'pharma companies' },
  { value: '200+', label: 'active integrations' },
];

export interface BoltzArticle {
  id: string;
  category: string;
  title: string;
  date: string;
}

export const articles: BoltzArticle[] = [
  { id: 'a1', category: 'Research', title: 'Boltz-2: scaling laws for biomolecular structure', date: 'May 2026' },
  { id: 'a2', category: 'Platform', title: 'Production-ready inference for protein design teams', date: 'Apr 2026' },
  { id: 'a3', category: 'Community', title: '1M scientists: a year of open biomolecular models', date: 'Mar 2026' },
  { id: 'a4', category: 'Research', title: 'Benchmarking de novo small-molecule generation', date: 'Feb 2026' },
];

export const navItems = ['Platform', 'API', 'News'] as const;
