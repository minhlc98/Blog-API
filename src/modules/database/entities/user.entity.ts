import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ type: 'int' })
  gender: number

  @Column({ type: 'varchar' })
  permission?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  avatar?: string;

  @Column({ name: 'is_activated', type: 'bool', default: false })
  isActivated?: boolean;

  @Column({ name: 'activated_at', type: 'timestamp', default: null })
  activatedAt?: Date
}