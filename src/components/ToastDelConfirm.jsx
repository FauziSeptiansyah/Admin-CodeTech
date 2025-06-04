import toast from "react-hot-toast";

const ToastDelConfirm = ({ id, onConfirm }) => {
  return toast.custom((t) => (
    <div className="fixed inset-0 z-50 flex min-h-screen justify-center items-center">
      <div
        className={`bg-white shadow-md rounded-lg w-[300px] px-5 py-4 transition-all duration-300 justify-center items-center ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="text-yellow-600 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">
            Hapus Data?
          </h3>
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus data ini?
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <button
              className="px-4 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition"
              onClick={async () => {
                try {
                  await onConfirm(id);
                  toast.dismiss(t.id);
                  toast.success("Data berhasil dihapus!");
                } catch (error) {
                  console.error(
                    "Error:",
                    error.response?.data || error.message
                  );
                  toast.dismiss(t.id);
                  toast.error("Gagal menghapus data! Silakan coba lagi.");
                }
              }}
            >
              Hapus
            </button>
            <button
              className="px-4 py-1.5 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition"
              onClick={() => toast.dismiss(t.id)}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default ToastDelConfirm;
