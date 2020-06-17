import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Label {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    color?: string;

    @Column()
    @CreateDateColumn()
    createdAt?: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt?: Date;
}
