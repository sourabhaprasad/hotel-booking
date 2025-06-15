const bookings = {
  create: "/bookings",
  getConfirmed: (id) => `/bookings/confirmed/${id}`,
  getHostBookings: "/bookings/host",
  myBookings: "/bookings/my-bookings",
};

export default bookings;
