# Project Serverless ShortLinker Product Specs

Long URLs can be inconvenient to use, especially in correspondence. To solve this problem, there are services that shorten long links. I have built cost-efficient and flexible API for a link shortener application.

## Project initialization

To start working on this project, you need to do the following steps:

1. Run commands:

   ```bash
   npm install -g serverless
   ```
   ```bash
   npm ci
   ```

2. Copy the content of the **example.env** file into **.env** file and set environment variables.
3. Run command:
    ```bash
    npm run deploy
    ```
4. After first deploy, add API_URL and QUEUE_LINK to env. file.
5. Now, start the project by running again the command:

    ```bash
    npm run deploy
    ```

## Endpoints

#### Auth
- /auth/registration (POST) - register
- /auth/login (POST) - login

#### Link
- / (POST) - create link
- / (GET) - get all my links
- /:url (GET) - redirect to original link
- /:shortUrl (DELETE) - delete my link
