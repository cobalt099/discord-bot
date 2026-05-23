const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  category: "Info",
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Show a user's avatar")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to show").setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const url = user.displayAvatarURL({ size: 1024, extension: "png" });

    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle(`${user.username}'s avatar`)
      .setImage(url)
      .setDescription(`[Download PNG](${url})`);

    await interaction.reply({ embeds: [embed] });
  },
};
