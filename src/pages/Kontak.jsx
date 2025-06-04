import { Layout } from "../layout/Layout";
import axios from "axios";
import { useRef, useState } from "react";
import FetchData from "../hooks/FetchData";
import { FormKontak } from "./form/FormKontak";
import { Button } from "../components/Button";
import ToastDelConfirm from "../components/ToastDelConfirm";

export const Kontak = () => {
  const api = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const modalRef = useRef();
  const [selectedId, setSelectedId] = useState(null);

  const { data, loading, error, setData } = FetchData({
    url: `${api}/admin/contacts`,
    token: token,
  });

  const openModal = (id) => {
    setSelectedId(id);
    modalRef.current.showModal();
  };

  const handleDelete = async (id) => {
    return axios.delete(`${api}/admin/contacts/${id}`, {
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
            <h1 className="text-2xl font-semibold text-gray-800">Kontak</h1>
            <nav className="mt-2">
              <ol className="flex text-sm text-gray-500 space-x-2">
                <li>
                  <a href="/" className="hover:underline text-blue-600">
                    Home
                  </a>
                </li>
                <li>/</li>
                <li className="text-gray-700 font-medium">Kontak</li>
              </ol>
            </nav>
          </div>

          <div className="flex justify-end mb-4">
            {data?.data.length === 0 && (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md"
                onClick={() => openModal(null)}
              >
                + Add Data
              </button>
            )}
          </div>

          <div className="w-full overflow-x-auto sm:overflow-x-visible">
            <table className="table w-full text-center">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th>No</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Office Opperation</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {data?.data && (
                  <tr key={data.data.id}>
                    <td>1</td>
                    <td>{data.data.phone}</td>
                    <td>{data.data.email}</td>
                    <td>{data.data.address}</td>
                    <td>{data.data.office_operation}</td>
                    <td className="space-x-2">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                        onClick={() => openModal(data.data.id)}
                      >
                        Edit
                      </button>
                      <Button
                        buttonName="Delete"
                        onClick={() => onClickDelToast(data.data.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <FormKontak id={selectedId} modalRef={modalRef} />
        </div>
      )}
    </Layout>
  );
};
