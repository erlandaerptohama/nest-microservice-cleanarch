import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column('varchar')
    username: string;

    @Column('varchar')
    name: string;

    @Column('text')
    password: string;

    @Column()
    role: number;

    @CreateDateColumn({ name: 'created_date', default: new Date() })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', default: new Date() })
    updatedDate: Date;
}
