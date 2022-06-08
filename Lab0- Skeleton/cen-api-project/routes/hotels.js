import express from "express";

const router = express.Router();

// Get Hotel by Id
router.get('/hotel/:hotelId', (req, res) => {
    const hotelId = req.params.hotelId;
    res.send(`This API should send you the hotel document with the id ${hotelId}`);
});

// Create a hotel 
router.post('/hotel/:hotelId', (req, res) => {
    const hotelId = req.params.hotelId;
    const newHotel = req.body;
    res.send(`This API should create a new hotel document with id ${hotelId}`);
});

// Update a hotel
router.put('/hotel/:hotelId', (req, res) => {
    const hotelId = req.params.hotelId;
    const newHotel = req.body;
    res.send(`This API should update the hotel document with the id ${hotelId}`);
});

// Delete a hotel
router.delete('/hotel/:hotelId', (req, res) => {
    const hotelId = req.params.hotelId;
    res.send(`This API should delete the hotel document with the id ${hotelId}`);
});

// Get Hotels by city
router.get('/hotels/:city', (req, res) => {
    const city = req.params.city;
    res.send(`This API should send you the list of hotels in ${city}`)
});

export default router;