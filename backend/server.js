const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//konfigurasi database
mongoose.connect('mongodb://localhost:27017/inventory_qr_app')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// schema barang barang dinamis
const ItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    stock: {type: Number, required: true},
    price: {type: Number, required: true},
}, { timestamps: true });

const QrItem = mongoose.model('Item', ItemSchema);

// api create
app.post('/api/create', async (req, res) => {

    // simpan ke database
    const item  = new QrItem(req.body);
    await item.save();
    res.json({message: 'Item created successfully', item});
});

app.get('/api/items', async (req, res) => {
    const items = await QrItem.find();
    res.json(items);
});

app.get('/api/item/:id', async (req, res) => {
  try {
    const { id } = req.params; // ambil id dari URL
    const item = await QrItem.findById(id); // cari item di MongoDB berdasarkan _id

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item); // kirim data item ke client
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.put('/api/item/:id', async (req, res) => {
  try {
    const { id } = req.params;   // ambil id dari URL
    const { nama, kategori, stok, harga } = req.body; // ambil data baru dari body

    const updatedItem = await QrItem.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // new: true = balikin data terbaru, runValidators: true = jalanin validasi schema
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item updated successfully', updatedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.delete('/api/item/:id', async (req, res) => {
  try {
    const { id } = req.params; // ambil id dari URL
    const deletedItem = await QrItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully', deletedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// api get item by scanner
app.get('/api/get-item-by-scanner/:id', async (req, res) => {
  try {
    const { id } = req.params; // ambil id dari URL
    const item = await QrItem.findById(id); // cari item di MongoDB berdasarkan _id

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({item}); // kirim data item ke client
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/barang-keluar", async (req, res) => {
  try {
    const { _id, stockOut } = req.body;

    // cari item berdasarkan ID
    const item = await QrItem.findById(_id);
    if (!item) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    // cek stok cukup
    if (item.stock < stockOut) {
      return res.status(400).json({ message: "Stok tidak mencukupi" });
    }

    // kurangi stok
    item.stock -= stockOut;
    await item.save();

    res.json({
      message: "Barang keluar berhasil dicatat",
      updatedItem: item,
    });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: err.message });
  }
});


app.listen(5000, () => {
    console.log('Server running on port 5000');
});