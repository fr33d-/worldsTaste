import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ImagesEntity } from "./ImageEntry";
import { UserEntity } from "./UserEntity";

@Entity()
export class BlogPostEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public text!: string;

    @Column()
    public created!: Date;

    @ManyToOne((type) => UserEntity, (user) => user.id)
    @JoinColumn({ name: "owner" })
    public owner!: UserEntity;

    @OneToMany((type) => ImagesEntity, (coffeeBrewings) => coffeeBrewings.coffee)
    @JoinColumn({ name: "image" })
    public image!: ImagesEntity;
}
