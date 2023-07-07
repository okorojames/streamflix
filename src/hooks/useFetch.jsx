import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  // context global states
  const { page, pageChanged } = useContext(MoviesContext);

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
        const msg = err.msg ? err.msg : "something went wrong";
        setError(msg);
      }
    };
    getData(url);
  }, [url, page, pageChanged]);
  return { data, error, loading };
};

export default useFetch;
