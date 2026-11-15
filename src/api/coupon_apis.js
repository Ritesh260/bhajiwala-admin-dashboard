
import api from "./axios";

// ==========================================
// GET ALL COUPONS
// ==========================================

export const getCoupons = async () => {
  const response = await api.get("/coupons");
  return response.data;
};


// ==========================================
// GET SINGLE COUPON
// ==========================================

export const getCouponById = async (id) => {
  const response = await api.get(`/coupons/${id}`);
  return response.data;
};


// ==========================================
// CREATE COUPON
// ==========================================

export const createCoupon = async (formData) => {
  const response = await api.post(
    "/coupons",
    formData
  );

  return response.data;
};


// ==========================================
// UPDATE COUPON
// ==========================================

export const updateCoupon = async (id, formData) => {
  const response = await api.put(
    `/coupons/${id}`,
    formData
  );

  return response.data;
};


// ==========================================
// DELETE COUPON
// ==========================================

export const deleteCoupon = async (id) => {
  const response = await api.delete(
    `/coupons/${id}`
  );

  return response.data;
};
