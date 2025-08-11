export interface User {
  name?: {
    title?: string;
    first: string;
    last: string;
  };
  email?: string;
  location?: {
    city?: string;
    state?: string;
  };
  picture?: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  gender?: string;
  phone?: string;
  cell?: string;
  dob?: {
    date?: string;
    age?: number;
  };
  nat?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
