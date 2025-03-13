
import { ServiceResponse } from "../utils/response";

export const handleServiceErrors = (serviceFunction: Function) => {
    return async (...args: any[]): Promise<ServiceResponse> => {
      try {
        return await serviceFunction(...args);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred.';
        return ServiceResponse.internalServerError(errorMessage);
      }
    };
  };
  