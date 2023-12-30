declare global {
    namespace Express {
        export interface Request {
            userId?: string;
            file?: any; 
        }
    }
}

export {};