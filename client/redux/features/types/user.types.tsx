export interface UserStateType {
  user: null | {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
  isFormData: boolean;
}
