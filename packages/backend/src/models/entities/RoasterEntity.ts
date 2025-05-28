import { BaseEntity, Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ImagesEntity } from "./ImageEntry";

// Todo: erweitern um alle felder eines Stores
@Entity()
export class RoasterEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;

    @Column()
    public country!: string;

    @Column()
    public city!: string;

    @Column()
    public link!: string;

    @Column()
    public visited!: Date;

    @Column()
    public description!: string;

    @Column()
    public rating!: number;

    // @ManyToOne((type) => UserEntity, (user) => user.id)
    // @JoinColumn({ name: "owner" })
    // public owner!: UserEntity;

    @OneToMany((type) => ImagesEntity, (image) => image.store)
    @JoinColumn({ name: "images" })
    public images!: ImagesEntity[];
}
