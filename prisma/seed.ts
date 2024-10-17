import { hoursRate, PrismaClient, SalaryRate } from "@prisma/client";

const prisma = new PrismaClient();

async function filters() {
  const category_field = await prisma.category.create({
    data: {
      label: "Field"
    }
  });

  await prisma.filterOption.createMany({
    data: [
      { label: "Law", value: false, categoryId: category_field.id },
      { label: "Government", value: false, categoryId: category_field.id },
      { label: "IT", value: false, categoryId: category_field.id },
      { label: "Business", value: false, categoryId: category_field.id },
      { label: "Marketing", value: false, categoryId: category_field.id },
      { label: "Design", value: false, categoryId: category_field.id },
      { label: "Medical", value: false, categoryId: category_field.id },
      { label: "Finance", value: false, categoryId: category_field.id },
      { label: "Education", value: false, categoryId: category_field.id },
      { label: "Engineering", value: false, categoryId: category_field.id },
      { label: "Logistics", value: false, categoryId: category_field.id },
      { label: "Contractor", value: false, categoryId: category_field.id },
      { label: "NGO", value: false, categoryId: category_field.id },
      { label: "Culture", value: false, categoryId: category_field.id },
      { label: "Ecology", value: false, categoryId: category_field.id },
      { label: "Other_Field", value: false, categoryId: category_field.id }
    ]
  });

  const categty_city = await prisma.category.create({
    data: {
      label: "City"
    }
  });

  await prisma.filterOption.createMany({
    data: [
      { label: "Sofia", value: false, categoryId: categty_city.id },
      { label: "Plodiv", value: false, categoryId: categty_city.id },
      { label: "Varna", value: false, categoryId: categty_city.id },
      { label: "Burgas", value: false, categoryId: categty_city.id },
      { label: "Other_City", value: false, categoryId: categty_city.id }
    ]
  });

  const category_internship_type = await prisma.category.create({
    data: {
      label: "internship_type"
    }
  });

  await prisma.filterOption.createMany({
    data: [
      { label: "Year_Intern", value: false, categoryId: category_internship_type.id },
      { label: "Month_Intern", value: false, categoryId: category_internship_type.id },
      { label: "Summer_Intern", value: false, categoryId: category_internship_type.id },
      { label: "Remote_Intern", value: false, categoryId: category_internship_type.id },
      { label: "Abroad_Intern", value: false, categoryId: category_internship_type.id },
      { label: "Other_Intern", value: false, categoryId: category_internship_type.id }
    ]
  });

  const category_salary_rate = await prisma.category.create({
    data: {
      label: "salary_rate"
    }
  });

  await prisma.filterOption.createMany({
    data: [
      { label: "Paid", value: false, categoryId: category_salary_rate.id },
      { label: "Unpaid", value: false, categoryId: category_salary_rate.id }
    ]
  });

  const category_hours_rate = await prisma.category.create({
    data: {
      label: "internship_hours"
    }
  });

  await prisma.filterOption.createMany({
    data: [
      { label: "1-3", value: false, categoryId: category_hours_rate.id },
      { label: "3-6", value: false, categoryId: category_hours_rate.id },
      { label: "6-8", value: false, categoryId: category_hours_rate.id }
    ]
  });

  const category_language = await prisma.category.create({
    data: {
      label: "language"
    }
  });

  await prisma.filterOption.createMany({
    data: [
      { label: "Bulgarian", value: false, categoryId: category_language.id },
      { label: "English", value: false, categoryId: category_language.id },
      { label: "German", value: false, categoryId: category_language.id },
      { label: "French", value: false, categoryId: category_language.id },
      { label: "Spanish", value: false, categoryId: category_language.id },
      { label: "Russian", value: false, categoryId: category_language.id },
      { label: "Other_Language", value: false, categoryId: category_language.id }
    ]
  });

  await prisma.section.createMany({
    data: [{ label: "personal_info" }, { label: "saved_offers" }, { label: "settings" }]
  });

  await prisma.employerSection.createMany({
    data: [{ label: "company_info" }, { label: "settings" }]
  });

  await prisma.skill.createMany({
    data: [
      { label: "Java" },
      { label: "Adobe Photoshop" },
      { label: "SCRUM" },
      { label: "English" },
      { label: "Customer Service" }
    ]
  });
}

