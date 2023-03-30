<p align="center"><img src="public/logo_full_small.png" alt="UpVotr Logo Design" height="250" width="608"></p>

# UpVotr

A fully-featured feedback, bug reporting, and help portal built with React, TypeScript, and Next.js

## Table of Contents

## Software Requirements

- `NodeJS`: v14 or higher, with `npm` installed.
- Operating system: Any OS will _work_, but for convenience a linux/unix based OS is reccomended, such as Ubuntu. (see [issues with hosting on windows](#hosting-on-windows))

If you are running the database on the same device as the server, version 8.0 or later of the MySQL server must be installed.

If you are using a remote MySQL server, make sure that you have access to the terminal, or a connection with enough permissions to create users and grant permissions.

### Hosting on windows

Hosting on windows devices has a few caveats that may be problematic:

- The build step _will fail_ on any external drive. This is an issue with the
  Next compiler (see vercel/next.js#45067). If this issue is resolved, please create an issue on this repository for this to be removed.

## Pre-hosting setup

Before you start the server, we need to do some configuration of the MySQL server:

- Create a new user for the server to connect to the database with:
  - Connect to the MySQL database as root or the user that you plan to use for configuration.
  - Determine the `username`, `password`, and `database host` (for remote database connections, defaults to `127.0.0.`) for the connection and the `database name` and `host` and `port` of the website.
  - Run the following commands, replacing each `<field>` with the appropriate value:
    ```sql
    CREATE USER '<username>'@'<host>' IDENTIFIED BY '<password>';
    GRANT ALL ON `<database name>`.* TO '<username>'@'<host>';
    ```
    Example:
    ```sql
    CREATE USER 'upvotr'@'feedback.upovotr.io' IDENTIFIED BY 'supersecurepassword';
    GRANT ALL ON `upvotr`.* TO 'upvotr'@'feedback.upvotr.io';
    ```
    > Note: If the MySQL server is running on the same machine, `host` should be `127.0.0.1`
  - Create `upvotr.config.json` in the root folder (next to `tsconfig.json`) with the following content:
    ```json
    {
      "server": {
        "hostname": "<host>",
        "port": <port>
      },
      "mysql": {
        "login": {
          "user": "<username>",
          "password": "<password>"
        },
        "connection": {
          "host": "<database host>"
        },
        "database": {
          "name": "upvotr"
        },
      }
    }
    ```
