export declare enum ApiStatus {
    SUCCESS = "success",
    ERROR = "error"
}
export declare class ApiResult<T> {
    status: ApiStatus;
    code: number;
    errorCode: string;
    message: string;
    numberCount: number;
    data: T;
    success(data?: T, message?: string): this;
    setNumberCount(total: number): this;
    setMessage(message: string): this;
    error(message: string, code?: number, errorCode?: string): this;
}
