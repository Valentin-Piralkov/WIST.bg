import { hoursRate, SalaryRate, Type } from "@prisma/client";

export type Internship = {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: number;
  salary: number;
  salaryRate: SalaryRate;
  hours: number;
  hoursRate: hoursRate;
  deadline: string;
  type: Type;
  companyId: string;
};
