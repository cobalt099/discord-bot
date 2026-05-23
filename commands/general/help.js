const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  category: "General",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List all bot commands"),

  async execute(interaction, { commands }) {
    const grouped = new Map();

    for (const cmd of commands.values()) {
      const category = cmd.category || "Other";
      if (!grouped.has(category)) grouped.set(category, []);
      grouped.get(category).push(cmd);
    }

    const lines = [...grouped.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, cmds]) => {
        const items = cmds
          .sort((a, b) => a.data.name.localeCompare(b.data.name))
          .map((cmd) => `\`/${cmd.data.name}\` — ${cmd.data.description}`)
          .join("\n");
        return `**${category}**\n${items}`;
      })
      .join("\n\n");

    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle("Curly — Command List")
      .setDescription(lines || "No commands registered yet.")
      .setFooter({ text: `${commands.size} command(s) available` });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
