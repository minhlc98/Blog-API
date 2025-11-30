import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
  @CreateDateColumn({ select: false, type: 'timestamp', name: 'created_at' })
	public createdAt!: Date;

	@UpdateDateColumn({ select: false, type: 'timestamp', name: 'updated_at' })
	public updatedAt?: Date;
}
