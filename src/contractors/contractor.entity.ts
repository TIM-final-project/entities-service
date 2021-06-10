import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ContractorEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column({
    nullable: false,
  })
  name: string;
}
