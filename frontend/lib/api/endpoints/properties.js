const properties = {
  create: "/properties",
  getAll: "/properties",
  getById: (id) => `/properties/${id}`,
  getPropertyById: (id) => `/properties/${id}`,
  updatePropertyById: (id) => `/properties/${id}`,
  getMyProperties: "/properties/my-properties",
};

export default properties;
