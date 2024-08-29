import { PrismaClient } from "@prisma/client";

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

async function main() {
  console.log("Adding filters...");
  await filters();
  console.log("Filters added!");
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
