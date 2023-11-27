import { useState } from 'react';
import { retryPromise, withTimeout } from 'js-toolkit/promise';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const parseResponseData = (res) => {
    const contentType = res.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      return res.json();
    } else if (contentType.includes('text')) {
      return res.text();
    } else {
      return res.blob();
    }
  };

  const get = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const res = await retryPromise(withTimeout(() => fetch(url)));
      if (res.ok) {
        setData(await parseResponseData(res));
      } else {
        throw new Error();
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, get };
};

export default useFetch;
