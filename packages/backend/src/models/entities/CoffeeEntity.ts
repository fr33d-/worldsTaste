import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { CoffeeStoreEntity } from './CoffeeStoresEntity';
import { CoffeeBrewingEntity } from './CoffeeBrewingEntity';
import { UserEntity } from './UserEntity';

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

    @Column()
    public dateAdded!: Date;

    @Column()
    public buyDate!: Date;

    @Column()
    public kind!: string;

    @Column()
    public process!: string;

    @Column()
    public species!: string;

    @Column()
    public origin!: string;

    @ManyToOne((type) => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'owner' })
    public owner!: UserEntity;

    @ManyToOne((type) => CoffeeStoreEntity, (coffeeStore) => coffeeStore.id)
    @JoinColumn({ name: 'store' })
    public store!: CoffeeStoreEntity;

    @OneToMany((type) => CoffeeBrewingEntity, (coffeeBrewings) => coffeeBrewings.coffee )
    // @JoinColumn({ name: 'brewings' })∏
    public brewings!: CoffeeBrewingEntity[];
}
