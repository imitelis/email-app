export type LoginCompose = {
  email: string;
  password: string;
};

export type SignUpCompose = LoginCompose & {
  full_name: string;
  cellphone: string;
};

export type PasswordCompose = {
  email: string;
  cellphone: string;
  password: string;
  new_password: string;
};
