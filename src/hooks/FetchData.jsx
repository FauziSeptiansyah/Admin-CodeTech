import axios from "axios";
import { useEffect, useState } from "react";

// Custom Hook untuk mengambil data dari API
export default function FetchData({ url, token }) {
  // State untuk menyimpan data dari API
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Melakukan permintaan GET ke API dengan token sebagai authorization
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        // Jika berhasil, simpan data ke dalam state `data`
        setData(response.data);
      } catch (error) {
        // Jika terjadi error, simpan error ke dalam state `error`
        setError(error);
      } finally {
        // Setelah selesai, set `loading` menjadi false
        setLoading(false);
      }
    };

    // Panggil fungsi fetchData
    fetchData();
  }, [url, token]);

  // Return data, loading, error, dan fungsi setData untuk update data dari komponen lain
  return { data, loading, error, setData };
}
