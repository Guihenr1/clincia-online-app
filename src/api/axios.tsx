import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5005/v1",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2ODYzNjQ2MzUsImV4cCI6MTY4NjM4MjYzNSwiaWF0IjoxNjg2MzY0NjM1fQ.JqdD3Se6ELSmZJohGz6T8oVj-UG57HE3Xf_qYwJQ3vA",
  },
});

export async function getRequest(URL: string) {
  return await axiosClient.get(`/${URL}`);
}

export async function postRequest(URL: string, payload: any) {
  return await axiosClient.post(`/${URL}`, payload);
}

export async function patchRequest(URL: string, payload: any) {
  return await axiosClient.patch(`/${URL}`, payload);
}

export async function deleteRequest(URL: string) {
  return await axiosClient.delete(`/${URL}`);
}
