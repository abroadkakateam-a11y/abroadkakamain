type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  refreshToken: string;
};

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
}

export type { UserState, User };
