# URLs

get all tasks:
https://localhost:3000/api

get single task:
https://localhost:3000/api/[ID]

post task:
https://localhost:3000/api

put task:
https://localhost:3000/api/[ID]

delete task:
https://localhost:3000/api/[ID]

# Models

post / put:
```json
{
  "task": "taskbeschreibung",
  "done": true
}
```

response:
```json
{
  "id": "34",
  "task": "taskbeschreibung",
  "done": true
}
```
