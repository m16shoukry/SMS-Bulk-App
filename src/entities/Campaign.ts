import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Message } from "./Message";
import { Contacts } from "./Contacts";

@Entity({ name: "campaigns" })
export class Campaign {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  campaignName: string;

  @Column({ unique: true })
  senderName: string;

  @Column()
  userId: number;

  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  @ManyToOne(() => User, (user) => user.campaigns)
  user: User;

  @OneToMany(() => Message, (message) => message.campaign, { eager: true })
  messages: Message[];

  @OneToMany(() => Contacts, (contacts) => contacts.campaign, { eager: true })
  contacts: Contacts[];

  @CreateDateColumn({ type: "datetime", default: () => "GETDATE()" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime", onUpdate: 'GETDATE()'})
  updatedAt: Date;
}
