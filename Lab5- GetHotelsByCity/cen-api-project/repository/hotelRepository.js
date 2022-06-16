import couchbase from "couchbase";
import { RepositoryError } from "../exceptions/repositoryError.js";
import { couchbaseConnect } from "./cbManager.js";

export async function findHotelById(hotelId) {
    try {
        const cluster = await couchbaseConnect();
        const bucket = cluster.bucket("travel-sample");
        const scope = bucket.scope("inventory");
        const collection = scope.collection("hotel"); // TODO: Move bucket/scope/collection names to config
        const result = await collection.get(hotelId);
        return result.content;
    } catch (error) {
        console.error(error);
        if(error instanceof couchbase.DocumentNotFoundError) {
            throw new RepositoryError(`Failed to find a hotel document with id ${hotelId}`);
        }
        throw error;
    }
}

export async function createHotel(hotelId, hotel) {
  if (hotelId != "hotel_"+ hotel.id) {
        throw new RepositoryError("Error:: The hotel Id and the key are different");
  }
  try {
      const cluster = await couchbaseConnect();
      const bucket = cluster.bucket("travel-sample");
      const scope = bucket.scope("inventory");
      const collection = scope.collection("hotel");
      await collection.insert(hotelId, hotel);
      return hotelId;
  } catch (error) {
      console.error(error);
      if (error instanceof couchbase.DocumentExistsError) {
          throw new RepositoryError(`a document with the id ${hotelId} exists already in your bucket`);
      }
      throw error;
  }
}

export async function updateHotel(hotelId, hotel) {
    if (hotelId != "hotel_"+hotel.id) {
        throw new RepositoryError("Error:: The hotel Id and the key are different!");
    }
    try {
        const cluster = await couchbaseConnect();
        const bucket = cluster.bucket("travel-sample");
        const scope = bucket.scope("inventory");
        const collection = scope.collection("hotel");
        await collection.replace(hotelId, hotel);
        return hotel;
    } catch (error) {
        console.error(error);
        if (error instanceof couchbase.DocumentNotFoundError) {
            throw new RepositoryError(`Failed to find a hotel document with id ${hotelId}`);
        }
        throw error;
    }
}

export async function deleteHotel(hotelId) {
    try {
        const cluster = await couchbaseConnect();
        const bucket = cluster.bucket("travel-sample");
        const scope = bucket.scope("inventory");
        const collection = scope.collection("hotel");
        await collection.remove(hotelId);
    } catch (error) {
        console.error(error);
        if (error instanceof couchbase.DocumentNotFoundError) {
            throw new RepositoryError(`Failed to find a hotel document with id ${hotelId}`);
        }
        throw error;
    }
}

export async function getHotelsByCity(city) {
    const queryString = `SELECT name, title, description
    FROM \`travel-sample\`.inventory.hotel
    WHERE city = $city`;

    const options = {
        parameters: {
            city: city
        }
    };
    try {
        const cluster = await couchbaseConnect();
        const results = await cluster.query(queryString, options);
        return results.rows;
    } catch (error) {
        console.error(error);
        if( error instanceof couchbase.CouchbaseError) {
            throw new RepositoryError("Something happened with the CB query");
        }
        throw error;
    }
}
