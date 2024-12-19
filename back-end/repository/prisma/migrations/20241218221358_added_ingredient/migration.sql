-- CreateTable
CREATE TABLE "Ingredient" (
    "ingredientId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "caloriesPerUnit" DOUBLE PRECISION NOT NULL,
    "fatPerUnit" DOUBLE PRECISION NOT NULL,
    "carbsPerUnit" DOUBLE PRECISION NOT NULL,
    "proteinPerUnit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("ingredientId")
);
