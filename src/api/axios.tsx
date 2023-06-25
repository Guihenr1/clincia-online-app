import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5005/v1",
});

export async function getRequest(URL: string, headers: any) {
  return await axiosClient.get(`/${URL}`, { headers });
}

export async function postRequest(URL: string, payload: any, headers?: any) {
  return await axiosClient.post(`/${URL}`, payload, { headers });
}

export async function putRequest(URL: string, payload: any, headers: any) {
  return await axiosClient.put(`/${URL}`, payload, { headers });
}

export async function deleteRequest(URL: string, headers: any) {
  return await axiosClient.delete(`/${URL}`, { headers });
}

export async function patchRequest(URL: string, payload: any, headers: any) {
  return await axiosClient.patch(`/${URL}`, payload, { headers });
}
