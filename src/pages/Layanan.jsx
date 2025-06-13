import { Layout } from "../layout/Layout";
import axios from "axios";
import { useRef, useState } from "react";
import FetchData from "../hooks/FetchData";
import { Button } from "../components/Button";
import { FormPage } from "./Form/FormPage";
import ToastDelConfirm from "../components/ToastDelConfirm";
import { FormLayanan } from "./form/FormLayanan";

export const Layanan = () => {
  const api = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");
  const [selectedType, setSelectedType] = useState("all");

  const modalRef = useRef();
  const [selectedId, setSelectedId] = useState(null);

  const { data, loading, error, setData } = FetchData({
    url: `${api}/admin/products`,
    token: token,
  });

  const openModal = (id) => {
    setSelectedId(id);
    modalRef.current.showModal();
  };

  const handleDelete = async (id) => {
    return axios.delete(`${api}/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const onClickDelToast = (id) => {
    ToastDelConfirm({
      id,
      onConfirm: async (id) => {
        await handleDelete(id);
        setData((prevData) => ({
          ...prevData,
          data: prevData.data.filter((item) => item.id !== id),
        }));
      },
    });
  };

  const filteredData =
    selectedType === "all"
      ? data?.data
      : data?.data.filter((item) => item.type === selectedType);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 px-4 py-2 text-center rounded-md mx-auto max-w-xl mt-10">
          {error}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Layanan</h1>
            <nav className="mt-2">
              <ol className="flex text-sm text-gray-500 space-x-2">
                <li>
                  <a href="/" className="hover:underline text-blue-600">
                    Home
                  </a>
                </li>
                <li>/</li>
                <li className="text-gray-700 font-medium">Layanan</li>
              </ol>
            </nav>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-blue-50 border border-blue-500 text-blue-700 rounded px-3 py-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-2 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 019 18v-4.586L3.293 6.707A1 1 0 013 6V4z"
                  />
                </svg>
                <select
                  className="bg-transparent focus:outline-none text-sm text-blue-700"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {[...new Set(data?.data.map((item) => item.type))].map(
                    (type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md"
              onClick={() => openModal(null)}
            >
              + Add Data
            </button>
          </div>

          <div className="w-full overflow-x-auto sm:overflow-x-visible">
            <table className="table w-full text-center">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>type</th>
                  <th>icon</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td>{item.title}</td>
                    <td dangerouslySetInnerHTML={{ __html: item.description }}></td>
                    <td>{item.price}</td>
                    <td>{item.discount}</td>
                    <td>{item.type}</td>
                    <td>
                      <img
                        src={`${import.meta.env.VITE_IMG + item.icon}`}
                        alt={item.title}
                        className="w-28 h-20 object-cover rounded-md mx-auto"
                      />
                    </td>
                    <td className="space-x-2">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                        onClick={() => openModal(item.id)}
                      >
                        Edit
                      </button>
                      <Button
                        buttonName="Delete"
                        onClick={() => onClickDelToast(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <FormLayanan id={selectedId} modalRef={modalRef} />
        </div>
      )}
    </Layout>
  );
};
