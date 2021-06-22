import { DriverEntity } from 'src/driver/driver.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class ContractorEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  cuit: string;

  @Column({
    nullable: true,
  })
  street_address?: string;

  @Column({
    nullable: true,
  })
  number_address?: number;

  @Column({
    nullable: true,
  })
  city_address?: string;

  @Column({
    nullable: true,
  })
  province_address?: string;

  @OneToMany((type) => DriverEntity, (driver) => driver.contractor, {
    nullable: true,
  })
  drivers?: DriverEntity[];
}
