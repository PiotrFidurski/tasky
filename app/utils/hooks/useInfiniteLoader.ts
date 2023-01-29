import { useEffect, useRef, useState } from 'react';

import { useFetcher } from 'remix';

import { actionTypes } from '~/server/actions/actionTypes';

import { JsonifiedTask } from '~/types';

export function useInfiniteLoader() {
  const fetcher = useFetcher();

  const [tasksData, setTasksData] = useState<JsonifiedTask[]>([]);

  const handleLoadMoreData = (id: string | null) => {
    if (!id) return null;

    return fetcher.submit(
      {
        id,
        _action: actionTypes.LOAD_MORE_TASKS,
      },
      { method: 'post' }
    );
  };

  const observer = useRef<null | IntersectionObserver>(null);

  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.target) {
        handleLoadMoreData(entry.target.getAttribute('data-id'));
      }
    });
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setTasksData((prevTasks) => [...prevTasks, ...fetcher.data]);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (observer.current && element) {
      observer.current.observe(element);
    }

    return () => {
      if (observer.current && element) {
        observer.current.unobserve(element);
      }
    };
  }, [element]);

  return { tasksData, setTasksData, setElement, Form: fetcher.Form };
}
