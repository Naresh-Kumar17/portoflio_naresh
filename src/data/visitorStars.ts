export interface VisitorStar {
  id: string;
  name: string;
  location: string;
  message: string;
  color: string;
  createdAt: string;
  x: number;
  y: number;
  z?: number;
  isUserStar?: boolean;
}

export const INITIAL_VISITOR_STARS: VisitorStar[] = [
  {
    id: 'star-1',
    name: 'Sarah M.',
    location: 'London, UK',
    message: 'Incredible 3D constellation architecture! Truly creative engineering.',
    color: '#00B0CD',
    createdAt: '2026-10-31',
    x: -55.0,
    y: -22.0,
    z: 0.1,
  },
  {
    id: 'star-2',
    name: 'Hamza K.',
    location: 'Karachi, PK',
    message: 'Proud fellow FAST-NUCES Data Science student. Great work Naresh!',
    color: '#CFFF04',
    createdAt: '2026-10-31',
    x: -26.0,
    y: 38.0,
    z: 0.18,
  },
  {
    id: 'star-3',
    name: 'Marcus T.',
    location: 'San Francisco, US',
    message: 'Dataset Doctor zero-leakage diagnostic engine is pure gold.',
    color: '#9B8FFF',
    createdAt: '2026-10-30',
    x: 22.0,
    y: 36.0,
    z: 0.14,
  },
  {
    id: 'star-4',
    name: 'Elena R.',
    location: 'Berlin, DE',
    message: 'Loved the SVM digit margins and STL air quality forecasting.',
    color: '#FFAA00',
    createdAt: '2026-10-30',
    x: 64.0,
    y: 16.0,
    z: 0.2,
  },
  {
    id: 'star-5',
    name: 'Kenji S.',
    location: 'Tokyo, JP',
    message: 'Such a responsive Canvas 2D math engine without heavy 3D overhead.',
    color: '#E84FD0',
    createdAt: '2026-10-29',
    x: -12.0,
    y: -54.0,
    z: 0.22,
  },
  {
    id: 'star-6',
    name: 'David P.',
    location: 'Toronto, CA',
    message: 'Super clean design and reproducible ML research pipelines.',
    color: '#22C55E',
    createdAt: '2026-10-29',
    x: 46.0,
    y: -46.0,
    z: 0.25,
  },
  {
    id: 'star-7',
    name: 'Fatima A.',
    location: 'Dubai, UAE',
    message: 'Best portfolio interaction I have seen this year. Keep building!',
    color: '#38BDF8',
    createdAt: '2026-10-28',
    x: -62.0,
    y: -6.0,
    z: 0.08,
  },
  {
    id: 'star-8',
    name: 'Liam O.',
    location: 'Dublin, IE',
    message: 'Looking forward to seeing your future open-source projects.',
    color: '#9B8FFF',
    createdAt: '2026-10-27',
    x: 52.0,
    y: 24.0,
    z: 0.16,
  },
];

const STORAGE_KEY = 'naresh_portfolio_visitor_stars';

export function getVisitorStars(): VisitorStar[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_VISITOR_STARS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Merge initial with user-saved stars to guarantee all stars exist
      const ids = new Set(parsed.map((s: VisitorStar) => s.id));
      const missingInitial = INITIAL_VISITOR_STARS.filter((s) => !ids.has(s.id));
      return [...missingInitial, ...parsed];
    }
  } catch (_) {}
  return INITIAL_VISITOR_STARS;
}

export function saveVisitorStar(newStar: Omit<VisitorStar, 'id' | 'createdAt' | 'x' | 'y' | 'z'>): VisitorStar {
  const current = getVisitorStars();

  // Pick coordinates on outer celestial halo
  const angle = Math.random() * Math.PI * 2;
  const radius = 50 + Math.random() * 22;
  const x = Math.round((Math.cos(angle) * radius) * 10) / 10;
  const y = Math.round((Math.sin(angle) * radius * 0.85) * 10) / 10;
  const z = Math.round((0.05 + Math.random() * 0.25) * 100) / 100;

  const star: VisitorStar = {
    ...newStar,
    id: `star-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    x,
    y,
    z,
    isUserStar: true,
  };

  try {
    const updated = [...current, star];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (_) {}

  return star;
}

