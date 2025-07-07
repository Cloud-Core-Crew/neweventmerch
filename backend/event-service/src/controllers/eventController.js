const mongoose = require('mongoose');
const Event = require('../models/event');

// Add a new event
exports.addEvent = async (req, res) => {
    try {
        console.log('Incoming event POST body:', req.body); // Log incoming request body
        // Map incoming fields to model fields
        const {
            name,
            title,
            date,
            description,
            venue,
            category,
            price,
            image
        } = req.body;

        // Use 'title' if provided, otherwise fallback to 'name'
        const eventTitle = title || name;
        // Map Football/Cricket to Sports, else fallback to 'Other' if not in enum
        let mappedCategory = category;
        if (category === 'Football' || category === 'Cricket') mappedCategory = 'Sports';
        const allowedCategories = ['Music', 'Sports', 'Conferences', 'Charity', 'Other'];
        if (!allowedCategories.includes(mappedCategory)) mappedCategory = 'Other';
        // Generate a default description if missing
        const eventDescription = description || `${eventTitle} at ${venue || 'venue'} on ${date || 'date'}`;

        // Parse date string to Date object if necessary
        let parsedDate = date;
        if (typeof date === 'string') {
            parsedDate = new Date(date);
        }
        const newEvent = new Event({
            title: eventTitle,
            date: parsedDate,
            description: eventDescription,
            venue,
            category: mappedCategory,
            price,
            image,
            isActive: true
        });
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        // Use custom error handler if validation error
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: Event.handleValidationError(error) });
        }
        console.error('Event creation error:', error); // Log full error to server console
        res.status(500).json({ message: 'Error creating event', error: error.message, stack: error.stack });
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
                title: 'FIFA WC 2026 – Opener: Mexico vs Poland',
                image: 'https://example.com/fifa/opening.jpg',
                price: 120,
                category: 'Sports',
                venue: 'Estadio Azteca, Mexico City',
                date: '2026-06-11T18:00:00Z',
                description: 'Exciting opening match of the FIFA World Cup 2026.',
                isActive: true
            },
            {
                title: 'FIFA WC 2026 – Canada vs Spain',
                image: 'https://example.com/fifa/canada_spain.jpg',
                price: 110,
                category: 'Sports',
                venue: 'BMO Field, Toronto',
                date: '2026-06-12T19:00:00Z',
                description: 'Watch Canada take on Spain in this group stage match.',
                isActive: true
            },
            {
                title: 'FIFA WC 2026 – USA vs France',
                image: 'https://example.com/fifa/usa_france.jpg',
                price: 115,
                category: 'Sports',
                venue: 'SoFi Stadium, Los Angeles',
                date: '2026-06-12T19:00:00Z',
                description: 'USA faces France in a thrilling encounter.',
                isActive: true
            },
            {
                title: 'FIFA WC 2026 – Germany vs Japan',
                image: 'https://example.com/fifa/germany_japan.jpg',
                price: 105,
                category: 'Sports',
                venue: 'BC Place, Vancouver',
                date: '2026-06-13T19:00:00Z',
                description: 'Germany meets Japan in this group stage match.',
                isActive: true
            },
            {
                title: 'FIFA WC 2026 – Canada vs Morocco',
                image: 'https://example.com/fifa/canada_morocco.jpg',
                price: 110,
                category: 'Sports',
                venue: 'BC Place, Vancouver',
                date: '2026-06-18T19:00:00Z',
                description: 'Canada faces Morocco in a crucial group match.',
                isActive: true
            },
            {
                title: 'FIFA WC 2026 – Belgium vs Argentina',
                image: 'https://example.com/fifa/belgium_argentina.jpg',
                price: 100,
                category: 'Sports',
                venue: 'BC Place, Vancouver',
                date: '2026-06-21T19:00:00Z',
                description: 'Belgium takes on Argentina in a high-stakes match.',
                isActive: true
            },
            {
                title: 'FIFA WC 2026 – Round of 32: Brazil vs Switzerland',
                image: 'https://example.com/fifa/brazil_switzerland.jpg',
                price: 130,
                category: 'Sports',
                venue: 'BC Place, Vancouver',
                date: '2026-07-02T19:00:00Z',
                description: 'Brazil faces Switzerland in the round of 32.',
                isActive: true
            },
            {
                title: 'FIFA WC 2026 – Round of 16: England vs Netherlands',
                image: 'https://example.com/fifa/england_netherlands.jpg',
                price: 135,
                category: 'Sports',
                venue: 'BC Place, Vancouver',
                date: '2026-07-07T19:00:00Z',
                description: 'England meets Netherlands in the round of 16.',
                isActive: true
            },
            {
                title: 'FIFA WC 2026 – Semi‑final: Italy vs Brazil',
                image: 'https://example.com/fifa/italy_brazil.jpg',
                price: 140,
                category: 'Sports',
                venue: 'AT&T Stadium, Dallas',
                date: '2026-07-14T19:00:00Z',
                description: 'Italy faces Brazil in the semi-final.',
                isActive: true
            },
            {
                title: 'FIFA WC 2026 – Final: Argentina vs France',
                image: 'https://example.com/fifa/final.jpg',
                price: 200,
                category: 'Sports',
                venue: 'MetLife Stadium, New Jersey',
                date: '2026-07-19T19:00:00Z',
                description: 'The grand final between Argentina and France.',
                isActive: true
            },
            {
                title: 'T20 WC 2026 – India vs Ireland',
                image: 'https://example.com/t20/india_ireland.jpg',
                price: 45,
                category: 'Sports',
                venue: 'Narendra Modi Stadium, Ahmedabad',
                date: '2026-02-10T09:30:00Z',
                description: 'India takes on Ireland in the T20 World Cup.',
                isActive: true
            },
            {
                title: 'T20 WC 2026 – Pakistan vs New Zealand',
                image: 'https://example.com/t20/pakistan_newzealand.jpg',
                price: 42,
                category: 'Sports',
                venue: 'Hyderabad',
                date: '2026-02-10T14:00:00Z',
                description: 'Pakistan faces New Zealand in the T20 World Cup.',
                isActive: true
            },
            {
                title: 'T20 WC 2026 – England vs Afghanistan',
                image: 'https://example.com/t20/england_afghanistan.jpg',
                price: 40,
                category: 'Sports',
                venue: 'Kolkata',
                date: '2026-02-11T09:30:00Z',
                description: 'England meets Afghanistan in the T20 World Cup.',
                isActive: true
            },
            {
                title: 'T20 WC 2026 – Australia vs USA',
                image: 'https://example.com/t20/australia_usa.jpg',
                price: 42,
                category: 'Sports',
                venue: 'Chennai',
                date: '2026-02-11T14:00:00Z',
                description: 'Australia faces USA in the T20 World Cup.',
                isActive: true
            },
            {
                title: 'T20 WC 2026 – Sri Lanka vs Ireland',
                image: 'https://example.com/t20/srilanka_ireland.jpg',
                price: 40,
                category: 'Sports',
                venue: 'Delhi',
                date: '2026-02-15T09:30:00Z',
                description: 'Sri Lanka takes on Ireland in the T20 World Cup.',
                isActive: true
            }
        ];
        await Event.deleteMany({});
        const inserted = await Event.insertMany(sampleEvents);
        res.status(201).json({ message: 'Sample events seeded', events: inserted });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding events', error: error.message });
    }
};