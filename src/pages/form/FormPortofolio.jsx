import { useEffect, useState } from "react";
import axios from "axios";
import FetchData from "../../hooks/FetchData";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ModalWrapper } from "../../components/ModalWrapper";
import toast from "react-hot-toast";

export const FormPortofolio = ({ id, modalRef }) => {
  const api = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const { data: detail } = FetchData({ url: `${api}/admin/portfolios`, token });

  const findData = detail?.data.find((item) => item.id == id);

  const [oldImage, setOdlImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    image: null,
  });

  useEffect(() => {
    if (findData) {
      setFormData((prev) => ({
        ...prev,
        title: findData.title || "",
        url: findData.url || "",
        image: null,
      }));
      setOdlImage(findData.image);
    }
  }, [findData]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value === null) return;
      form.append(key, value);
    });

    try {
      const url = id ? `${api}/admin/portfolios/${id}` : `${api}/admin/portfolios`;
      const method = id ? "put" : "post";

      await axios({
        method,
        url,
        data: form,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Data berhasil disimpan!");
      modalRef.current?.close();
      window.location.reload(); // sesuai permintaan
    } catch (error) {
      toast.error("Gagal menyimpan data!");
    }
  };

  return (
    <ModalWrapper title={`${id ? "Edit" : "Tambah"} Portofolio`} modalRef={modalRef}>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <label className="text-sm font-medium text-gray-700">Tittle</label>
        <Input
          type="text"
          name="title"
          onChange={handleChange}
          value={formData.title}
          className="mt-2 w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition"
        />

        <label className="text-sm font-medium text-gray-700">Url</label>
        <Input
          type="text"
          name="url"
          onChange={handleChange}
          value={formData.url}
          placeholder="Biarkan kosong jika tidak ingin mengubah"
          className="mt-2 w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition"
        />

        <label className="text-sm font-medium text-gray-700">Image</label>
        <Input
          type="file"
          name="image"
          onChange={handleChange}
          className="mt-2 w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        {oldImage && (
          <p className="text-xs text-gray-500 mt-1">
            image lama: <span className="text-blue-500">{oldImage}</span>
          </p>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="submit"
            buttonName="Save"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          />
          <button
            type="button"
            onClick={() => modalRef.current?.close()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};
