const contacts = require('./contacts')
const yargs = require('yargs');
const {hideBin} = require('yargs/helpers')

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
        const allContacts = await contacts.listContacts()
        console.log(allContacts);
      break;
    case 'get':
        const contactById = await contacts.getContactById(id)
        console.log(contactById);
      break;
    case 'add':
        const newContact = await contacts.addContact({ name, email, phone })
        console.log(newContact);                    
      break;
    case 'remove':
        const deletedContact = contacts.removeContact(id)
        console.log(deletedContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
 
const arr = hideBin(process.argv)
const { argv } = yargs(arr)
invokeAction(argv);


// invokeAction({ action:'remove', id: "AeHIrLTr6JkxGE6SN-0Rw"});
// invokeAction({action:'add', name: "James Bond", email:"secret@agent.net",  phone: "(000) 000-007"})
// invokeAction({ action:'get', id: "qdggE76Jtbfd9eWJHrssH"});
// invokeAction({ action:'list'});

