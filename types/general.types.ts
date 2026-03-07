export interface ApiErrorResponse {
  status: number;
  message: string;
  payload: { property: string; message: string }[];
}
