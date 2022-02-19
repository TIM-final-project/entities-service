import { GenericEntity } from 'src/common/entities/generic_entity';
import { DriverEntity } from 'src/driver/driver.entity';
import { VehicleEntity } from 'src/vehicle/vehicle.entity';
import {
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class ContractorEntity extends GenericEntity{
  
  @OneToMany((type) => DriverEntity, (driver) => driver.contractor, {
    nullable: true,
  })
  drivers?: DriverEntity[];

  @OneToMany((type) => VehicleEntity, (vehicle) => vehicle.contractor, {
    nullable: true,
  })
  vehicles?: VehicleEntity[];
}
