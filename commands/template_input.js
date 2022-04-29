module.exports = {
    name: "test_input",
    type: 1,
    desc: "Example command of user input",
    options: [
        {
            name: "inputted_value",
            description: "Value",
            type: 3,
            // Type of input can be found here
            // https://canary.discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
            required: true,
            choices: [
                {
                    name: "Dog",
                    value: "random dog or something",
                },
                {
                    name: "Cat",
                    value: "random cat or something"
                },
            ]
        },
    ],
    run: async (Client, discord, interaction) => {
        var { value } = interaction.options.get("inputted_value")
        interaction.reply(`You picked ${value}`)
    }
}