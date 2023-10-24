import { useState } from 'react';
import { retryPromise, withTimeout } from 'lib/promise';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const get = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const fetcher = () => fetch(url);
      const res = await retryPromise(withTimeout(fetcher));
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      setData(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, get };
};

export default useFetch;
