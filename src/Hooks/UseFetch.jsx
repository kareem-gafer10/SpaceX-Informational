import { useState, useEffect } from "react";
import axios from "axios";

export default function UseFetch(url) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const { data } = await axios.get(url);
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return [data];
}
