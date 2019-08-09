import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CoffeeOriginEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}

@Entity()
export class CoffeeKindEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}

@Entity()
export class CoffeeRoastedEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}

@Entity()
export class CoffeeProcessEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}

@Entity()
export class CoffeeSpeciesEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}

@Entity()
export class CoffeeMethodEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}
