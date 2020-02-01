import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// Todo: erweitern um alle felder eines Stores
@Entity()
export class CoffeeStoreEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
    // public kind!: string; (Store, rostary)
    // public city!: string;
    // public link!: string;
    // public mapsLocation!: string;
    // public description!: string;
    // public photos!: string;
    // public rating!: string; oder ein foto
}
