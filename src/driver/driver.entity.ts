import { AddressEntity } from 'src/common/entities/address.entity';
import { ContractorEntity } from 'src/contractors/contractor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class DriverEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false, unique: true })
  cuit: string;

  @Column({ nullable: true })
  birth_date?: Date;

  @OneToOne(() => AddressEntity, {
    cascade: true,
  })
  @JoinColumn()
  address?: AddressEntity;

  @ManyToOne((type) => ContractorEntity, (contractor) => contractor.drivers, {
    nullable: true,
  })
  contractor?: ContractorEntity;

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
