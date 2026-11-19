import { useEffect, useMemo, useState } from 'react';
import { fetchLiveDeadlockData, getBundledSnapshot } from '../data/apiClient';
import type { DeadlockHero, DeadlockItem } from '../types/deadlock';

export type DataSourceStatus = 'snapshot' | 'live' | 'cached';

export function useDeadlockData() {
  const bundled = useMemo(() => getBundledSnapshot(), []);
  const [heroes, setHeroes] = useState<DeadlockHero[]>(bundled.heroes);
  const [items, setItems] = useState<DeadlockItem[]>(bundled.items);
  const [status, setStatus] = useState<DataSourceStatus>('snapshot');

  useEffect(() => {
    let active = true;
    fetchLiveDeadlockData()
      .then((res) => {
        if (!active) return;
        setHeroes(res.heroes);
        setItems(res.items);
        setStatus(res.fromCache ? 'cached' : 'live');
      })
      .catch(() => {
        // Silently stay on bundled snapshot fallback
      });
    return () => {
      active = false;
    };
  }, []);

  const heroesByClass = useMemo(
    () => new Map(heroes.map((h) => [h.className, h])),
    [heroes],
  );

  const itemsByClass = useMemo(
    () => new Map(items.map((i) => [i.className, i])),
    [items],
  );

  return {
    heroes,
    items,
    heroesByClass,
    itemsByClass,
    status,
    syncedAt: bundled.syncedAt,
  };
}
