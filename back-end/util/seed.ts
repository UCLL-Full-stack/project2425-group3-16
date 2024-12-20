//Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';


const prisma = new PrismaClient();

const main = async () => {
    await prisma.appliance.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.recipeIngredient.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.user.deleteMany();

    const airFryer = await prisma.appliance.create({
        data: {
            name: 'Air Fryer',
            description: 'A kitchen appliance that cooks by circulating hot air around the food.',
            createdAt: new Date()
        }
    });

    const cookingPan = await prisma.appliance.create({
        data: {
            name: 'Cooking Pan',
            description: 'A versatile stove top cooking tool.',
            createdAt: new Date()
        }
    });

    const oven = await prisma.appliance.create({
        data: {
            name: 'Oven',
            description: 'An enclosed compartment for heating, baking, or drying.',
            createdAt: new Date()
        }
    });

    const microwave = await prisma.appliance.create({
        data: {
            name: 'Microwave',
            description: 'A kitchen appliance that cooks food by exposing it to electromagnetic radiation.',
            createdAt: new Date()
        }
    });

    const vegan = await prisma.tag.create({
        data: {
            name: 'Vegan',
            description: 'A diet that excludes animal products.',
        }
    });

    const vegetarian = await prisma.tag.create({
        data: {
            name: 'Vegetarian',
            description: 'A diet that excludes meat.',
        }
    });

    const pasta = await prisma.tag.create({
        data: {
            name: 'Pasta',
            description: 'A type of noodle dish.',
        }
    });

    const italian = await prisma.tag.create({
        data: {
            name: 'Italian',
            description: 'A type of cuisine.',
        }
    });

    const egg = await prisma.ingredient.create({
        data: {
            name: 'Egg',
            description: 'A food product.',
            caloriesPerUnit: 70,
            fatPerUnit: 5,
            carbsPerUnit: 0,
            proteinPerUnit: 6
        }
    })

    const flour = await prisma.ingredient.create({
        data: {
            name: 'Flour',
            description: 'A food product.',
            caloriesPerUnit: 455,
            fatPerUnit: 1,
            carbsPerUnit: 95,
            proteinPerUnit: 13
        }
    })

    const sugar = await prisma.ingredient.create({
        data: {
            name: 'Sugar',
            description: 'A food product.',
            caloriesPerUnit: 387,
            fatPerUnit: 0,
            carbsPerUnit: 100,
            proteinPerUnit: 0
        }
    })

    const milk = await prisma.ingredient.create({
        data: {
            name: 'Milk',
            description: 'A food product.',
            caloriesPerUnit: 42,
            fatPerUnit: 1,
            carbsPerUnit: 5,
            proteinPerUnit: 3
        }
    })

    const eggsForPancakes = await prisma.recipeIngredient.create({
        data: {
            unit: 'unit',
            quantity: 10,
            ingredientId: egg.ingredientId
        }
    });

    const flowerForPancakes = await prisma.recipeIngredient.create({
        data: {
            unit: 'g',
            quantity: 350,
            ingredientId: flour.ingredientId
        }
    })

    const sugarForPancakes = await prisma.recipeIngredient.create({
        data: {
            unit: 'g',
            quantity: 50,
            ingredientId: sugar.ingredientId
        }
    });

    const milkForPancakes = await prisma.recipeIngredient.create({
        data: {
            unit: 'ml',
            quantity: 500,
            ingredientId: milk.ingredientId
        }
    });

    enum Role {
        Admin = 'admin',
        Chef = 'chef',
        User = 'user'
    }

    const user = await prisma.user.create({
        data: {
            username: 'User',
            firstName: 'User',
            lastName: 'User',
            email: 'user@example.com',
            password: await bcrypt.hash('user', 10),
            role: Role.User
        }
    });

    const chef = await prisma.user.create({
        data: {
            username: 'Chef',
            firstName: 'Chef',
            lastName: 'Chef',
            email: 'chef@example.com',
            password: await bcrypt.hash('chef', 10),
            role: Role.Chef
        }
    });

    const admin = await prisma.user.create({
        data: {
            username: 'Admin',
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@exmaple.com',
            password: await bcrypt.hash('admin', 10),
            role: Role.Admin
        }
    });









};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();


