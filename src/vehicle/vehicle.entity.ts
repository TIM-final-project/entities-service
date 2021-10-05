import { ContractorEntity } from 'src/contractors/contractor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false,
    unique: true,
  })
  plate: string;

  @Column({
    nullable: false,
  })
  brand: string;

  @Column({
    nullable: false,
  })
  model: string;

  @Column({
    nullable: false,
  })
  year: number;

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
