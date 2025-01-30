import { isAxiosError } from "axios";
import api from "../config/axios";
import { ProfileForm, User } from "../types";

export async function getUser() {
    
    try {
        const { data } = await api.get<User>(`user`);
        console.log(data);
        
        return data
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error);
        }
      }
}

export async function updateProfile(formData: ProfileForm) {
    
  try {
      const response = await api.patch<User>(`user`, formData);
      return response
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
}