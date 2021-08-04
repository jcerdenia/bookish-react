import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRemoteService = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setError(false);
      setLoading(true);

      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [url]);

  return { data, loading, error, setUrl };
  // By exporting setUrl, we give the outside world a chance to change the url.
  // Note: setUrl is a function.
  // Fetching will be triggered with [url] as a dependency for the fetchBooks effect.
}