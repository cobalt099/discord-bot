const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  category: "Info",
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Show info about a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to look up").setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const member = await interaction.guild?.members.fetch(user.id).catch(() => null);

    const embed = new EmbedBuilder()
      .setColor(member?.displayHexColor || 0x5865f2)
      .setTitle(user.tag)
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: "Username", value: user.username, inline: true },
        { name: "User ID", value: user.id, inline: true },
        { name: "Account created", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: false }
      );

    if (member) {
      embed.addFields(
        { name: "Joined server", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        {
          name: "Roles",
          value: member.roles.cache
            .filter((r) => r.id !== interaction.guild.id)
            .sort((a, b) => b.position - a.position)
            .map((r) => `<@&${r.id}>`)
            .slice(0, 8)
            .join(", ") || "None",
          inline: false,
        }
      );
    }

    await interaction.reply({ embeds: [embed] });
  },
};
