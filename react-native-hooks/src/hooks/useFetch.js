import React, { useEffect, useState } from "react";

/**
 * url을 인자로 받아 데이터 fetch를 처리하는 커스텀 훅
 * @param {*} url
 * @returns
 */
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInProgress(true);
        const res = await fetch(url);
        const result = await res.json();
        if (res.ok) {
          setData(result);
          setError(null);
        } else {
          throw result;
        }
      } catch (e) {
        setError(e);
      } finally {
        setInProgress(false);
      }
    };
    fetchData();
  }, []);
  return { data, error, inProgress };
};
