# UTOR-MOD13-CHAL01-E-Commerce-Back-End
UTOR MOD13 CHAL01 E-Commerce Back End

## Description

Repository containing the code for the E-commerce back end. This is a server side project using node.js where the user has several routes available to them to make CRUD (Create Read Update Delete) operations on four aspects of an e-commerce site:
- Products
- Categories
- Tags
- Product Tags (the link between products and tags. One product can have many tags; and one tag can be given to many products)

The information is stored in MySQL database, which is seeded with supplied sample data. The route testing is done using Insomnia.

Below is the image of Insomnia when the user has made a query
![Insomnia - Products - get all products](./assets/images/EBE-01-insomnia-product-get-all.png)


## Table of Contents

- [Installation](#installation)
- [Functionality](#functionality)
- [Usage](#usage)
- [Credits](#credits)
- [Tests](#tests)
- [License](#license)
- [Walktrough](#walkthrough)
- [Future Development](#future-development)

## Installation

PRE-Requisites: 
- you must have node.js version 16.* installed on your computer prior to proceeding
- you must have MySQL/MariaDB installed on your computer prior to proceeding


### Databse setup
This must be executed before launching the application
1. Log into your MySQL/MariaDB server.
2. Execute the following command:
```md
    mysql> source path_to_schema.sql/schema.sql
```
3. Verify the database creation by running the command. The database should be listed in the results
```md
    mysql> show databases;
```

### Application launch:
1. Download the source code
2. Navigate to the folder containing the package.json file
3. Run the following commands
```md
    $ npm install
    $ npm run seed
    $ npm start
```

back to [Table of Contents](#table-of-contents)


## Functionality

The following discusses at a high level about some of the features of the website. Detailed code implementation can be found as comments in the JS files.


### Node.js:

The entire porject is built on Node.js utilizing the following additional libraries:
- sequalize: this librabry handles all communication between the application and the database. The library makes use of Javascript objects, which subsequently translates to SQL stataments to perform database operations.
- dotenv: this 'hides' the sensitive information such as database user names and passwords into a hidden file named .env. The file is added to the process variables which are used by sequalize to establish database connection.


### Insomnia:

This is a tool used to test the operation of various API's. The tool lets us access a route and retrieve any corresponding information the routes provides. The information could be data in JSON format or an error/warning message.


back to [Table of Contents](#table-of-contents)

## Usage

For accessing the application:<br>

1. After the server has been started (as per the instructions in the installation section) launch Insomnia
2. Run any of the following types of requests
```md
    GET:    http://localhost:3001/api/products/
    GET:    http://localhost:3001/api/products/product_id
    POST:   http://localhost:3001/api/products/
    PUT:    http://localhost:3001/api/products/product_id
    DELETE: http://localhost:3001/api/products/product_id

    GET:    http://localhost:3001/api/categories/
    GET:    http://localhost:3001/api/categories/category_id
    POST:   http://localhost:3001/api/categories/
    PUT:    http://localhost:3001/api/categories/category_id
    DELETE: http://localhost:3001/api/categories/category_id

    GET:    http://localhost:3001/api/tags/
    GET:    http://localhost:3001/api/tags/tags_id
    POST:   http://localhost:3001/api/tags/
    PUT:    http://localhost:3001/api/tags/tags_id
    DELETE: http://localhost:3001/api/tags/tags_id

```
3. In the case of the POST and PUT, you must supply information in the body of the request. Refer to the walkthrough for more details.

back to [Table of Contents](#table-of-contents)


## Credits
n/a

back to [Table of Contents](#table-of-contents)


## Tests

All tests have been performed manually.

back to [Table of Contents](#table-of-contents)


## License

Please refer to the LICENSE in the repo.

back to [Table of Contents](#table-of-contents)


## Walkthrough

- Application walkthrough: https://youtu.be/Bpt7DnwJpdI

back to [Table of Contents](#table-of-contents)


## Future Development

Here are some of the items to be considered for future development.
1. Develop a front end

back to [Table of Contents](#table-of-contents)
