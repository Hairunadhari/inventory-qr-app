import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Scan() {
  const [item, setItem] = useState(null);   // pakai singular biar jelas object
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    function onScanSuccess(decodedText, decodedResult) {
      const getItemByScanner = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/get-item-by-scanner/" + decodedText
          );
          setItem(res.data.item);      // simpan 1 object
          setIsModalOpen(true);   // buka modal
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };

      getItemByScanner();
    }

    function onScanFailure(error) {
      // biasanya diabaikan
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/barang-keluar", {
        _id: item._id,
        stockOut: e.target.stockOut.value,
      });
  toast.success(res.data.message);
      console.log("✅ Data berhasil dikirim:", res.data);
      setIsModalOpen(false); // tutup modal
    } catch (err) {
      console.error("❌ Gagal kirim data:", err);
        toast.error(err.response?.data?.message || "Terjadi kesalahan");
    }
  };
  
  return (
    <div className="bg-gray">

    <div className="flex flex-col items-center justify-center mt-10">
      <style>
        {`
        #reader img {
          display: none !important;
        },
      `}
      </style>
      <h1 className="text-2xl font-bold mb-4 text-gray-700">QR Code Scanner</h1>
      {/* Info Box */}
      <p className="mb-2 text-sm text-gray-500">
        Point the camera at the QR Code to scan it.
      </p>

      {/* Scanner Box */}
      <div
        id="reader"
        className="w-[350px] h-[250px] border-2 border-gray-300 rounded-lg shadow-md"
      >

      </div>

      {/* Modal */}
      {isModalOpen && item && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-2">Scan Berhasil 🎉</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="_id"
                value={item._id ? item._id.toString() : ""}
                className="w-full border p-2 rounded"
              
              />
              <input
                type="text"
                value={item.name}
                className="w-full border p-2 rounded"
                readOnly
              />
              <input
                type="number"
                value={item.stock}
                className="w-full border p-2 rounded"
                readOnly
              />
              <input
                type="number"
                value={item.price}
                className="w-full border p-2 rounded"
                readOnly
              />
              <hr />
             <label htmlFor="stockOut" className="block mb-1 font-medium text-gray-700">
              Masukkan Stok Keluar
            </label>
            <input
              type="number"
              id="stockOut"
              name="stockOut"
              placeholder="Contoh: 2"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />


              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

     
    </div>
    </div>

  );
}

export default Scan;
