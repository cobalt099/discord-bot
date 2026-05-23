const { SlashCommandBuilder } = require("discord.js");
const { requireManageMessages } = require("../../utils/permissions");

module.exports = {
  category: "Mod",
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot send a message (staff only)")
    .addStringOption((option) =>
      option.setName("message").setDescription("Message to send").setRequired(true)
    )
    .addChannelOption((option) =>
      option.setName("channel").setDescription("Channel to send in").setRequired(false)
    ),

  async execute(interaction) {
    if (!requireManageMessages(interaction)) return;

    const message = interaction.options.getString("message", true);
    const channel = interaction.options.getChannel("channel") || interaction.channel;

    if (!channel?.isTextBased()) {
      await interaction.reply({ content: "That channel cannot receive messages.", ephemeral: true });
      return;
    }

    await channel.send(message);
    await interaction.reply({ content: "Message sent.", ephemeral: true });
  },
};
