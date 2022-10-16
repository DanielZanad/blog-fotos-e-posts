import { useEffect, useState } from 'react';
import { IPost } from '../interfaces/Post';
import axios from '../services/axios';

export const useFetchData = (url: string) => {
  const [data, setData] = useState<IPost[]>([]);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);
      try {
        const getData = await axios.get(url);

        setData(getData.data.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  });

  return { data, loading, error };
};
