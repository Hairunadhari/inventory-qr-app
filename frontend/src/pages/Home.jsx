import { useEffect, useState } from "react";
import axios from "axios";
import ModalForm from "../components/ModalForm";
import ModalQrcode from "../components/ModalQrcode";

function Home() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalQrcodeOpen, setIsModalQrcodeOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const getItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/item/${id}`);
      getItems(); // refresh list setelah hapus
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(()=> {
    getItems();
  },[]);

  return (
   <div className="p-6">
    <button
        onClick={() => {
          setSelectedItem(null); // reset kalau tambah
          setIsModalOpen(true);
        }}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        + Tambah Item
      </button>
  <h1 className="text-xl font-bold mb-4">Daftar Barang</h1>
  <div className="overflow-x-auto shadow-md rounded-lg">
    <table className="min-w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Nama</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Stok</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Harga</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Opsi</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
        <tr className="hover:bg-gray-50" key={item._id ? item._id.toString() : ""}>
          <td className="border border-gray-300 px-4 py-2">{item._id ? item._id.toString() : ""}</td>
          <td className="border border-gray-300 px-4 py-2">{item.name}</td>
          <td className="border border-gray-300 px-4 py-2">{item.stock}</td>
          <td className="border border-gray-300 px-4 py-2">{item.price}</td>
           <td className="border p-2">
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setIsModalOpen(true);
                  }}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                 <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
              <button
                onClick={() => {
                  setIsModalQrcodeOpen(true);
                }} 
               className="bg-yellow-500 px-3 py-1 rounded text-white ml-2">Print Code</button>
              </td>
        </tr>
        ))}
        
      </tbody>
    </table>
    <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedItem}
        onSuccess={getItems}
      />
      <ModalQrcode isOpen={isModalQrcodeOpen}/>
  </div>
   
</div>


  );
}

export default Home;
