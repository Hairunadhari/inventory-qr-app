import {QRCodeSVG} from 'qrcode.react';
import { useEffect, useState } from "react";

function ModalQrcode({isOpen, onClose, id}) {
    console.log("ID in ModalQrcode:", id);
    
if(!isOpen) return null;
     return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                QrCode Item
                </h2>
                <div className="display-flex">
                    <div className="mb-4 flex justify-center">
                        <QRCodeSVG value={id} />
                    </div>
                </div>
            <div className="flex justify-end space-x-2">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                Close
                </button>
            </div>
        </div>
           
        </div>
    );
}

export default ModalQrcode;