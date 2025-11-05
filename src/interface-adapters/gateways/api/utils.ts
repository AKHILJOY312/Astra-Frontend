import { AxiosError } from "axios";
import type { AxiosResponse } from "axios";

const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
const BASE_URL_INGRESS = import.meta.env.VITET_PUBLIC_BASE_URL_INGRESS;
const USER_SERVICE_URL = import.meta.env.VITE_PUBLIC_USER_SERVICE_URL;

export class BuildUrl {
  private baseUrl: string;

  constructor() {
    if (!BASE_URL) throw new Error("Missing Base URL");

    const isRunningOnNode = typeof window === "undefined";

    this.baseUrl = isRunningOnNode ? BASE_URL_INGRESS || BASE_URL : BASE_URL;

    return this;
  }

  user(endpoint: string) {
    if (!USER_SERVICE_URL) {
      throw new Error("Missing User Service URL");
    }
    const url = USER_SERVICE_URL;
    return this.baseUrl + url + endpoint;
  }
  //   project(endpoint: string) {
  //     if (!PROJECT_SERVICE_URL) {
  //       throw new Error("Missing Project Service URL");
  //     }
  //     const url = PROJECT_SERVICE_URL;
  //     return this.baseUrl + url + endpoint;
  //   }
  //   team(endpoint: string) {
  //     if (!TEAM_SERVICE_URL) {
  //       throw new Error("Missing Team Service URL");
  //     }
  //     const url = TEAM_SERVICE_URL;
  //     return this.baseUrl + url + endpoint;
  //   }
}

export type IResponse = {
  message: string;
  data?: any;
};

export function adaptSuccessResponse(response: AxiosResponse): IResponse {
  return {
    message: response?.data?.message || "Success",
    data: response?.data?.data,
  };
}
export function adaptErrorResponse(
  error: AxiosError<{ message?: string }>
): string {
  return error?.response?.data?.message || "Error";
}
