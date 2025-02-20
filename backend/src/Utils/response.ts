import { Response } from 'express';

/**
 * Helper function to send standardized responses.
 * 
 * @param res - Express response object
 * @param status - HTTP status code
 * @param message - Message to be sent in the response
 * @param data - Any data to be included in the response (optional)
 * @param error - Any error details to be included in the response (optional)
 */
export const sendResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = null,
  error: any = null
): Response => {
  return res.status(status).json({
    status: status < 400, // Returns `true` for success (status codes < 400) and `false` for errors
    message,
    data,
    error,
  });
};


// export enum ResponseStatus {
//     Success = 'Success',
//     Failed = 'Failed',
//   }
  
// export class ServiceResponse<T = unknown> {
//     data(res: Response<any, Record<string, any>>, status: any, message: string, data: any) {
//       throw new Error('Method not implemented.');
//     }
//     success: boolean;
//     message: string;
//     responseObject: T;
//     statusCode: number;
//     accessToken: string;
  
    
//     constructor(
//       status: ResponseStatus,
//       message: string,
//       responseObject: T,
//       statusCode: number,
//       accessToken: string = ''
//     ) {
//       this.success = status === ResponseStatus.Success;
//       this.message = message;
//       this.responseObject = responseObject;
//       this.statusCode = statusCode;
//       this.accessToken = accessToken;
//     }
  
//     static failed(errorMessage: string): ServiceResponse<null> {
//       return new ServiceResponse(
//         ResponseStatus.Failed,
//         errorMessage,
//         null,
//         500, // Default to INTERNAL_SERVER_ERROR
//         ''
//       );
//     }
//   }
  

  enum ResponseStatus {
    Success = 'success',
    Failed = 'failed',
  }
  
  interface ErrorDetails {
    code: string;
    message: string;
    details?: string;
    traceId?: string;
  }
  export class ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T | null;
    error?: ErrorDetails;
    statusCode: number;
    accessToken: string;
    currentPage?: number; // Optional property for pagination
    limit?: number; // Optional property for pagination
    totalRecords?: number; // Optional property for pagination
  
    constructor(
      success: boolean,
      message: string,
      data: T | null,
      statusCode: number,
      accessToken: string = '',
      error?: ErrorDetails
    ) {
      this.success = success;
      this.message = message;
      this.data = data ?? null;
      this.statusCode = statusCode;
      this.accessToken = accessToken;
      this.error = error;
    }
  
    // Static methods for common cases
    static success<T>(
      message: string,
      data: T | null = null,
      statusCode: number = 200,
      accessToken: string = ''
    ): ApiResponse<T> {
      return new ApiResponse(true, message, data, statusCode, accessToken);
    }
  
    static successWithPagination<T>(
      message: string,
      data: T | null = null,
      currentPage: number,
      totalRecords: number,
      limit:number,
      statusCode: number = 200,
      accessToken: string = ''
    ): ApiResponse<T> {
      const response = new ApiResponse(true, message, data, statusCode, accessToken);
      response.currentPage = currentPage; // Assign currentPage
      response.totalRecords = totalRecords;
      response.limit = limit;
      return response;
    }
  
    static created<T>(message: string, data: T | null = null, accessToken: string = ''): ApiResponse<T> {
      return new ApiResponse(true, message, data, 201, accessToken); // 201 Created
    }
  
    static badRequest(message: string, details?: string, traceId?: string): ApiResponse<null> {
      return new ApiResponse(false, message, null, 400, '', { code: 'BAD_REQUEST', message, details, traceId });
    }
  
    static unauthorized(message: string, statusCode: number = 401, accessToken: string = ''): ApiResponse<null> {
      return new ApiResponse(false, message, null, statusCode, accessToken);
    }
  
    static notFound(message: string, statusCode: number = 404): ApiResponse<null> {
      return new ApiResponse(false, message, null, statusCode, '');
    }
  
    static internalServerError(message: string, details?: string, traceId?: string): ApiResponse<null> {
      return new ApiResponse(false, message, null, 500, '', { code: 'INTERNAL_SERVER_ERROR', message, details, traceId });
    }
  
    static error(message: string, code: string, statusCode: number = 500, details?: string, traceId?: string): ApiResponse<null> {
      const errorDetails: ErrorDetails = { code, message, details, traceId };
      return new ApiResponse(false, message, null, statusCode, '', errorDetails);
    }
  }
  
  // For API Responses where you expect a response object, especially for complex use cases
  export class ServiceResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T | null;
    error?: ErrorDetails;
    statusCode: number;
    accessToken: string;
  
    constructor(
      status: ResponseStatus,
      message: string,
      data: T | null,
      statusCode: number,
      accessToken: string = '',
      error?: ErrorDetails
    ) {
      this.success = status === ResponseStatus.Success;
      this.message = message;
      this.data = data;
      this.statusCode = statusCode;
      this.accessToken = accessToken;
      this.error = error;
    }
  
    // Static methods for success and failure cases
    static success<T>(message: string, data: T | null = null, statusCode: number = 200, accessToken: string = ''): ServiceResponse<T> {
      return new ServiceResponse(ResponseStatus.Success, message, data, statusCode, accessToken);
    }
  
    static created<T>(message: string, data: T | null = null, accessToken: string = ''): ServiceResponse<T> {
      return new ServiceResponse(ResponseStatus.Success, message, data, 201, accessToken); // 201 Created
    }
  
    static badRequest(message: string, details?: string, traceId?: string): ServiceResponse<null> {
      return new ServiceResponse(ResponseStatus.Failed, message, null, 400, '', { code: 'BAD_REQUEST', message, details, traceId });
    }
  
    static unauthorized(message: string, statusCode: number = 401, accessToken: string = ''): ServiceResponse<null> {
      return new ServiceResponse(ResponseStatus.Failed, message, null, statusCode, accessToken);
    }
  
    static notFound(message: string, statusCode: number = 404): ServiceResponse<null> {
      return new ServiceResponse(ResponseStatus.Failed, message, null, statusCode, '');
    }
  
    static internalServerError(message: string, details?: string, traceId?: string): ServiceResponse<null> {
      return new ServiceResponse(ResponseStatus.Failed, message, null, 500, '', { code: 'INTERNAL_SERVER_ERROR', message, details, traceId });
    }
  
    static error(message: string, code: string, statusCode: number = 500, details?: string, traceId?: string): ServiceResponse<null> {
      const errorDetails: ErrorDetails = { code, message, details, traceId };
      return new ServiceResponse(ResponseStatus.Failed, message, null, statusCode, '', errorDetails);
    } 
  }
  
  