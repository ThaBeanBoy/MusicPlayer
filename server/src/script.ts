import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Creating new user
  //   const user = await prisma.user.create({
  //     data: {
  //       email: 'n_uzumaki@konoha.vill',
  //       name: 'Naruto',
  //     },
  //   });

  //   console.log(user);

  // getting all the users
  //   const users = await prisma.user.findMany();
  //   console.log(users);

  // inserting sasuke with a post
  //   const sasuke = await prisma.user.create({
  //     data: {
  //       name: 'Sasuke',
  //       email: 's_uchiha@akatsuki.org',

  //       posts: {
  //         create: {
  //           title: 'Hello world',
  //         },
  //       },
  //     },
  //   });

  //   console.log(sasuke);

  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  console.dir(usersWithPosts, { depth: null });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
