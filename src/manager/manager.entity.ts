import { AddressEntity } from 'src/common/entities/address.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ManagerEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false, unique: true })
  cuit: string;

  @Column({ nullable: true })
  birth_date?: Date;

  @OneToOne(() => AddressEntity, {
    cascade: true,
  })
  @JoinColumn()
  address?: AddressEntity;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @Column({
    nullable: false,
    default: true,
  })
  active?: boolean;
}
