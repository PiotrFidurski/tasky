import { useMatches } from 'remix';

export function useRouteData<TData>(routeId: string): TData | undefined {
  return useMatches().find((match) => match.id === routeId)?.data as
    | TData
    | undefined;
}
