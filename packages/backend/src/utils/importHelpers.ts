export const CheckBasicCoffee = (coffeeData: any): boolean => {
    const {
        name,
        description,
        rating,
        origin,
        ownDescription,
        buyDate,
        dateAdded,
        roastDate,
        process,
        species,
        roastIntensity,
        body,
        sweetness,
        balance,
        aftertaste,
        acidity,
        tannicAsid,
        bitterness,
        fragrance,
        aroma,
    } = coffeeData;

    if (
        !name ||
        description === undefined ||
        typeof rating !== "number" ||
        !origin ||
        ownDescription === undefined ||
        !buyDate ||
        !dateAdded ||
        !roastDate ||
        !process ||
        !species ||
        typeof roastIntensity !== "number" ||
        typeof body !== "number" ||
        typeof sweetness !== "number" ||
        typeof balance !== "number" ||
        typeof aftertaste !== "number" ||
        typeof acidity !== "number" ||
        typeof tannicAsid !== "number" ||
        typeof bitterness !== "number" ||
        fragrance === undefined ||
        fragrance === undefined
    ) {
        return false;
    }
    return true;
};

export const tagArrayToStrings = (inp: string) => {
    const cleaned = inp.replace(/[{}"]/g, ""); // Remove {, }, and "
    return cleaned.split(","); // Split by comma
};
