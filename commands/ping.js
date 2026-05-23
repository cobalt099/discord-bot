const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if the bot is online"),

  async execute(interaction) {
    const sent = Date.now();
    await interaction.reply({
      content: `Pong! ${Date.now() - sent}ms`,
      ephemeral: true,
    });
  },
};
