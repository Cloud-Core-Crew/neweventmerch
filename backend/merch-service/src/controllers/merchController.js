const Merch = require('../models/merch');

// Add new merchandise
exports.addMerch = async (req, res) => {
    try {
        const { name, price, imageUrl } = req.body;
        const newMerch = new Merch({ name, price, imageUrl });
        await newMerch.save();
        res.status(201).json(newMerch);
    } catch (error) {
        res.status(500).json({ message: 'Error adding merchandise', error });
    }
};

// Get all merchandise
exports.getMerch = async (req, res) => {
    try {
        const merchList = await Merch.find();
        res.status(200).json(merchList);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving merchandise', error });
    }
};

// Fix: export getAllMerch for route
exports.getAllMerch = exports.getMerch;

// Seed sample merchandise
exports.seedMerch = async (req, res) => {
    try {
        const sampleMerch = [
            {
                name: 'Event T-Shirt',
                price: 25,
                imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
                description: 'Official Event T-Shirt, 100% cotton.'
            },
            {
                name: 'VIP Lanyard',
                price: 10,
                imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                description: 'VIP Access Lanyard for all events.'
            },
            {
                name: 'Event Cap',
                price: 15,
                imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
                description: 'Limited edition event cap.'
            }
        ];
        await Merch.deleteMany({});
        const inserted = await Merch.insertMany(sampleMerch);
        res.status(201).json({ message: 'Sample merchandise seeded', merch: inserted });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding merchandise', error });
    }
};