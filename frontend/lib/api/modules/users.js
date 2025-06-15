import client from "../client";
import endpoints from "../endpoints/users";

export const signInUser = ({ email, password }) =>
  client(endpoints.signIn, {
    method: "POST",
    body: { email, password },
  });

export const signUpUser = ({ name, email, password, role }) =>
  client(endpoints.signUp, {
    method: "POST",
    body: { name, email, password, role },
  });
