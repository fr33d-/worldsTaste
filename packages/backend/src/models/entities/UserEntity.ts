import * as bcrypt from "bcryptjs";
import { IsNotEmpty, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

// // This is our sample entity used in this example to show how TypeORM entities are defined. Please be aware that you
// // need the bang (!) after each class member to prevent TypeScript from complaining about properties having no
// // initializer and is no definite assignment in the constructor.
// @Entity()
// export class UserEntity extends BaseEntity {
//     // This column is the primary key and contains auto generated incrementing numbers as you'd already expect.
//     // No need to manually assign values to this.
//     @PrimaryGeneratedColumn()
//     public id!: number;

//     @Column()
//     public name!: string;

//     // The Index decorator with the unique argument will make sure you won't be able to add duplicate entities to a
//     // table that do not differ in the username. Keep in mind to try/catch functions that might trip over such
//     // constraints.
//     @Column()
//     @Index({ unique: true })
//     public username!: string;

//     @Column()
//     public email!: string;

//     @Column()
//     public password!: string;
// }

@Entity()
@Unique(["username"])
export class UserEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @Length(4, 20)
    public username!: string;

    @Column()
    @Length(4, 100)
    public name!: string;

    @Column()
    @Length(4, 100)
    public email!: string;

    @Column()
    @Length(4, 100)
    public password!: string;

    @Column()
    @IsNotEmpty()
    public role!: string;

    @Column()
    @CreateDateColumn()
    public createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt!: Date;

    // Todo: Logik in eigene klassen / services auslagern.
    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
