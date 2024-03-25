export type TokenData = {
    userId: number;       //guarda id
    roleName: string;     //guarda rol
    name: string;
  };
  
  declare global {
    // Express
    namespace Express {
      export interface Request {
        tokenData: TokenData;
      }
    }
  }