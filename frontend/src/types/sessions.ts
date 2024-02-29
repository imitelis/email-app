export type LoginCompose = {
  email: string;
  password: string;
};

export type SignUpCompose = LoginCompose & {
  full_name: string;
  cellphone: string;
};
