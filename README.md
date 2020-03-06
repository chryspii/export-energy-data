:warning: This project is currently **under development**! however ready to use.

# Export Energy Data to CSV
A web-based application for export energy data from mongodb to csv file

## Tools
* [NodeJS](https://nodejs.org/)
* [ExpressJS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Bootstrap](https://getbootstrap.com/)

## How to deploy
1. Clone the git repository
    ```bash
    git clone https://github.com/chryspii/export-energy-data.git
    ```

2. Install all required dependencies
    ```bash
    npm install
    ```

3. Run the application using **Nodemon** 
    ```bash
    nodemon start
    ```

## Documentation
### Directory Structure
```bash
./export-energy-data/
└── bin/                    # config port and host
│   └── www
└── public/                 # website assets
│   └── css/
│   └── img/
│   └── js/
│   └── scss/
│   └── vendor/
└── routes/                 # controller
│   └── css/
│   └── img/
└── views/                  # front-end 
│   ├── error.pug
│   ├── index.pug
│   └── layout.pug
└── app.js                  # main file
└── package.json            # dependencies
