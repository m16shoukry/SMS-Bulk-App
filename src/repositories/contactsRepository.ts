import { Contacts } from "../entities/Contacts";
import dataSource from "../db/db.config";
import { BaseRepository } from "./baseRepository";

export default class ContactsRepository extends BaseRepository<Contacts> {
  constructor() {
    super(dataSource.getRepository(Contacts));
  }
}
