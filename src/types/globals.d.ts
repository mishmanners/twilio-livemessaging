// Global type declarations for Node.js modules
declare var require: any;
declare var process: {
  env: { [key: string]: string | undefined };
};

// Type declarations for missing modules
declare module 'clsx' {
  export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];
  export function clsx(...inputs: ClassValue[]): string;
}

declare module 'tailwind-merge' {
  export function twMerge(input: string): string;
}

declare module 'countries-list' {
  export interface ICountry {
    name: string;
    phone: number[];
    continent: string;
    capital: string;
    currency: string;
    languages: string[];
  }
  export const countries: { [key: string]: ICountry };
}

declare module 'google-libphonenumber' {
  export class PhoneNumberUtil {
    static getInstance(): PhoneNumberUtil;
    parseAndKeepRawInput(phone: string): {
      getCountryCode(): number | null;
    };
  }
}

declare module 'twilio' {
  export default function twilio(apiKey: string, apiSecret: string, options?: any): any;
  export function validateRequest(authToken: string, signature: string, url: string, data: any): boolean;
}

declare module 'fs' {
  export function appendFileSync(path: string, data: string): void;
}

declare module 'next/headers' {
  export function headers(): Promise<any>;
}

declare module 'axios' {
  interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
  }
  
  interface AxiosRequestConfig {
    headers?: any;
    auth?: {
      username: string;
      password: string;
    };
  }
  
  const axios: {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  };
  
  export default axios;
}

declare module 'twilio/lib/jwt/AccessToken' {
  export default class AccessToken {
    constructor(accountSid: string, apiKey: string, apiSecret: string, options?: any);
    addGrant(grant: any): void;
    toJwt(): string;
  }
  
  export class SyncGrant {
    constructor(options?: any);
  }
}

declare module 'twilio/lib/rest/sync/v1/service' {
  export interface ServiceInstance {
    sid: string;
    friendlyName: string;
  }
}

declare module 'throttled-queue' {
  export default function throttledQueue(maxRequests: number, interval: number): (fn: () => void) => void;
}
