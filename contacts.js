const fs = require('fs/promises')
const path = require('path');
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, './db/contacts.json')

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return console.table(contacts, ['name', 'email', 'phone', 'id']);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getContactById(contactId) {
    try {
        const id = String(contactId);
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const contact = contacts.find(item => item.id === id);
        return contact || null;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function removeContact(contactId) {
    try {
    const id = String(contactId);
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
    const index = contacts.findIndex((item) => item.id === id)
    if (index === -1) {
      return null;
    } 
   const removedContact = {...contacts[index] }; 
        contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return removedContact; 
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function addContact({ name, email, phone }) {
    try {
        const newContact = {
            id: nanoid(),
            name: name,
            email: email,
            phone: phone,
        }
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    contactsPath,
    listContacts,
    getContactById,
    removeContact,
    addContact
}