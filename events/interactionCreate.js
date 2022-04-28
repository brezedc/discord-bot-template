module.exports = (client, interaction) => {
  if (!interaction.guild) return;

  if (interaction.isCommand() || interaction.isContextMenu()) {
    const cmd = client.slashcommands.get(interaction.commandName);
    if (!cmd) {
      return;
    }

    cmd.run(require("discord.js"), client, interaction);
  }
};
