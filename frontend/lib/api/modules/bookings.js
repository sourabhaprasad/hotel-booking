import client from "../client";
import endpoints from "../endpoints/bookings";

export const createBooking = async (payload, token) => {
  return client(endpoints.create, {
    method: "POST",
    body: payload,
    token,
  });
};

export const fetchConfirmedBooking = async (id, token) => {
  if (!id) throw new Error("Booking ID is required");

  return client(endpoints.getConfirmed(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchHostBookings = async (token) => {
  return client(endpoints.getHostBookings, {
    method: "GET",
    token,
  });
};

export const getGuestBookings = async (token) => {
  return client(endpoints.myBookings, {
    method: "GET",
    token,
  });
};
