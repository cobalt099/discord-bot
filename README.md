# Discord Bot (FPS.ms)

Separate Discord bot project — not related to jjs-torneo.

## Local setup

```powershell
cd C:\Users\edwin\Projects\discord-bot
npm install
copy .env.example .env
```

Fill in `.env`:

```
BOT_TOKEN=
CLIENT_ID=
GUILD_ID=
```

Register slash commands (once after adding/changing commands):

```powershell
npm run deploy-commands
```

Run locally:

```powershell
npm start
```

## FPS.ms setup

1. Push this repo to GitHub.
2. In FPS.ms **Startup** tab:
   - **GIT REPO ADDRESS** → your repo URL
   - **INSTALL BRANCH** → `main`
   - **AUTO UPDATE** → ON
   - **GIT USERNAME** + **GIT ACCESS TOKEN** → if private repo
   - **MAIN FILE** → `index.js`
   - **USER UPLOADED FILES** → OFF
3. **Reinstall Server** once to pull the repo.
4. **Files** tab → create `.env` with `BOT_TOKEN`, `CLIENT_ID`, `GUILD_ID`.
5. **Console** → run `npm run deploy-commands` once, then **Start**.

## Updating the bot

1. Edit code in Cursor.
2. `git push`
3. Restart the server on FPS.ms **Console** tab.
4. If you added/changed slash commands, run `npm run deploy-commands` in the console once.

## Adding commands

Create a new file in `commands/`, for example `commands/hello.js`:

```js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Say hi"),

  async execute(interaction) {
    await interaction.reply(`Hi ${interaction.user.username}!`);
  },
};
```

Then run `npm run deploy-commands` and restart the bot.
