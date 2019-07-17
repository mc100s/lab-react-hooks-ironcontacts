import React, { useState } from 'react';
import './App.css';
import fullListOfContacts from './contacts.json'


function App() {
  // The initial state hook `contacts` is initialised with the 5 first elements of fullListOfContacts
  const [contacts, setContacts] = useState(fullListOfContacts.slice(0,5));

  function handleAddRandomContact() {
    // If we already have all the contacts
    if (contacts.length === fullListOfContacts.length) {
      return // stop the function
    }

    let randomIndex = Math.floor(Math.random() * fullListOfContacts.length)
    let randomContact = fullListOfContacts[randomIndex]

    // Check if the contact already exists (optional)
    if (contacts.includes(randomContact)) {
      handleAddRandomContact()
      return // Stop the function
    }

    setContacts([...contacts,randomContact])
  }

  // category could be: 'name' or 'popularity'
  function handleSort(category) {
    if (category === 'name') {
      // Syntax 1
      setContacts([...contacts].sort((a,b) => a.name > b.name ? 1 : -1))
    }
    if (category === 'popularity') {
      // Syntax 2
      let copyContacts = [...contacts]
      copyContacts.sort((a,b) => a.popularity < b.popularity ? 1 : -1)
      setContacts(copyContacts)
    }
  }

  // Solution 1 for handleDelete  
  function handleDelete1(indexToRemove) {
    let copyContacts = [...contacts]
    copyContacts.splice(indexToRemove, 1) // Remove the element at position indexToRemove
    setContacts(copyContacts)
  }

  // Solution 2
  function handleDelete(indexToRemove) {
    // We have `_` as a 1st parameter (instead of `contact`) because we don't need the 1st parameter (optional) 
    setContacts(contacts.filter((_,i) => i !== indexToRemove))
  }

  return (
    <div>
      <h1>IronContacts</h1>
      <div className="actions">
        <button onClick={handleAddRandomContact}>Add Random Contact</button>
        <button onClick={() => handleSort('name')}>Sort by name</button>
        <button onClick={() => handleSort('popularity')}>Sort by popularity</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact,i) => (
            <tr key={i}>
              <td><img className="contact-picture" src={contact.pictureUrl} alt=""/></td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td><button onClick={() => handleDelete(i)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;
