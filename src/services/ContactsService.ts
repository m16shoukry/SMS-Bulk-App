import { IContactsService } from "../interfaces/IContactsService";
import ContactsRepository from "../repositories/contactsRepository";

export class ContactsServices implements IContactsService {
  constructor(private contactsRepository: ContactsRepository) {
    this.contactsRepository = contactsRepository;
  }

  async saveContacts(phoneNumbers: string[], campaignId: number) {
    for (let phoneNumber of phoneNumbers) {
      const newContact = await this.contactsRepository.create({
        campaignId,
        phoneNumber: phoneNumber,
      });
      await this.contactsRepository.save(newContact);
    }
  }
}
