import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "subscriptions" })
export class Subscription {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "datetime" })
  startDate: Date;

  @Column({ type: "datetime" })
  endDate: Date;

  @Column({ default: 0 })
  sentSMSsNum: number;

  @Column({ default: 50 })
  numSMS: number;

  @Column()
  pricingPlanId: number;

  @Column()
  userId: number;

  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;
}
