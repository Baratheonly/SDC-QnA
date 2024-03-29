# Baratheonly System Design | Questions & Answers

## Summary

Created a backend API microservice to provide the required data (Questions and Answers) for an existing e-commerce website with existing frontend legacy code. Made incremental improvements to improve web traffic throughput (RPS) and response time in order to handle normal web traffic loads. Utilized stress testing tools such as k6 and loader.io to determine improvements in performance metrics.

## Improvements

### Database Improvements

- Built aggregate Postgres queries to help reduce database bottlenecking in query times
- Added indexing to lookup columns in Postgres database to improve lookup times. Improved lookup times from seconds to milliseconds

### Horizontal Scaling

- Deployed 4 AWS EC2 server instances with load balancing server through NGINX, to increase web traffic throughput from 100 RPS to 2000 RPS while maintaining 60 ms average response time with 0% timeout (error) rate
- Implemented Caching in NGINX to further improve response times. Able to reduce times from 60ms to 5ms for most commonly requested products.

Before (Through k6 local stress testing) \
<<<<<<< HEAD
![k6](https://ibb.co/pX4nywX)
=======
![k6](https://i.ibb.co/w6pYsg6/Screen-Shot-2022-07-05-at-3-01-24-PM.png)
>>>>>>> b1c908bb719528da81b060cebe6b33cb579c2c22

After (loader.io cloud stress testing) \
![loader.io](https://i.ibb.co/8DBkByw/Screen-Shot-2022-07-05-at-2-58-39-PM.png)

## Installation

Step 1: Install dependencies ~ npm install

Step 2: start server ~ npm run server-dev

## Technologies Used

- Setup and Configuration \
  ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
  ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

- Back End Development: Node.js, Express.js, PostgreSQL \
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-SQL-9cf)

- Server Testing: Loader.io, k6 \
  ![k6](https://img.shields.io/badge/k6-local-blue)
  ![Loader.io](https://img.shields.io/badge/loader.io-cloud-blue)

- Deployment & Load Balancing: AWS EC2, Ubuntu, NGINX \
  ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
  ![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)

Michael Lin
