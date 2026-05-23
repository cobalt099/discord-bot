const { PermissionFlagsBits } = require("discord.js");

function memberHas(interaction, permission) {
  return interaction.member?.permissions?.has(permission) ?? false;
}

function requirePermission(interaction, permission, label) {
  if (memberHas(interaction, permission)) return true;

  interaction.reply({
    content: `You need **${label}** to use this command.`,
    ephemeral: true,
  });
  return false;
}

function requireManageMessages(interaction) {
  return requirePermission(interaction, PermissionFlagsBits.ManageMessages, "Manage Messages");
}

function requireAdministrator(interaction) {
  return requirePermission(interaction, PermissionFlagsBits.Administrator, "Administrator");
}

module.exports = {
  memberHas,
  requireManageMessages,
  requireAdministrator,
};
