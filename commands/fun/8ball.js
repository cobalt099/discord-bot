const { SlashCommandBuilder } = require("discord.js");

const ANSWERS = [
  "Yes, definitely.",
  "No doubt about it.",
  "You may rely on it.",
  "Ask again later.",
  "Cannot predict now.",
  "Don't count on it.",
  "My sources say no.",
  "Very doubtful.",
  "Outlook good.",
  "Signs point to yes.",
];

module.exports = {
  category: "Fun",
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask the magic 8-ball a question")
    .addStringOption((option) =>
      option.setName("question").setDescription("Your question").setRequired(true)
    ),

  async execute(interaction) {
    const question = interaction.options.getString("question", true);
    const answer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];

    await interaction.reply(`🎱 **Question:** ${question}\n**Answer:** ${answer}`);
  },
};
