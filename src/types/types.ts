/* Define what is a Player */
export interface Player {
  id: string;
  name: string;
};

/* Define what is a New Player */
export interface NewPlayer {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export interface UserResponse {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  number: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: UserResponse;
}

export interface CreateAccResponse {
  message: string;
  data: UserResponse;
}