// api/modules/properties.js
import client from "../client";
import endpoints from "../endpoints/properties";

export const createProperty = async (formData, token) => {
  return client(endpoints.create, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export const fetchAllProperties = async (filters = {}) => {
  const params = {
    city: filters.city,
    guests: filters.guests,
    sortBy: filters.sortBy,
    amenities:
      filters.selectedAmenities?.length > 0
        ? filters.selectedAmenities.join(",")
        : undefined,
  };

  return client(endpoints.getAll, { params });
};

export const fetchPropertyById = async (id) => {
  if (!id) throw new Error("Property ID is required");
  return client(endpoints.getById(id));
};

export const getPropertyById = async (id, token) => {
  return client(endpoints.getPropertyById(id), {
    method: "GET",
    token,
  });
};

export const updatePropertyById = async (id, data, token) => {
  return client(endpoints.updatePropertyById(id), {
    method: "PUT",
    body: data,
    token,
  });
};

export const fetchMyProperties = async (token) => {
  return client(endpoints.getMyProperties, {
    method: "GET",
    token,
  });
};

export const deletePropertyById = async (id, token) => {
  return client(endpoints.deletePropertyById(id), {
    method: "DELETE",
    token,
  });
};
