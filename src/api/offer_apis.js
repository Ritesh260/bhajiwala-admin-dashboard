
import api from "./axios";

// Get all today's offers
export const getOffers = async () => {
  const response = await api.get("/offers/today");
  return response.data;
};

// Get single offer
export const getOfferById = async (id) => {
  const response = await api.get(`/offers/today/${id}`);
  return response.data;
};

// Create today's offer
export const createOffer = async (formData) => {
  const response = await api.post(
    "/offers/today",
    formData
  );

  return response.data;
};

// Update today's offer
export const updateOffer = async (id, formData) => {
  const response = await api.put(
    `/offers/today/${id}`,
    formData
  );

  return response.data;
};

// Delete today's offer
export const deleteOffer = async (id) => {
  const response = await api.delete(
    `/offers/today/${id}`
  );

  return response.data;
};
