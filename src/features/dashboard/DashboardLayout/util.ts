import type { OrganizationChecks } from '../OnboardingModal/util';

export interface DashboardOutletContext {
  checks: OrganizationChecks | null;
  refreshChecks: () => Promise<void>;
}
