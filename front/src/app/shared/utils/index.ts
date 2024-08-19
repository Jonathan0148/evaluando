export interface IResponse {
    message?: string;
    statusCode?: number;
    error?: string;
}
export interface IPaginationResponse<T> extends IPageResponse {
    data: T;
    meta: IPageResponse;
}
export interface IPageResponse {
    page: number;
    take: number;
    itemCount: number;
    pageCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    first: number;
}
export interface IParamsIndex {
    page?: number;
    term?: string;
    take?: number;
}
export interface IFileResponse {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}
