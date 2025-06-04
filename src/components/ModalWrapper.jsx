export const ModalWrapper = ({ title, modalRef, children }) => {
  return (
    <dialog ref={modalRef} className="modal modal-middle">
      <div className="modal-box w-full max-w-md sm:max-w-xl md:max-w-2xl bg-white text-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg sm:text-xl font-semibold">{title}</h5>
          <button
            type="button"
            onClick={() => modalRef.current?.close()}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold leading-none"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </dialog>
  );
};
