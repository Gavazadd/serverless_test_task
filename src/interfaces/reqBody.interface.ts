import {Request} from "express";

export interface ReqBodyInterface<T> extends Request {
    body: T
}