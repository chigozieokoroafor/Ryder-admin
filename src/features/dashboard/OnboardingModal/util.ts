import { apiRequest } from '../../../utils/api';

export interface OrganizationChecks {
  organizationProfile: boolean;
  settlementConfiguration: boolean;
  bankAccount: boolean;
  busStops: boolean;
  routesPricing: boolean;
  firstDriver: boolean;
}

export interface OrganizationChecksApiResponse {
  status?: string;
  message?: string;
  data?: Partial<OrganizationChecks>;
  organizationProfile?: boolean;
  settlementConfiguration?: boolean;
  bankAccount?: boolean;
  busStops?: boolean;
  routesPricing?: boolean;
  firstDriver?: boolean;
}

export const DEFAULT_ORGANIZATION_CHECKS: OrganizationChecks = {
  organizationProfile: true,
  settlementConfiguration: false,
  bankAccount: false,
  busStops: false,
  routesPricing: false,
  firstDriver: false,
};

export async function fetchOrganizationChecks(): Promise<OrganizationChecks> {
  const response = await apiRequest<OrganizationChecksApiResponse>('/api/organization/checks', {
    method: 'GET',
  });

  const raw: Partial<OrganizationChecks> =
    response?.data && typeof response.data === 'object' ? response.data : response;

  return {
    organizationProfile: Boolean(raw?.organizationProfile),
    settlementConfiguration: Boolean(raw?.settlementConfiguration),
    bankAccount: Boolean(raw?.bankAccount),
    busStops: Boolean(raw?.busStops),
    routesPricing: Boolean(raw?.routesPricing),
    firstDriver: Boolean(raw?.firstDriver),
  };
}

export function areAllChecksComplete(checks: OrganizationChecks): boolean {
  return (
    checks.organizationProfile &&
    checks.settlementConfiguration &&
    checks.bankAccount &&
    checks.busStops &&
    checks.routesPricing &&
    checks.firstDriver
  );
}

export function checksToCompletedStepIds(checks: OrganizationChecks): number[] {
  const ids: number[] = [];
  if (checks.organizationProfile) ids.push(1);
  if (checks.settlementConfiguration) ids.push(2);
  if (checks.bankAccount) ids.push(3);
  if (checks.busStops) ids.push(4);
  if (checks.routesPricing) ids.push(5);
  if (checks.firstDriver) ids.push(6);
  return ids;
}
