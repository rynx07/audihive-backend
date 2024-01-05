import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function userSeed(){
    const password = "1234";


try {
    const userData = [];
    
    for (const user of userData) {
        await prisma.users.create({
            data: user,
        });
    }
    console.log("User Seed test");
} catch (err) {
    console.log("error in user seed file", err)
} finally {
    await prisma.$disconnect();
}
}

export default userSeed();