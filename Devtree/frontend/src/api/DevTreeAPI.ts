import { isAxiosError } from "axios";
import api from "../config/axios";
import { User } from "../types";

export async function getUser() {
    
    try {
        const { data } = await api.get<User>(`user`);
        //console.log(data);
        
        return data
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error);
        }
      }
}

export async function updateProfile(formData: User) {
    
  try {
      const response = await api.patch<string>(`user`, formData);
      return response
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
}

export async function uploadImage(file: File) {

  let formData = new FormData()
  formData.append("file", file)
    
  try {
      const { data } = await api.post(`user/image`, formData);
      return data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
}

export async function getUserByHandle(handle: string) {
    
  try {
      const response = await api.get(`/${handle}`);
      return response
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
}