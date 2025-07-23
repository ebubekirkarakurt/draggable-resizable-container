# JSON Server - Fake API

This project uses [`json-server`](https://github.com/typicode/json-server) to simulate a RESTful API for development and testing purposes.

##  How It Works

`json-server` reads data from a `db.json` file and serves it as a full REST API.

> ⚠️ This project does **not** include any default data.  
> You are expected to provide your own `db.json` file manually.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create your own `db.json` file**  
   Either in the root directory or inside a subdirectory like `docs/server/`.

   Example `db.json` content:
   ```json
   {
    "data": [
        { "id": 1, "title": "Title 1", "alarmStatus": 1 },
        { "id": 2, "title": "Title 2", "alarmStatus": 0 },
        { "id": 3, "title": "Title 3", "alarmStatus": 1 },
        { "id": 4, "title": "Title 4", "alarmStatus": 0 },
        { "id": 5, "title": "Title 5", "alarmStatus": 0 },
        { "id": 6, "title": "Title 6", "alarmStatus": 0 },
        { "id": 7, "title": "Title 7", "alarmStatus": 0 }
    ]}
   ```

3. **Start the JSON server**:
   ```bash
   npx json-server --watch db.json --port 3000
   ```

   If your file is located at `docs/server/db.json`:
   ```bash
   npx json-server --watch docs/server/db.json --port 3000
   ```

## 📝 Notes

- No sample data is included in this project.
- You must manually create and manage your own `db.json` file.
- This setup is ideal for mocking API endpoints during frontend development or for testing purposes.

---
