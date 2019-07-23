import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CoffeeOriginEntity, CoffeeKindEntity, CoffeeRoastedEntity } from "./CoffeeAttrsEntity";

export type Image = {
    name: string;
    url?: string;
    alt?: string;
    file?: File;
};

@Entity()
export class CoffeeEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    // @Column({array: true})
    // public images!: Image[];
    // @Column()
    // public images!: string;

    @Column()
    public description!: string;

    @Column()
    public rating!: number;

    @Column()
    public taste!: number;

    @Column()
    public tasteKind!: number;

    @Column()
    public woody!: number;

    @Column()
    public bitter!: number;

    @Column()
    public sour!: number;

    @Column()
    public ownDescription!: string;

    @ManyToOne(type => CoffeeOriginEntity, coffeeOrigin => coffeeOrigin.id)
    @JoinColumn({ name: "origin" })
    public origin!: CoffeeOriginEntity;

    @ManyToOne(type => CoffeeKindEntity, coffeeKind => coffeeKind.id)
    @JoinColumn({ name: "kind" })
    public kind!: CoffeeOriginEntity;

    @ManyToOne(type => CoffeeRoastedEntity, coffeeRoasted => coffeeRoasted.id)
    @JoinColumn({ name: "roasted" })
    public roasted!: CoffeeOriginEntity;
}
