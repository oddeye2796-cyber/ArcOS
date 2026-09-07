import { PoCTrial } from '../types';

export const POC_TRIAL_DAYS = 14;

/** Days left at or below which the trial is flagged as ending soon. */
export const POC_EXPIRY_WARNING_DAYS = 3;

/** Maximum number of times a trial may be extended, and by how many days. */
export const POC_EXTENSION_DAYS = 7;
export const POC_MAX_EXTENSIONS = 1;

export type PoCStageId = 'applied' | 'provisioned' | 'collecting' | 'review' | 'decision';

export const POC_STAGES: readonly PoCStageId[] = [
  'applied',
  'provisioned',
  'collecting',
  'review',
  'decision'
] as const;

/** Elapsed days at which each stage starts. */
const STAGE_START_DAY: Record<PoCStageId, number> = {
  applied: 0,
  provisioned: 1,
  collecting: 2,
  review: 7,
  decision: 11
};

export interface PoCProgress {
  /** Total trial window, including any granted extension. */
  totalDays: number;
  daysElapsed: number;
  daysRemaining: number;
  percentElapsed: number;
  currentStage: PoCStageId;
  completedStages: PoCStageId[];
  isEndingSoon: boolean;
  isExpired: boolean;
}

export function getPoCProgress(trial: PoCTrial): PoCProgress {
  // An extension widens the window rather than rewinding progress: without this
  // the elapsed count goes negative and the timeline snaps back to day zero.
  const totalDays = POC_TRIAL_DAYS + (trial.extensionsUsed ?? 0) * POC_EXTENSION_DAYS;
  const daysRemaining = Math.max(0, Math.min(totalDays, trial.daysRemaining));
  const daysElapsed = totalDays - daysRemaining;
  const percentElapsed = Math.round((daysElapsed / totalDays) * 100);

  // The last stage whose start day has been reached is the current one.
  let currentStage: PoCStageId = 'applied';
  const completedStages: PoCStageId[] = [];
  for (const stage of POC_STAGES) {
    if (daysElapsed >= STAGE_START_DAY[stage]) {
      if (currentStage !== stage) completedStages.push(currentStage);
      currentStage = stage;
    }
  }

  return {
    totalDays,
    daysElapsed,
    daysRemaining,
    percentElapsed,
    currentStage,
    completedStages,
    isEndingSoon: daysRemaining > 0 && daysRemaining <= POC_EXPIRY_WARNING_DAYS,
    isExpired: daysRemaining === 0 || trial.status === 'expired'
  };
}

export function canExtend(trial: PoCTrial): boolean {
  return (trial.extensionsUsed ?? 0) < POC_MAX_EXTENSIONS && trial.status !== 'converted';
}
