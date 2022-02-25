import { Type } from "class-transformer";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { AddressEntity } from "./address.entity";

export abstract class GenericEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        nullable: false,
    })
    name: string;
    
    @Column({
        nullable: false,
    })
    username: string;
    
    @Column({
        nullable: false,
        unique: true,
    })
    cuit: string;

    @Column({
        nullable: true,
    })
    email: string;

    @Column({
        nullable: true
    })
    phone: string;

    @Type(() => AddressEntity)
    @OneToOne(() => AddressEntity, {
        cascade: true,
    })
    @JoinColumn()
    address?: AddressEntity;
    
    @CreateDateColumn()
    created_at?: Date;
    
    @UpdateDateColumn()
    updated_at?: Date;

    @Column({
        nullable: false,
        default: true,
    })
    active?: boolean;
}