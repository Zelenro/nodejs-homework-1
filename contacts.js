const fs = require('fs/promises')
const path = require('path');
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, './db/contacts.json')

async function listContacts() {
    try {
         const data = await fs.readFile(contactsPath)
         return JSON.parse(data)
    } catch (error) {
        console.log(error)
        throw error
    } 
}

async function getContactById(contactId) {
    try {
        const id = String(contactId)
        const contacts = await listContacts()
        const contact = contacts.find(items => items.id === id)
        return contact || null;
    } catch (error) {
        console.log(error)
        throw error
    } 
}

async function removeContact(contactId) {
    try {
    const id = String(contactId)
    const contacts = await listContacts()
    const index = contacts.findIndex((item) => item.id === id)
    if (index === -1) {
      return null;
    }
    const deletedContact = contacts[index].name;
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    console.log(`Contact ${deletedContact} deleted`)
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function addContact({ name, email, phone }) {
    try {
        const contacts = await listContacts()
        const newContact = {
            id: nanoid(),
            name: name,
            email: email,
            phone: phone,
        }
        contacts.push(newContact)
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        console.log(`Contact ${newContact.name} added to contacts`)
        return newContact
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    contactsPath,
    listContacts,
    getContactById,
    removeContact,
    addContact
}