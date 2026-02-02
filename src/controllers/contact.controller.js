import {
    createContactService,
    deleteContactService,
    getAllContactsService,
    getContactByIdService,
} from '../services/contact.service.js';
import ResponseHandler from '../utils/response.js';

export const createContact = async (req, res) => {
  try {
    const contact = await createContactService(req.body);
    if (!contact) {
      return ResponseHandler.error(res, 'Failed to send message', 500);
    }
    return ResponseHandler.created(res, contact, 'Message sent successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await getAllContactsService(req.query);
    return ResponseHandler.success(res, contacts, 'Contacts fetched successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await getContactByIdService(req.params.id);
    if (!contact) {
      return ResponseHandler.error(res, 'Contact not found', 404);
    }
    return ResponseHandler.success(res, contact, 'Contact fetched successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await deleteContactService(req.params.id);
    if (!contact) {
      return ResponseHandler.error(res, 'Contact not found', 404);
    }
    return ResponseHandler.success(res, contact, 'Contact deleted successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};
