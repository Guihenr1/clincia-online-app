import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5005/v1",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2ODY3MDg0ODgsImV4cCI6MTY4NjcyNjQ4OCwiaWF0IjoxNjg2NzA4NDg4fQ.LC_Bi1hODofB3cOs9qbQdN4q9T7JLOKz9m6iUCsw97I",
  },
});

export async function getRequest(URL: string) {
  return await axiosClient.get(`/${URL}`);
}

export async function postRequest(URL: string, payload: any) {
  return await axiosClient.post(`/${URL}`, payload);
}

export async function putRequest(URL: string, payload: any) {
  return await axiosClient.put(`/${URL}`, payload);
}

export async function deleteRequest(URL: string) {
  return await axiosClient.delete(`/${URL}`);
}
