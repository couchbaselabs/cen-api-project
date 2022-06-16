import express from "express";
import { RepositoryError } from "../exceptions/repositoryError.js";
import { createHotel, deleteHotel, findHotelById, getHotelsByCity, updateHotel } from "../repository/hotelRepository.js";

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
router.post('/hotel/:hotelId', async function(req, res){
    const hotelId = req.params.hotelId;
    const newHotel = req.body;
    console.log(`This API should create a new hotel document with id ${hotelId}`);
    try {
        const key = await createHotel(hotelId, newHotel);
        res.statusCode = 201;
        res.send();
    } catch (error) {
        if (error instanceof RepositoryError) {
            res.statusCode = error.status;
            res.send(error.message);
        }
        else {
            res.statusCode = 400;
            res.send("An error occured while sending the request");
        }
    }
});

// Update a hotel
router.put('/hotel/:hotelId', async function(req, res) {
    const hotelId = req.params.hotelId;
    const updatedHotel = req.body;
    console.log(`This API should update the hotel document with the id ${hotelId}`);
    try {
        const updatedHotel = await updateHotel(hotelId, updateHotel);
        res.statusCode = 200;
        res.send(updatedHotel);
    } catch (error) {
        if (error instanceof RepositoryError) {
            res.statusCode = error.status;
            res.send(error.message);
        }
        else {
            res.statusCode = 400;
            res.send('An error occured while sending the request');
        }
    }
});

// Delete a hotel
router.delete('/hotel/:hotelId', async function(req, res) {
    const hotelId = req.params.hotelId;
    console.log(`This API should delete the hotel document with the id ${hotelId}`);
    try {
        await deleteHotel(hotelId);
        res.statusCode = 204;
        res.send();
    } catch (error) {
        if (error instanceof RepositoryError) {
            res.statusCode = error.status;
            res.send(error.message);
        }
        else {
            res.statusCode = 400;
            res.send("An error occured while sending the request");
        }
    }
});

// Get Hotels by city
router.get('/hotels/:city', (req, res) => {
    const city = req.params.city;
    res.send(`This API should send you the list of hotels in ${city}`)
});

export default router;