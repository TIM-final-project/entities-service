import { GenericEntity } from 'src/common/entities/generic_entity';
import {
  Column,
  Entity,
} from 'typeorm';

@Entity()
export class AuditorEntity extends GenericEntity {
   @Column({ nullable: false })
  surname: string;

  @Column({ nullable: true })
  birth_date: Date;
}
