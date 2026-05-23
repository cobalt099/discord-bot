const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List available commands"),

  async execute(interaction, { commands }) {
    const list = [...commands.values()]
      .map((cmd) => `• \`/${cmd.data.name}\` — ${cmd.data.description}`)
      .join("\n");

    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle("Commands")
      .setDescription(list || "No commands registered yet.")
      .setFooter({ text: "More commands can be added in the commands/ folder." });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
