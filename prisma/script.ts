import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //post
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "Eduardo",
  //       email: "eduardoprudenciorocha@gmail.com",
  //       password: "123123",
  //     },
  //   });
  //   console.log(user);
  //get
  /*  const users = await prisma.user.findMany();
  console.log(users); */
  //post user with posts
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "Bob",
  //       email: "bob@prisma.io",
  //       password: "123123",
  //       taskGroups: {
  //         create: {
  //           title: "Hello World",
  //           completed: false,
  //           tasks: {
  //             create: [
  //               { title: "Write some software", completed: true },
  //               {
  //                 title: "Deploy software",
  //                 completed: false,
  //                 subtasks: { create: [{ title: "Deploy", completed: true }] },
  //               },
  //             ],
  //           },
  //         },
  //       },
  //     },
  //   });
  //   console.log(user);
  const usersWithPosts = await prisma.user.findMany({
    include: {
      taskGroups: {
        include: {
          tasks: {
            include: {
              subtasks: true,
            },
          },
        },
      },
    },
  });
  console.dir(usersWithPosts, { depth: null });
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
