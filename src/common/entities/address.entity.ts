import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: true
  })
  number?: number;

  @Column({
    nullable: true
  })
  street?: string;

  @Column({
    nullable: true
  })
  city?: string;

  @Column({
    nullable: true
  })
  province?: string;

  @Column({
    nullable: true
  })
  zip_code?: string;
}
