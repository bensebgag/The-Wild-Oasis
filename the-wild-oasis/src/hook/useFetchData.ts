// src/hooks/useFetchData.ts
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url);
        console.log(response.data, "fetch");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.log("error");
        setError("An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
