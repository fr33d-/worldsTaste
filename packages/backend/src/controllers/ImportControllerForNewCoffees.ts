import { isArray } from "class-validator";
import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import { CoffeeDto } from "../models/dtos/CoffeeDto";
import { CoffeeBrewingEntity } from "../models/entities/CoffeeBrewingEntity";
import { CoffeeEntity } from "../models/entities/CoffeeEntity";
import { ImagesEntity } from "../models/entities/ImageEntry";
import { RoasterEntity } from "../models/entities/RoasterEntity";
import { CheckBasicCoffee } from "../utils/importHelpers";

type CreateCoffeeRequestBody = Omit<CoffeeDto, "id">;
type ImportResult = { name: string; success: boolean; message: string; explenation?: string };

export const importNewCoffees: RequestHandler = async (req, res) => {
    console.log(`Import new coffees `);

    const importResults: ImportResult[] = [];
    const storeResults: ImportResult[] = [];
    const imageResults: ImportResult[] = [];
    const extractionResults: ImportResult[] = [];
    const failedResults: any[] = [];

    // const createdImages: ImagesEntity[] = [];
    // const createdRoasterImages: ImagesEntity[] = [];
    // const createdExtractions: CoffeeBrewingEntity[] = [];
    // let createdRoaster: RoasterEntity;

    try {
        if (!req.files) {
            return res.status(400).send({ message: "No file uploaded." });
        }

        const file = req.files.data;
        const buf = (file as UploadedFile).data;
        const utf8Data = buf.toString("utf8");
        const json = JSON.parse(utf8Data);

        if (!Array.isArray(json)) {
            return res.status(400).send({ message: "Ungültiges Datenformat." });
        }

        // Saving coffees
        for (const coffeeData of json) {
            const createdImages: ImagesEntity[] = [];
            const createdRoasterImages: ImagesEntity[] = [];
            const createdExtractions: CoffeeBrewingEntity[] = [];
            let createdRoaster: RoasterEntity;

            //  Validierungen
            if (!CheckBasicCoffee(coffeeData)) {
                importResults.push({
                    name: coffeeData.name,
                    success: false,
                    message: "Ungültige Daten. Einige Daten fehlen oder sind im falschen Format.",
                });
                failedResults.push(coffeeData);
                continue;
            }

            //Check if entry had been imported bevore
            const entryInDB = await CoffeeEntity.findOne({ where: { name: coffeeData.name } });
            if (entryInDB) {
                importResults.push({
                    name: coffeeData.name,
                    success: false,
                    message: "Kaffee bereits vorhanden.",
                });
                continue;
            }

            // Creating roaster if needed
            try {
                const storeInDB = await RoasterEntity.findOne({ where: { name: coffeeData.roaster.name } });
                if (!storeInDB) {
                    try {
                        if (isArray(coffeeData.roaster?.images)) {
                            for (const image of coffeeData.roaster.images) {
                                try {
                                    const entity = ImagesEntity.create(image);
                                    imageResults.push({
                                        name: image.name,
                                        success: true,
                                        message: "Store Image created",
                                    });
                                    await ImagesEntity.save(entity);
                                    createdRoasterImages.push(entity);
                                } catch (imageError) {
                                    imageResults.push({
                                        name: `${coffeeData.roaster.name}-${image.name}`,
                                        success: false,
                                        message: `Store Image creation failed, ${imageError}`,
                                    });
                                }
                            }
                        }
                        const entity = RoasterEntity.create({ ...coffeeData.roaster, images: createdRoasterImages });
                        storeResults.push({
                            name: coffeeData.roaster.name,
                            success: true,
                            message: "Store created",
                        });
                        await RoasterEntity.save(entity);
                        createdRoaster = entity;
                    } catch (createError) {
                        storeResults.push({
                            name: coffeeData.roaster.name,
                            success: false,
                            message: `Store creation failed, ${createError}`,
                        });
                    }
                } else {
                    createdRoaster = storeInDB;
                    imageResults.push({
                        name: coffeeData.roaster.name,
                        success: true,
                        message: "Store linked",
                    });
                }
            } catch (error) {
                importResults.push({
                    name: coffeeData.name,
                    success: false,
                    message: `Store import failed: ${error} `,
                });
                continue;
            }

            //Create images
            for (const image of coffeeData.images) {
                if (image) {
                    try {
                        const imageInDB = await ImagesEntity.findOne({ where: { id: image.id } });
                        if (!imageInDB) {
                            try {
                                const entity = ImagesEntity.create(image);
                                imageResults.push({
                                    name: image.name,
                                    success: true,
                                    message: "Image created",
                                });
                                await ImagesEntity.save(entity);
                                createdImages.push(entity);
                            } catch (imageError) {
                                imageResults.push({
                                    name: image.name,
                                    success: false,
                                    message: `Image creation failed, ${imageError}`,
                                });
                            }
                        } else {
                            createdImages.push(imageInDB);
                            imageResults.push({
                                name: image.name,
                                success: true,
                                message: "Image linked",
                            });
                        }
                    } catch (error) {
                        importResults.push({
                            name: coffeeData.name,
                            success: false,
                            message: `Image creation failed: ${error} `,
                        });
                        continue;
                    }
                }
            }

            // Create extractions
            for (const brewing of coffeeData.brewings) {
                try {
                    const brewubgInDB = await CoffeeBrewingEntity.findOne({ where: { id: brewing.id } });
                    if (!brewubgInDB) {
                        try {
                            const entity = CoffeeBrewingEntity.create(brewing);
                            extractionResults.push({
                                name: brewing.method,
                                success: true,
                                message: "brewing created",
                            });
                            // console.log("Extraction created", entity);
                            await CoffeeBrewingEntity.save(entity);
                            createdExtractions.push(entity);
                        } catch (imageError) {
                            extractionResults.push({
                                name: brewing.method,
                                success: false,
                                message: `brewing creation failed, ${imageError}`,
                            });
                        }
                    }
                } catch (error) {
                    importResults.push({
                        name: coffeeData.name,
                        success: false,
                        message: `Image import failed: ${error} `,
                    });
                    continue;
                }
            }

            // finaly save coffee
            try {
                const entity = CoffeeEntity.create({
                    ...coffeeData,
                    brewings: createdExtractions,
                    images: createdImages,
                    roaster: createdRoaster,
                    id: undefined,
                    store: undefined,
                    armoma: coffeeData.aroma,
                    fragrance: coffeeData.aroma,
                });

                await CoffeeEntity.save(entity);

                console.log("final coffee", entity);
                // console.log("final images", createdImages);
                console.log("final brewings", createdExtractions);
                console.log("final roaster", createdRoaster);

                importResults.push({
                    name: coffeeData.name,
                    success: true,
                    message: "Kaffee erfolgreich importiert.",
                });
            } catch (error) {
                importResults.push({
                    name: coffeeData.name,
                    success: false,
                    message: `Fehler beim Speichern: ${error.message}`,
                });
                failedResults.push(coffeeData);
            }
        }

        res.status(200).send({ importResults, storeResults, extractionResults, imageResults, failedResults });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Fehler beim Import ." });
    }
};
