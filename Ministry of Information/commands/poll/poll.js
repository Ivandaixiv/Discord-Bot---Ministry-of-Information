const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Creates a question')
        .addStringOption(option =>
            option.setName('title')
            .setDescription('The title to use for the question')
            .setRequired(true) ),
	async execute(interaction) {
        const title = interaction.options.getString('title');
        const questionString = `Question: ${title}\nTo vote, select ✅ for yes and ❌ for no`;
        const question = await interaction.reply({content: questionString, fetchReply: true});
        question.react('✅');
        question.react('❌');
	},
};