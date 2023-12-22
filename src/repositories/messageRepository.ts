import dataSource from "../db/db.config";
import { Message } from "../entities/Message";
import { BaseRepository } from "./baseRepository";

export default class MessageRepository extends BaseRepository<Message> {
  constructor() {
    super(dataSource.getRepository(Message));
  }
}
