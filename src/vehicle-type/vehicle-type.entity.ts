import { VehicleEntity } from 'src/vehicle/vehicle.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class VehicleTypeEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name?: string;

  @OneToMany(() => VehicleEntity, vehicle => vehicle.type)
  vehicles?: VehicleEntity[];
}
