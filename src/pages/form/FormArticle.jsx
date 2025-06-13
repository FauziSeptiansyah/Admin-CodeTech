import { useEffect, useState } from "react";
import axios from "axios";
import FetchData from "../../hooks/FetchData";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ModalWrapper } from "../../components/ModalWrapper";
import { TrixInput } from "../../components/TrixInput";
import toast from "react-hot-toast";

export const FormArticle = ({ id, modalRef }) => {
  const api = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const { data: detail } = FetchData({ url: `${api}/admin/articles`, token });

  // Data Category
  const { data: categoryArticle } = FetchData({
    url: `${api}/admin/category-articles`,
    token,
  });

  // Data User
  const { data: user } = FetchData({
    url: `${api}/admin/users/me`,
    token: token,
  });

  const findData = detail?.data.find((item) => item.id == id);

  const [oldThumbnail, setOldThumbnail] = useState(null);
  const [userData, setUser] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    user_id: "", // awalnya kosong
    thumbnail: null,
  });

  // Update userData setelah fetch user selesai
  useEffect(() => {
    setUser(user);
  }, [user]);

  // Set user_id setelah userData tersedia
  useEffect(() => {
    if (userData?.data?.id) {
      setFormData((prev) => ({
        ...prev,
        user_id: userData.data.id,
      }));
    }
  }, [userData]);

  useEffect(() => {
    if (findData) {
      setFormData((prev) => ({
        ...prev,
        title: findData.title || "",
        description: findData.description || "",
        category_id: findData.category_id || "",
        thumbnail: null,
        user_id: prev.user_id,
      }));
      setOldThumbnail(findData.thumbnail);
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

    console.log(formData);

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "thumbnail" && value === null) return;
      form.append(key, value);
    });

    try {
      const url = id ? `${api}/admin/articles/${id}` : `${api}/admin/articles`;
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
    <ModalWrapper
      title={`${id ? "Edit" : "Tambah"} Artikel`}
      modalRef={modalRef}
    >
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <label className="text-sm font-medium text-gray-700">Title</label>
        <Input
          type="text"
          name="title"
          onChange={handleChange}
          value={formData.title}
          className="mt-2 w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition"
        />

        <label className="text-sm font-medium text-gray-700">Description</label>
        <TrixInput
          value={formData.description}
          onChange={(html, text) =>
            setFormData({ ...formData, description: html })
          }
          className="w-full"
        />

        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition"
          >
            <option value="">Pilih Kategori</option>
            {categoryArticle?.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        <label className="text-sm font-medium text-gray-700">Thumbnail</label>
        <Input
          type="file"
          name="thumbnail"
          onChange={handleChange}
          className="mt-2 w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        {oldThumbnail && (
          <p className="text-xs text-gray-500 mt-1">
            Thumbnail lama:{" "}
            <span className="text-blue-500">{oldThumbnail}</span>
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
