import { hoursRate, SalaryRate, Type } from "@prisma/client";

export type Internship = {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  duration: number;
  salary: number;
  salaryRate: SalaryRate;
  hours: number;
  hoursRate: hoursRate;
  deadline: string;
  type: Type;
  companyId: number;
};
