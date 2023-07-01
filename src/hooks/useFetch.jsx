import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  // handle getData
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setLoading(false);
        setData(data.results);
      } catch (err) {
        setLoading(false);
        const msg = error.msg ? err.msg : "something went wrong";
        setError(msg);
      }
    };
    getData(url);
  }, [url]);
  return { data, error, loading };
};

export default useFetch;
