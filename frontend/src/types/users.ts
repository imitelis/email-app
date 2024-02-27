export type User = {
  email: string;
  password: string;
};

export type NewUser = User & {
  name: string;
  cellphone: string;
};

export type UserBasicInfo = {
  id: string;
  name: string;
  email: string;
};

export type UserProfileData = {
  name: string;
  email: string;
};
