import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import { CoffeeDto } from "../models/dtos/CoffeeDto";
import { CoffeeEntity } from "../models/entities/CoffeeEntity";
import { RoasterEntity } from "../models/entities/RoasterEntity";
import { CheckBasicCoffee, tagArrayToStrings } from "../utils/importHelpers";

type CreateCoffeeRequestBody = Omit<CoffeeDto, "id">;
type ImportResult = { coffee: string; success: boolean; message: string; explenation?: string };
type StoreImport = { id: number; name: string };

export const importOldCoffees: RequestHandler = async (req, res) => {
    console.log(`Import coffees `);

    const importResults: ImportResult[] = [];
    const failedResults: any[] = [];

    try {
        if (!req.files) {
            return res.status(400).send({ message: "Kein Datei wurde hochgeladen." });
        }

        const file = req.files.data;
        const buf = (file as UploadedFile).data;
        const utf8Data = buf.toString("utf8");
        const json = JSON.parse(utf8Data);

        if (!Array.isArray(json)) {
            return res.status(400).send({ message: "Ungültiges Datenformat. Erwartetes Array von Benutzern." });
        }

        // Saving coffees
        for (const coffeeData of json) {
            //  Validierungen
            if (!CheckBasicCoffee(coffeeData)) {
                importResults.push({
                    coffee: coffeeData.name,
                    success: false,
                    message: "Ungültige Daten. Name, Email oder Balance fehlen oder sind im falschen Format.",
                });
                failedResults.push(coffeeData);
                continue;
            }

            const entryInDB = await CoffeeEntity.findOne({ where: { name: coffeeData.name } });
            if (entryInDB) {
                importResults.push({
                    coffee: coffeeData.name,
                    success: false,
                    message: "Kaffee bereits vorhanden.",
                });
                continue;
            }

            const store = coffeeData.store;

            try {
                const storeInDB = await RoasterEntity.findOne({ where: { name: coffeeData.store.name } });
                if (!storeInDB) {
                    console.log("storeInDB tried to save", storeInDB, "for", coffeeData.store.name);
                    const entity = RoasterEntity.create({
                        name: store.name,
                        id: undefined,
                        city: "",
                        country: "",
                        description: "",
                        link: "",
                        rating: 0,
                        visited: coffeeData.dateAdded,
                    });
                    await RoasterEntity.save(entity);
                }
            } catch (error) {
                importResults.push({
                    coffee: coffeeData.name,
                    success: false,
                    message: `Store import failed: ${error} `,
                });
                failedResults.push(coffeeData);
                continue;
            }

            const existingCoffee = await CoffeeEntity.findOne({ where: { name: coffeeData.name } });

            if (existingCoffee) {
                importResults.push({
                    coffee: coffeeData.name,
                    success: false,
                    message: `Coffee already in DB `,
                });
                continue;
            }

            try {
                const storeInDB = await RoasterEntity.findOne({ where: { name: store.name } });
                const entity = CoffeeEntity.create({
                    ...coffeeData,
                    brewings: [],
                    images: [],
                    roaster: storeInDB,
                    id: undefined,
                    store: undefined,
                    armoma: tagArrayToStrings(coffeeData.aroma),
                    fragrance: tagArrayToStrings(coffeeData.aroma),
                });

                await CoffeeEntity.save(entity);

                importResults.push({
                    coffee: coffeeData.name,
                    success: true,
                    message: "Kaffee erfolgreich importiert.",
                });
            } catch (error) {
                importResults.push({
                    coffee: coffeeData.name,
                    success: false,
                    message: `Fehler beim Speichern: ${error.message}`,
                });
                failedResults.push(coffeeData);
            }
        }

        res.status(200).send({ importResults, failedResults: failedResults });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Fehler beim Import ." });
    }
};
