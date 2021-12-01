import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoffeeEntity } from "./CoffeeEntity";

@Entity()
export class ImagesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public description!: string;

    @Column()
    public alt!: string;

    @Column()
    public file!: string;

    @ManyToOne(
        (type) => CoffeeEntity,
        (coffee) => coffee.images,
        { onDelete: "CASCADE" }
    )
    public coffee!: CoffeeEntity;
}
