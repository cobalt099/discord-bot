const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  category: "Fun",
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a quick yes/no poll")
    .addStringOption((option) =>
      option.setName("question").setDescription("Poll question").setRequired(true)
    ),

  async execute(interaction) {
    const question = interaction.options.getString("question", true);

    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle("📊 Poll")
      .setDescription(question)
      .setFooter({ text: `Asked by ${interaction.user.username}` });

    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });

    await message.react("👍");
    await message.react("👎");
  },
};
