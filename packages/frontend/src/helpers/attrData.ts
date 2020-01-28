export type LocalAttrData = {
    brewMethods: string[],
    kinds: string[],
    origins: string[],
    processes: string[],
    specieses: string[],
};

export const localCoffeeAttrData: LocalAttrData = {
    brewMethods: ['AeroPess', 'Chemex', 'Kalita'],
    kinds: ['Filterkaffee', 'Espresso'],
    origins: ['Indonesien', 'Brasilien', 'Äthiopien'],
    processes: ['Washed', 'Semiwashed', 'Dry'],
    specieses: ['Arabica', 'Robusta']
}
