import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CoffeeOriginEntity, CoffeeKindEntity, CoffeeRoastedEntity } from "./CoffeeAttrsEntity";
import { CigarAnschnittEntity, CigarAromaradEntity, CigarDeckplattEntity, CigarEinlageEntity, CigarOriginEntity, CigarProducerEntity, CigarUmblattEntity } from "./CigarAttrsEntity";

@Entity()
export class CigarEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Index({ unique: true })
    public name!: string;

    // @Column()
    // public images!: Image[];

    @Column()
    public abbrand!: number;
    
    @Column()
    public aromavielfalt!: number;
    
    @Column()
    public aromaentwicklung!: number;

    @Column()
    public buydate!: string;

    @Column()
    public description!: string;

    @Column()
    public lenght!: number;

    @Column()
    public rating!: number;

    @Column()
    public ringmas!: number;

    @Column()
    public smokeagain!: boolean;

    @Column()
    public smokeduration!: number;

    @Column()
    public smokedate!: string;

    @Column()
    public strength!: number;

    @Column()
    public zugwiederstand!: number;

    @ManyToOne(type => CigarAnschnittEntity, cigarAnschnitt => cigarAnschnitt.id)
    @JoinColumn({ name: "anschnitt" })
    public anschnitt!: CigarAnschnittEntity;

    @ManyToOne(type => CigarAromaradEntity, cigarAromarad => cigarAromarad.id)
    @JoinColumn({ name: "aromarad" })
    public aromarad!: CigarAromaradEntity;

    @ManyToOne(type => CigarDeckplattEntity, cigarDeckplatt => cigarDeckplatt.id)
    @JoinColumn({ name: "deckplatt" })
    public deckplatt!: CigarDeckplattEntity;

    @ManyToOne(type => CigarEinlageEntity, cigarEinlage => cigarEinlage.id)
    @JoinColumn({ name: "einlage" })
    public einlage!: CigarEinlageEntity;

    @ManyToOne(type => CigarOriginEntity, cigarOrigin => cigarOrigin.id)
    @JoinColumn({ name: "origin" })
    public origin!: CigarOriginEntity;

    @ManyToOne(type => CigarProducerEntity, cigarProducer => cigarProducer.id)
    @JoinColumn({ name: "producer" })
    public producer!: CigarProducerEntity;

    @ManyToOne(type => CigarUmblattEntity, cigarUmblatt => cigarUmblatt.id)
    @JoinColumn({ name: "umblatt" })
    public umblatt!: CigarUmblattEntity;

}