# Discord Bot (FPS.ms)

Curly — Discord bot hosted on FPS.ms.

## Commands

| Category | Command | Description |
|----------|---------|-------------|
| General | `/ping` | Bot latency |
| General | `/help` | Command list by category |
| Info | `/serverinfo` | Server stats |
| Info | `/userinfo` | User profile |
| Info | `/avatar` | User avatar |
| Fun | `/8ball` | Magic 8-ball |
| Fun | `/poll` | Yes/no poll with reactions |
| Mod | `/say` | Bot sends a message (Manage Messages) |

## Project layout

```text
discord-bot/
├── index.js
├── utils/
│   ├── loadCommands.js
│   └── permissions.js
└── commands/
    ├── general/
    ├── info/
    ├── fun/
    └── mod/
```

## Add a new command

1. Create `commands/your-category/yourcommand.js`
2. Export `category`, `data`, and `execute`
3. Restart the bot on FPS.ms (commands re-register on start)

## FPS.ms update

After editing files locally, upload changed files to FPS.ms **Files** tab (keep folder structure), then **Restart** the server.

Or push to GitHub if Auto Update is enabled.

## Environment variables (.env on FPS.ms only)

```env
BOT_TOKEN=
CLIENT_ID=
GUILD_ID=
```
