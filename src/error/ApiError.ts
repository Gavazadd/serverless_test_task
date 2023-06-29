interface IApiError {
    status: number;
    success: boolean;
    message: string;
}

class ApiError extends Error implements IApiError {
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.success = false;
        this.message = message
    }
    message: string
    status: number;
    success: boolean;
}

export { ApiError, IApiError };