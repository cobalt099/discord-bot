require("dotenv").config();

const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} = require("discord.js");
const { walkCommandFiles } = require("./utils/loadCommands");

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token) {
  console.error("Missing BOT_TOKEN in .env");
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = walkCommandFiles(commandsPath);
const slashPayload = [];

for (const filePath of commandFiles) {
  const command = require(filePath);

  if (!command.data || !command.execute) {
    console.warn(`Skipping ${filePath}: missing data or execute export.`);
    continue;
  }

  if (client.commands.has(command.data.name)) {
    console.warn(`Skipping duplicate command name: /${command.data.name} (${filePath})`);
    continue;
  }

  client.commands.set(command.data.name, command);
  slashPayload.push(command.data.toJSON());
}

async function registerSlashCommands() {
  if (!clientId) {
    console.warn("Missing CLIENT_ID in .env — slash commands not registered.");
    return;
  }

  const rest = new REST().setToken(token);

  if (guildId) {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: slashPayload,
    });
    console.log(`Registered ${slashPayload.length} slash command(s) for this server.`);
  } else {
    await rest.put(Routes.applicationCommands(clientId), { body: slashPayload });
    console.log(`Registered ${slashPayload.length} global slash command(s).`);
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, { commands: client.commands, client });
  } catch (error) {
    console.error(`Error running /${interaction.commandName}:`, error);

    const reply = { content: "Something went wrong running that command.", ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply);
    } else {
      await interaction.reply(reply);
    }
  }
});

(async () => {
  try {
    await registerSlashCommands();
    await client.login(token);
  } catch (error) {
    console.error("Failed to start bot:", error);
    process.exit(1);
  }
})();
