import { Layout } from "../layout/Layout";
import FetchData from "../hooks/FetchData";

export const Dashboard = () => {
  const api = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  // Ambil data dari API
  const { data, loading, error } = FetchData({
    url: `${api}/admin/users/me`,
    token: token,
  });

  return (
    <Layout>
      {/* Loading spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : error ? (
        // Error alert
        <div className="bg-red-100 text-red-700 px-4 py-2 text-center rounded-md mx-auto max-w-xl">
          {error.message || "Terjadi kesalahan"}
        </div>
      ) : (
        <>
          {/* Judul halaman & breadcrumb */}
          <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <nav className="mt-2">
              <ol className="flex text-sm text-gray-500 space-x-2">
                <li>
                  <a href="/" className="hover:underline text-blue-600">
                    Home
                  </a>
                </li>
                <li>/</li>
                <li className="text-gray-700 font-medium">Dashboard</li>
              </ol>
            </nav>
          </div>

          {/* Konten utama dashboard */}
          <section>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">
                  Selamat datang, {data?.data?.name || "User"}
                </h2>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
};
