## Building A React Ldap Viewer
In this blog post, I’ll walk you through the process of building a simple React Directory Viewer.

## The Goal
The goal was to create a viewer with the following features:

1. A lightweight Directory viewer with multi directory support.
2. Search functionality based on users or groups.

Let's break it down step by step!

## Setting Up Dependencies
Before diving into the code, let’s quickly look at the libraries that helped us achieve all of this:

- React: This is our UI library for building the app.
- React Router: To handle navigation between the homepage and individual posts.
- Express: Used to handle backend routes.
- ldapts: An opensource library for handling LDAP protocols within directories.
- winston: Leveraged to implement better logging.


Now, let’s dive into how we built the blog step by step!

## 1. Setting Up Page
The homepage should handle displaying user and group input fields and offer directory selection. We should capture the selected fields so we can pass the input and selections to the server backend.

Here’s how we structured the homepage:


```javascript

import './App.css';
import { useState } from 'react';

function App() {
  const [searchType, setSearchType] = useState('user');
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('DirectoryOne')

  const fetchSearchResult = async () => {
    try{

      const route = activeTab === 'DirectoryOne' ? 'DirectoryOne' : 'DirectoryTwo';
      const endpoint = searchType === 'user' ? 'user' : 'group';
      const response = await fetch(`/api/${route}/${endpoint}/${searchId}`);

      if (!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setSearchResult(data);
      setError(null);
    }catch (err) {
      console.error('Failed to fetch result:', err);
      setError(err.message);
      setSearchResult(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ldap Directory Viewer</h1>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "DirectoryOne" ? 'active' : ''}`}
            onClick={() => setActiveTab('DirectoryOne')}
            >
              DirectoryOne
            </button>
            <button
            className={`tab ${activeTab === "DirectoryTwo" ? 'active' : ''}`}
            onClick={() => setActiveTab('DirectoryTwo')}
            >
              DirectoryTwo
            </button>
        </div>
      </header>
      <main>
        <div className='search-controls'>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="group">Group</option>
          </select>
          <input
            type='text'
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder={`Enter ${searchType === 'user' ? 'User ID' : 'Group Name'}`}
          />
          <button onClick={fetchSearchResult}>Fetch Information</button>
        </div>
        {error && <div className="error">{error}</div>}
        {searchResult && (
          <div>
            <h2>{searchType === 'user' ? 'User' : 'Group'}</h2>
            <table className='info-table'>
              <tbody>
                {Object.entries(searchResult).map(([key, value]) => (
                <tr key={key}>
                  <td className='key'>{key}</td>
                  <td className='value'>{value}</td>
                </tr>
                
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
```

## 2. Allowing search functionality
When a user selects a directory, the input type, and passes input we should handle the following:

- Invoke the correct route based on the options selected
- Bind to the directory
- Carry out the LDAP call
- Return information to the application


### Creating clients
Ldapts documentation is slim yet their [readme](https://github.com/ldapts/ldapts/blob/main/README.md) showcases how simple it can be to create clients. The below implementation does not handle client pooling and within a high envrionment is is recommended to implement pooling as maintaining connections is one of the most *costly* operations in regard to LDAP protocols.

```javascript

const clientOne = new Client({
    url: firstUrl,
    timeout: 0,
    connectTimeout: 0,
    tslOptions : {
        rejectUnauthorized: false
    }
});

const clientTwo = new Client({
    url: secondUrl,
    timeout: 0,
    connectTimeout: 0,
    tslOptions : {
        rejectUnauthorized: false
    }
});
```

### Implementing Routes

```javascript

app.get('/api/directoryOne/user/:id', async (req, res) => {

    const userId = req.params.id;

    try {

        await clientOne.bind(firstBindDn, firstPassword);

        const { searchEntries, searchRefernces} = await clientOne.search('dc=example,dc=com', {
            attributes: ['*'],
            scope: 'sub',
            filter: `(uid=${userId})`
        });

        if (searchEntries.length === 0){
            log.info(`user not found for ${userId}`);
            res.status(404).json({error: 'User not found'})
        } else {
            res.json(searchEntries[0]);
        }
    
        await clientOne.unbind();

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});
```

### Adding a logger

```javascript

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} ${level} ${message}`
});

const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'server.log'})
    ],
});

module.exports = logger;


```

### Putting it all together

```javascript
require('dotenv').config()
const express = require('express');
const { Client } = require('ldapts');
const log = require('./logger');
const app = express();
const port = 8080;

const firstUrl = process.env.FIRST_URL;
const firstBindDn = process.env.FIRST_DN;
const firstPassword = process.env.FIRST_PWD;

const secondUrl = process.env.SECOND_URL;
const secondBindDn = process.env.SECOND_DN;
const secondPassword = process.env.SECOND_PWD;

const clientOne = new Client({
    url: firstUrl,
    timeout: 0,
    connectTimeout: 0,
    tslOptions : {
        rejectUnauthorized: false
    }
});

const clientTwo = new Client({
    url: secondUrl,
    timeout: 0,
    connectTimeout: 0,
    tslOptions : {
        rejectUnauthorized: false
    }
});

app.get('/api/directoryOne/user/:id', async (req, res) => {

    const userId = req.params.id;

    try {

        await clientOne.bind(firstBindDn, firstPassword);

        const { searchEntries, searchRefernces} = await clientOne.search('dc=example,dc=com', {
            attributes: ['*'],
            scope: 'sub',
            filter: `(uid=${userId})`
        });

        if (searchEntries.length === 0){
            log.info(`user not found for ${userId}`);
            res.status(404).json({error: 'User not found'})
        } else {
            res.json(searchEntries[0]);
        }
    
        await clientOne.unbind();

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

app.get('/api/directoryOne/group/:id', async (req, res) => {

    const userId = req.params.id;

    try {
 
        await clientOne.bind(firstBindDn, firstPassword);

        const { searchEntries, searchRefernces} = await clientOne.search(`cn=${userId},ou=groups,dc=example,dc=com`, {
            attributes: ['*'],
            scope: 'sub',
            filter: `(cn=${userId})`
        });

        if (searchEntries.length === 0){
            log.info(`group not found for ${userId}`);
            res.status(404).json({error: 'Group not found'})
        } else {
            res.json(searchEntries[0]);
        }
    
        await clientOne.unbind();

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

app.get('/api/directoryTwo/user/:id', async (req, res) => {

    const userId = req.params.id;

    try {

        await clientTwo.bind(secondBindDn, secondPassword);

        const { searchEntries, searchRefernces} = await clientTwo.search('ou=system', {
            attributes: ['*'],
            scope: 'sub',
            filter: `(uid=${userId})`
        });

        if (searchEntries.length === 0){

            log.info(`user not found for ${userId}`);
            res.status(404).json({error: 'User not found'})
        } else {
            res.json(searchEntries[0]);
        }
    
        await clientTwo.unbind();

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

app.get('/api/directoryTwo/group/:id', async (req, res) => {

    const userId = req.params.id;

    try {

        await clientTwo.bind(secondBindDn, secondPassword);

        const { searchEntries, searchRefernces} = await clientTwo.search('ou=system', {
            attributes: ['*'],
            scope: 'sub',
            filter: `(uid=${userId})`
        });

        if (searchEntries.length === 0){

            log.info(`user not found for ${userId}`);
            res.status(404).json({error: 'Group not found'})
        } else {
            res.json(searchEntries[0]);
        }
    
        await clientTwo.unbind();

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

```

## 3. Wrapping Up
And that's it! We now have a fully functional React blog with a clean layout, dynamic content loading, and some cool extras like syntax-highlighted code blocks and a particle background. Here’s a recap of what we achieved:

- Dynamic Blog Post Loading: Posts are loaded dynamically based on their slug, allowing us to easily add new content.
- Syntax Highlighting: Code snippets within the markdown are properly highlighted using react-syntax-highlighter.
- Particle Background: A subtle but engaging particle effect adds some dynamic visuals to the page without distracting from the content.
That’s the walkthrough of building a dynamic React blog with markdown support. I hope this post gave you a good understanding of how we used React and several libraries to create a functional and stylish blog.

## Possible customizations:

### Add More Directories
You can add more directories by extending the environment variables and modifying the *server.js* and *app.js* files to handle additional directory connections.

### Enhance Search Capabilities
You can add filters or advanced search options by modifying the filter parameter in the ldapts search queries.

### Add Authentication
Secure the viewer by adding authentication mechanisms (e.g., JWT, session-based authentication) in the backend.

### Style the UI
Customize the design by modifying the CSS in App.css to match your branding or preferences.

### Support Write Operations
Extend the backend and frontend to support creating, updating, or deleting LDAP entries.

## Source code location

You can find the full code [here](https://github.com/DLaMott/ldap-directory-viewer).