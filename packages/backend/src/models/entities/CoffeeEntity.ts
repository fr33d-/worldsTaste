import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CoffeeOriginEntity, CoffeeKindEntity, CoffeeRoastedEntity } from "./CoffeeAttrsEntity";

@Entity()
export class CoffeeEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;

    // @Column()
    // public images!: Image[];

    @Column()
    public description!: string;

    @Column()
    public rating!: number;

    // @Column()
    // public origin!: string;

    // @Column()
    // public kind!: string;

    // @Column()
    // public roasted!: string;

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
