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

    @ManyToOne(type => CoffeeOriginEntity)
    @JoinColumn({ name: "originId" })
    public originId!: CoffeeOriginEntity;

    @ManyToOne(type => CoffeeKindEntity)
    @JoinColumn({ name: "kindId" })
    public kindId!: CoffeeOriginEntity;

    @ManyToOne(type => CoffeeRoastedEntity)
    @JoinColumn({ name: "roastedId" })
    public roastedId!: CoffeeOriginEntity;
}
