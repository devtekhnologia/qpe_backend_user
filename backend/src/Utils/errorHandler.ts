export const errorHandler = (statusCode: number, message: string): Error & { statusCode: number } => {
    const error = new Error(message) as Error & { statusCode: number };
    error.statusCode = statusCode;
    return error;
};
