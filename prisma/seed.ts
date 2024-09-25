import { hoursRate, PrismaClient, SalaryRate } from "@prisma/client";

const prisma = new PrismaClient();

async function filters() {
  const category_city = await prisma.category.create({
    data: {
      label: "City"
    }
  });

  await prisma.filterOption.createMany({
    data: [
      { label: "Sofia", value: false, categoryId: category_city.id },
      { label: "Varna", value: false, categoryId: category_city.id },
      { label: "Burgas", value: false, categoryId: category_city.id },
      { label: "Plodiv", value: false, categoryId: category_city.id },
      { label: "Other_City", value: false, categoryId: category_city.id }
    ]
  });

  const category_type = await prisma.category.create({
    data: {
      label: "Type"
    }
  });

  await prisma.filterOption.createMany({
    data: [
      { label: "Internship", value: false, categoryId: category_type.id },
      { label: "Part-Time", value: false, categoryId: category_type.id },
      { label: "Erasm", value: false, categoryId: category_type.id },
      { label: "Study_Abroad", value: false, categoryId: category_type.id },
      { label: "Summer", value: false, categoryId: category_type.id }
    ]
  });

  const category_field = await prisma.category.create({
    data: {
      label: "Field"
    }
  });

  await prisma.filterOption.createMany({
    data: [
      { label: "IT", value: false, categoryId: category_field.id },
      { label: "Business", value: false, categoryId: category_field.id },
      { label: "Marketing", value: false, categoryId: category_field.id },
      { label: "Engineering", value: false, categoryId: category_field.id },
      { label: "Other_Field", value: false, categoryId: category_field.id }
    ]
  });
}

async function addDummyCompaniesAndInternships() {
  const company1 = await prisma.company.create({
    data: {
      name: "BoxNow",
      email: "boxnow@gmail.com",
      emailVerified: true,
      phone: "0888888888",
      password: "123456",
      description: "BoxNow description"
    }
  });

  const company2 = await prisma.company.create({
    data: {
      name: "Vivacom",
      email: "vivacom@gmail.com",
      emailVerified: true,
      phone: "0888888887",
      password: "123456",
      description: "Vivacom description"
    }
  });

  const company3 = await prisma.company.create({
    data: {
      name: "Telerik Academy",
      email: "telerik@gmail.com",
      emailVerified: true,
      phone: "0888888886",
      password: "123456",
      description: "Telerik description"
    }
  });

  await prisma.internship.create({
    data: {
      title: "Factory Worker (8 hours)",
      slug: "factory-worker-8-hours-1",
      description: "Internship1 description",
      location: "Sofia",
      duration: 0,
      salary: 16,
      salaryRate: SalaryRate.HOURLY,
      hours: 8,
      hoursRate: hoursRate.DAY,
      deadline: new Date(2024, 10, 14),
      companyId: company1.id
    }
  });

  await prisma.internship.create({
    data: {
      title: "Customer Support (Summer Internship)",
      slug: "customer-support-summer-internship-2",
      description: "Internship2 description",
      location: "Sofia",
      duration: 3,
      salary: 700,
      salaryRate: SalaryRate.MONTHLY,
      hours: 8,
      hoursRate: hoursRate.DAY,
      deadline: new Date(2025, 4, 1),
      companyId: company2.id
    }
  });

  await prisma.internship.create({
    data: {
      title: "Software Developer (Part-Time)",
      slug: "software-developer-part-time-3",
      description: "Internship3 description",
      location: "Plodiv",
      duration: 6,
      salary: 1200,
      salaryRate: SalaryRate.MONTHLY,
      hours: 4,
      hoursRate: hoursRate.DAY,
      deadline: new Date(2024, 10, 1),
      companyId: company3.id
    }
  });
}

async function addDummyUsers() {
  await prisma.user.create({
    data: {
      firstName: "Nikolay",
      lastName: "Nikolov",
      email: "user1@gmail.com",
      emailVerified: false,
      password: "123456",
      phone: "0888888875",
      occupation: "Student",
      linkedinProfile: "https://www.linkedin.com/in/nikolay-nikolov-1a2b3c4d5e6f"
    }
  });

  await prisma.user.create({
    data: {
      firstName: "Ivan",
      lastName: "Lozanov",
      email: "user2@gmail.com",
      emailVerified: true,
      phone: "0888888876",
      password: "123456",
      occupation: "Student"
    }
  });
}

async function main() {
  console.log("Adding filters...");
  await filters();
  console.log("Filters added!");
  console.log("Adding dummy companies and internships...");
  await addDummyCompaniesAndInternships();
  console.log("Dummy companies and internships added!");
  console.log("Adding dummy users...");
  await addDummyUsers();
  console.log("Dummy users added!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
