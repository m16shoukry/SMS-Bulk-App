import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { Campaign } from "./Campaign";

@Entity({ name: "contacts" })
export class Contacts {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  campaignId: number;

  @JoinColumn({ name: "campaignId", referencedColumnName: "id" })
  @ManyToOne(() => Campaign, (campaign) => campaign.contacts)
  campaign: Campaign;

  @UpdateDateColumn({ type: "datetime", onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
