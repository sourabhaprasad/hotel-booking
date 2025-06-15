const BASE_URL = "http://localhost:5000/api";

const client = async (
  endpoint,
  { method = "GET", body, params, token: customToken } = {}
) => {
  const token =
    typeof window !== "undefined"
      ? customToken || localStorage.getItem("token")
      : null;

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const isFormData = body instanceof FormData;
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const config = {
    method,
    headers,
    ...(body && { body: isFormData ? body : JSON.stringify(body) }),
  };

  const url = new URL(`${BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, value);
      }
    });
  }

  const res = await fetch(url.toString(), config);
  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) throw new Error(data?.message || "API Error");

  return data;
};

export default client;
