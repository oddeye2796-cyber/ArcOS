/**
 * Resource library index.
 *
 * Only language-independent metadata lives here; the prose is in
 * `i18n/resourcesLocalization.ts` so the reader chunk carries the copy and this
 * index stays cheap to import from the workspace and the detail modal, which
 * only need the id ↔ module mapping to build a deep link.
 */

export type ResourceKind = 'whitepaper' | 'manual' | 'guide' | 'spec';

export interface ResourceDoc {
  id: string;
  kind: ResourceKind;
  /** App or sub-module ids this document covers; drives contextual links. */
  relatedModuleIds: string[];
  updatedAt: string;
  /** Approximate reading time in minutes, shown so people can triage. */
  readingMinutes: number;
  /**
   * Documents rendered by a component rather than by the generic section
   * reader. The architecture whitepaper is interactive, so it keeps its view.
   */
  component?: 'architecture';
}

export const RESOURCE_DOCS: ResourceDoc[] = [
  {
    id: 'arch-whitepaper',
    kind: 'whitepaper',
    relatedModuleIds: ['b2lab', 'smartfactory', 'arcmind'],
    updatedAt: '2026-03-02',
    readingMinutes: 12,
    component: 'architecture'
  },
  {
    id: 'onboarding-guide',
    kind: 'guide',
    relatedModuleIds: [],
    updatedAt: '2026-02-20',
    readingMinutes: 6
  },
  {
    id: 'smartfactory-manual',
    kind: 'manual',
    relatedModuleIds: ['smartfactory', 'mes-pharma', 'mes-food', 'mes-general', 'ebrs', 'rems', 'scm'],
    updatedAt: '2026-02-18',
    readingMinutes: 9
  },
  {
    id: 'a2lab-manual',
    kind: 'manual',
    relatedModuleIds: ['a2lab', 'orch'],
    updatedAt: '2026-01-25',
    readingMinutes: 8
  },
  {
    id: 'consensbot-manual',
    kind: 'manual',
    relatedModuleIds: ['consensbot'],
    updatedAt: '2025-11-04',
    readingMinutes: 7
  },
  {
    id: 'b2lab-spec',
    kind: 'spec',
    relatedModuleIds: ['b2lab', 'twin', 'aesg'],
    updatedAt: '2026-01-25',
    readingMinutes: 10
  }
];

/**
 * First document covering a module, used for the contextual links from the
 * workspace and the detail modal. Manuals win over specs and guides because a
 * person arriving from an installed module wants operating instructions.
 */
const KIND_PRIORITY: Record<ResourceKind, number> = {
  manual: 0,
  spec: 1,
  guide: 2,
  whitepaper: 3
};

export function findDocForModule(moduleId: string): ResourceDoc | null {
  const matches = RESOURCE_DOCS.filter((doc) => doc.relatedModuleIds.includes(moduleId));
  if (matches.length === 0) return null;
  return [...matches].sort((a, b) => KIND_PRIORITY[a.kind] - KIND_PRIORITY[b.kind])[0];
}
