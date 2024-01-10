import { GenericEntity } from 'src/common/entities/generic_entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class SecurityEntity extends GenericEntity {
  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: true })
  birth_date?: Date;

  @Column({ 
    nullable: false 
  })
  plant:number;

}
