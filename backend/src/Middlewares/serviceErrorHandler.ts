
import { ApiResponse } from "../utils/response";

export const handleServiceErrors = (serviceFunction: Function) => {
    return async (...args: any[]): Promise<ApiResponse> => {
      try {
        return await serviceFunction(...args);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred.';
        return ApiResponse.internalServerError(errorMessage);
      }
    };
  };
  