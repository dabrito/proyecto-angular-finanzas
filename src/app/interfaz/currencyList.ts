export interface ListResponse {
  success: boolean;
  terms: string;
  privacy: string;
  currencies: {
    [key: string]: string;
  };
}