async function addDummyCompaniesAndInternships() {
  const company1 = await prisma.company.create({
    data: {
      name: "BoxNow",
      slug: "boxnow-1",
      email: "boxnow@gmail.com",
      emailVerified: true,
      phone: "0888888888",
      password: "123456",
      industry: "Logistics",
      description: "BoxNow description",
      preferences: {
        create: {
          newCandidates: true,
          payslips: true,
          marketing: true
        }
      }
    }
  });

  const company2 = await prisma.company.create({
    data: {
      name: "Vivacom",
      slug: "vivacom-2",
      email: "vivacom@gmail.com",
      emailVerified: true,
      phone: "0888888887",
      password: "123456",
      industry: "Telecommunications",
      description: "Vivacom description",
      preferences: {
        create: {
          newCandidates: true,
          payslips: true,
          marketing: true
        }
      }
    }
  });

  const company3 = await prisma.company.create({
    data: {
      name: "Telerik Academy",
      slug: "telerik-academy-3",
      email: "telerik@gmail.com",
      emailVerified: true,
      phone: "0888888886",
      password: "123456",
      industry: "Education",
      description: "Telerik description",
      preferences: {
        create: {
          newCandidates: true,
          payslips: true,
          marketing: true
        }
      }
    }
  });

  await prisma.internship.create({
    data: {
      title: "Factory Worker (8 hours)",
      slug: "factory-worker-8-hours-1",
      description: `<h2>Заглавие на първата секция</h2>
                    <br>
                    <p>Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове. Ще е добре да сложим някакви лимитации на дължината, но като цяло можем да го оставим на другарките от човешкио ресурси да си структурират обявите.</p>
                    <br>
                    <p>Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове. Ще е добре да сложим някакви лимитации на дължината, но като цяло можем да го оставим на другарките от човешкио ресурси да си структурират обявите. Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове.</p>
                    <br>
                    <ul>
                      <li>това е точка от лист</li>
                      <li>това е втора такава</li>
                      <li>това е трета</li>
                      <li>и четвърта</li>
                    </ul>`,
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
      description: `<h2>Заглавие на първата секция</h2>
                    <br>
                    <p>Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове. Ще е добре да сложим някакви лимитации на дължината, но като цяло можем да го оставим на другарките от човешкио ресурси да си структурират обявите.</p>
                    <br>
                    <p>Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове. Ще е добре да сложим някакви лимитации на дължината, но като цяло можем да го оставим на другарките от човешкио ресурси да си структурират обявите. Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове.</p>
                    <br>
                    <ul>
                      <li>това е точка от лист</li>
                      <li>това е втора такава</li>
                      <li>това е трета</li>
                      <li>и четвърта</li>
                    </ul>`,
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
      description: `<h2>Заглавие на първата секция</h2>
                    <br>
                    <p>Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове. Ще е добре да сложим някакви лимитации на дължината, но като цяло можем да го оставим на другарките от човешкио ресурси да си структурират обявите.</p>
                    <br>
                    <p>Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове. Ще е добре да сложим някакви лимитации на дължината, но като цяло можем да го оставим на другарките от човешкио ресурси да си структурират обявите. Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове.</p>
                    <br>
                    <ul>
                      <li>това е точка от лист</li>
                      <li>това е втора такава</li>
                      <li>това е трета</li>
                      <li>и четвърта</li>
                    </ul>`,
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

  await prisma.internship.create({
    data: {
      title: "Marketing Intern (Remote)",
      slug: "marketing-intern-remote-4",
      description: `<h2>Заглавие на първата секция</h2>
                    <br>
                    <p>Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове. Ще е добре да сложим някакви лимитации на дължината, но като цяло можем да го оставим на другарките от човешкио ресурси да си структурират обявите.</p>
                    <br>
                    <p>Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове. Ще е добре да сложим някакви лимитации на дължината, но като цяло можем да го оставим на другарките от човешкио ресурси да си структурират обявите. Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове.</p>
                    <br>
                    <ul>
                      <li>това е точка от лист</li>
                      <li>това е втора такава</li>
                      <li>това е трета</li>
                      <li>и четвърта</li>
                    </ul>`,
      location: "Remote",
      duration: 2,
      salary: 500,
      salaryRate: SalaryRate.MONTHLY,
      hours: 6,
      hoursRate: hoursRate.DAY,
      deadline: new Date(2024, 10, 1),
      companyId: company3.id
    }
  });

  await prisma.internship.create({
    data: {
      title: "Law Intern (Abroad)",
      slug: "law-intern-abroad-5",
      description: `<h2>Заглавие на първата секция</h2>
                    <br>
                    <p>Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове. Ще е добре да сложим някакви лимитации на дължината, но като цяло можем да го оставим на другарките от човешкио ресурси да си структурират обявите.</p>
                    <br>
                    <p>Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове. Ще е добре да сложим някакви лимитации на дължината, но като цяло можем да го оставим на другарките от човешкио ресурси да си структурират обявите. Тази част е практически документ по свободна форма. При създаването на обявата, клиентите ще могат да пишат текст, да го уголемяват и смаляват, да го форматират и да добавят листове.</p>
                    <br>
                    <ul>
                      <li>това е точка от лист</li>
                      <li>това е втора такава</li>
                      <li>това е трета</li>
                      <li>и четвърта</li>
                    </ul>`,
      location: "Abroad",
      duration: 6,
      salary: 1500,
      salaryRate: SalaryRate.MONTHLY,
      hours: 6,
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
      slug: "nikolay-nikolov-1",
      email: "user1@gmail.com",
      emailVerified: false,
      password: "123456",
      phone: "0888888875",
      occupation: "Student",
      linkedinProfile: "https://www.linkedin.com/in/nikolay-nikolov-1a2b3c4d5e6f",
      preferences: {
        create: {
          newPosts: true,
          replies: true,
          marketing: true
        }
      }
    }
  });

  await prisma.user.create({
    data: {
      firstName: "Ivan",
      lastName: "Lozanov",
      slug: "ivan-lozanov-2",
      email: "user2@gmail.com",
      emailVerified: true,
      phone: "0888888876",
      password: "123456",
      occupation: "Student",
      linkedinProfile: "https://www.linkedin.com/in/ivan-lozanov-1a2b3c4d5e6f",
      preferences: {
        create: {
          newPosts: true,
          replies: true,
          marketing: true
        }
      }
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
