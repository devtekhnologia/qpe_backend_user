import { Response } from "express";

type ErrorDetails = any;

export class ServiceResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode: number;
  accessToken?: string;
  error?: ErrorDetails;

  private constructor(
    success: boolean,
    message: string,
    data: T | null,
    statusCode: number,
    accessToken?: string,
    error?: ErrorDetails
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.accessToken = accessToken;
    this.error = error;
  }

  // ✅ Returns an instance of ServiceResponse (no direct res handling)
  private static createResponse<T>(
    success: boolean,
    message: string,
    data: T | null,
    statusCode: number,
    accessToken?: string,
    error?: ErrorDetails
  ): ServiceResponse<T> {
    return new ServiceResponse(success, message, data, statusCode, accessToken, error);
  }

  // ✅ Success response
  static success<T>(message: string, data: T | null = null, statusCode: number = 200, accessToken?: string): ServiceResponse<T> {
    return this.createResponse(true, message, data, statusCode, accessToken);
  }

  // ✅ Created response (201)
  static created<T>(message: string, data: T | null = null, accessToken?: string): ServiceResponse<T> {
    return this.createResponse(true, message, data, 201, accessToken);
  }

  // ❌ Bad Request (400)
  static badRequest(message: string, details?: string, traceId?: string): ServiceResponse<null> {
    return this.createResponse(false, message, null, 400, undefined, {
      code: "BAD_REQUEST",
      message,
      details,
      traceId,
    });
  }

  // ❌ Unauthorized (401)
  static unauthorized(message: string, accessToken?: string): ServiceResponse<null> {
    return this.createResponse(false, message, null, 401, accessToken);
  }

  // ❌ Not Found (404)
  static notFound(message: string): ServiceResponse<null> {
    return this.createResponse(false, message, null, 404);
  }

  // ❌ Internal Server Error (500)
  static internalServerError(message: string, details?: string, traceId?: string): ServiceResponse<null> {
    return this.createResponse(false, message, null, 500, undefined, {
      code: "INTERNAL_SERVER_ERROR",
      message,
      details,
      traceId,
    });
  }

  // ❌ Generic Error Response
  static error(message: string, code: string, statusCode: number = 500, details?: string, traceId?: string): ServiceResponse<null> {
    return this.createResponse(false, message, null, statusCode, undefined, {
      code,
      message,
      details,
      traceId,
    });
  }
}

// Middleware to send ServiceResponse using res
export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).json(serviceResponse);
};