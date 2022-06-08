import express from "express";
import { RepositoryError } from "../exceptions/repositoryError.js";
import { findHotelById } from "../repository/hotelRepository.js";

const router = express.Router();

// Get Hotel by Id
router.get('/hotel/:hotelId', async function(req, res) {
    const hotelId = req.params.hotelId;
    console.log(`This API should send you the hotel document with the id ${hotelId}`);
    try {
        const hotel = await findHotelById(hotelId);
        res.send(hotel);
    } catch (error) {
        if(error instanceof RepositoryError) {
            res.statusCode = error.status;
            res.send(error.message);
        }
        else {
            res.statusCode = 400;
            res.send("An error occured while sending the request");
        }
    }

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