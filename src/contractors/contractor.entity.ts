import { DriverEntity } from 'src/driver/driver.entity';
import { VehicleEntity } from 'src/vehicle/vehicle.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class ContractorEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    unique:true
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

  @OneToMany((type) => VehicleEntity, (vehicle) => vehicle.contractor, {
    nullable: true,
  })
  vehicles?: VehicleEntity[];
}
