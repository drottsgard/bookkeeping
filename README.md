# Bookkeeping

node version 22

Run backend:

```bash
cd backend
npm install
npm start
```

Run frontend:

```bash
cd frontend
npm install
npm run dev
```

## TODO

### Requirements

* Backend: Unit-test cascading behaviour of delta changes (Not sure how this is a unit test?)

### Improvements

* Backend: api versioning
* Types structure improvements
* Fetch incrementally. E.g. when opening the Collapse component
* Frontend ui improvements
    * Only allow one root node open at a time
    * Optimistic UI. E.g. when adding transaction
