import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { Campaign } from "./Campaign";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "nvarchar", length: 150 })
  text: string;

  @Column()
  campaignId: number;

  @JoinColumn({ name: "campaignId", referencedColumnName: "id" })
  @ManyToOne(() => Campaign, (campaign) => campaign.messages)
  campaign: Campaign;

  @UpdateDateColumn({ type: "datetime", onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
