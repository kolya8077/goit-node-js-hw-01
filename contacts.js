const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");


const contactPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const id = String(contactId)
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
}

async function removeContact(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
