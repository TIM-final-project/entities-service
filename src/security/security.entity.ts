import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SecurityEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false })
  cuit: string;

  @Column({ nullable: true })
  birth_date?: Date;
}
