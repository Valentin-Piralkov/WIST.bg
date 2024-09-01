import { Internship } from "./JobTypes";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  occupation?: string;
  linkedin?: string;
};

export type Company = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  description?: string;
  logo?: string;
  website?: string;
  internships?: Internship[];
};
