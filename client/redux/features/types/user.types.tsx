export interface UserStateType {
  user: null | {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
  token: null | string;
  isFormData: boolean;
}
