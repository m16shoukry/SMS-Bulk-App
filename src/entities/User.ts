import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Campaign } from "./Campaign";
import { Subscription } from "./Subscription";
import { Exclude } from "class-transformer";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  name: string;

  @Index()
  @Column({ unique: true })
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', onUpdate: 'GETDATE()' })
  updatedAt: Date;

  @OneToMany(() => Campaign, (campaign) => campaign.user, { eager: true })
  campaigns: Campaign[];

  @OneToMany(() => Subscription, (subscription) => subscription.user, { eager: true })
  subscriptions: Subscription[];
}
