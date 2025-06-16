const Event = require('../models/event');

// Add a new event
exports.addEvent = async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const newEvent = new Event({ title, date, description });
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error: error.message });
    }
};

// Seed sample events
exports.seedEvents = async (req, res) => {
    try {
        const sampleEvents = [
            {
                title: 'Summer Music Fest',
                date: '2025-07-15',
                description: 'Join us for a night of music, food, and fun under the stars!'
            },
            {
                title: 'Tech Innovators Conference',
                date: '2025-08-10',
                description: 'A gathering of the brightest minds in technology and innovation.'
            },
            {
                title: 'Charity Run 5K',
                date: '2025-09-01',
                description: 'Run for a cause and support local charities in our annual 5K.'
            }
        ];
        await Event.deleteMany({});
        const inserted = await Event.insertMany(sampleEvents);
        res.status(201).json({ message: 'Sample events seeded', events: inserted });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding events', error: error.message });
    }
};