import {QRCodeSVG} from 'qrcode.react';
import { useEffect, useState } from "react";

function ModalQrcode() {
    const [isModalOpen, setIsModalOpen] = useState(false);
const value = "BRG001";

     return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                QR Code Barang
                </h2>
            <div className="flex justify-end space-x-2">
                <button
                type="button"
                // onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                Batal
                </button>
                <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                </button>
            </div>
        </div>
           
        </div>
    );
}

export default ModalQrcode;