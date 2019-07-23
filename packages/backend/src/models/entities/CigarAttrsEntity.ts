import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CigarAnschnittEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}

@Entity()
export class CigarAromaradEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}

@Entity()
export class CigarDeckblattEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}

@Entity()
export class CigarEinlageEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}

@Entity()
export class CigarOriginEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}

@Entity()
export class CigarProducerEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}

@Entity()
export class CigarUmblattEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;
}
