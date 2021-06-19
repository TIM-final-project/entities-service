import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DriverEntity{
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
