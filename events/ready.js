const { devMode, guildid } = require("../config.json");

module.exports = async (client) => {
  client.user.setPresence({
    activities: [{ name: "Status" }],
    status: "online",
  });

  if (devMode) {
    let guild = client.guilds.cache.get(guildid);
    await guild.commands.set(client.rawSlashCommands).then((cmd) => {
      const getRoles = (commandName) => {
        const permissions = client.rawSlashCommands.find(
          (x) => x.name === commandName
        ).userPermissions;

        if (!permissions) return null;
        return guild.roles.cache.filter(
          (x) => x.permissions.has(permissions) && !x.managed
        );
      };

      const fullPermissions = cmd.reduce((accumulator, x) => {
        const roles = getRoles(x.name);
        if (!roles) return accumulator;

        const permissions = roles.reduce((a, v) => {
          return [
            ...a,
            {
              id: v.id,
              type: "ROLE",
              permission: true,
            },
          ];
        }, []);

        return [
          ...accumulator,
          {
            id: x.id,
            permissions,
          },
        ];
      }, []);

      guild.commands.permissions.set({ fullPermissions });
      console.log("[DEV-MODE] Successfully refreshed application (/) application");
    });
  } else {
    console.log("Started refreshing application (/) commands.");
    await client.application.commands.set(client.rawSlashCommands);
    console.log("Successfully refreshed application (/) application");
  }
};
