import Contact from '../models/contact.model.js';

export const createContactService = async (data) => {
  return await Contact.create(data);
};

export const getAllContactsService = async (query) => {
  return await Contact.find().sort({ createdAt: -1 });
};

export const getContactByIdService = async (id) => {
  return await Contact.findById(id);
};

export const deleteContactService = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
