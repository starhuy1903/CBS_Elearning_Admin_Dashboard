import { useEffect, useState } from "react";
import api from "../api/api";

const useFetch = (url, method, body, params) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  console.log("re-render");

  useEffect(() => {
    (async () => {
      try {
        setIsPending(true);
        const response = await api.request({
          url: url,
          method: method,
          data: body,
          params: params,
        });

        console.log("re-render");
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    })();
  }, [url]);

  return {
    data,
    isPending,
    error,
  };
};

export default useFetch;
