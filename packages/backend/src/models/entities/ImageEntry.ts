import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogPostEntity } from "./BlogPostEntity";
import { CoffeeBrewingEntity } from "./CoffeeBrewingEntity";
import { CoffeeEntity } from "./CoffeeEntity";
import { RoasterEntity } from "./RoasterEntity";

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

    @ManyToOne((type) => CoffeeEntity, (coffee) => coffee.images, {
        onDelete: "CASCADE",
    })
    public coffee: CoffeeEntity;

    @ManyToOne((type) => CoffeeBrewingEntity, (extraction) => extraction.image, {
        onDelete: "CASCADE",
    })
    public extraction: CoffeeBrewingEntity;

    @ManyToOne((type) => RoasterEntity, (extraction) => extraction.images, {
        onDelete: "CASCADE",
    })
    public store: RoasterEntity;

    @ManyToOne((type) => BlogPostEntity, (post) => post.images, {
        onDelete: "CASCADE",
    })
    public post: BlogPostEntity;
}
