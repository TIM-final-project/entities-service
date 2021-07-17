import { ContractorEntity } from 'src/contractors/contractor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false,
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
}
