import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ModalForm({isOpen, onClose, initialData, onSuccess}){
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: ""
    });

    useEffect(()=> {
        if(initialData){
            setFormData(initialData);
        }else {
            setFormData({
                name: "",
                price: "",
                stock: ""
            });
        }
    },[initialData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            if (initialData && initialData._id) {
                await axios.put(`http://localhost:5000/api/item/${initialData._id}`, formData);
            }else{
                await axios.post("http://localhost:5000/api/create", formData);
            }
            onSuccess();
            onClose();
            toast.success('Item saved successfully');
            setFormData({ name: "", stock: "", price: "" }); // reset form
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Terjadi kesalahan");
        }
    };
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
            {initialData ? "Edit Item" : "Add Item"}
            </h2>
        
            <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="text"
                name="name"
                placeholder="Name Item"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />
            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <div className="flex justify-end space-x-2">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                Close
                </button>
                <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                {initialData ? "Update" : "Save"}
                </button>
            </div>
            </form>
        </div>
    </div>
    );
}

export default ModalForm;