const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('communicate')
		.setDescription('Receive communication with Super Earth')
        .addStringOption(option =>
            option.setName('message')
            .setDescription('The message you would like to send to Super Earth')
            .setRequired(true)),
	async execute(interaction) {
        await interaction.reply('Receiving message from Super Earth high command...');

        const message = interaction.options.getString('message');
        try {
            const response = await fetch('http://localhost:8080/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userMessage: message })
                // body: JSON.stringify({
                //     // model: "gpt-3.5-turbo",
                //     // model: "mistral-7b-openorca",
                //     userMessage: message,
                //     // temp: 0.6
                // }),
            })
            // .then(response => response.json())
            // .then(data => console.log(data))
            // .catch(error => console.error('Error:', error));
            const responseData = await response.json();
            const messageContent = responseData.content;

            await interaction.editReply(messageContent);
            // await interaction.editReply(await response.json());
        } catch (error) {
            console.error('Error:', error);
            await interaction.editReply('Failed to receive message from Super Earth. Please try again later.');
        }

        // const responseData = await response.json();
        // const messageContent = responseData.content;

        // await interaction.editReply(messageContent);
        // await interaction.editReply(await response.json());
	},
};