module.exports = {
    name: "calculator",
    desc: "calculator",
    example: "!calculator",
    alias: ["cal","calc"],
    run: (client, message, args) => {
        const { Calculator } = require("weky");
        await Calculator({
            message: message,
            embed: {
                title: 'Calculator | test',
                color: '#5865F2',
                footer: '©️ FPG',
                timestamp: true
            },
            disabledQuery: 'Calculator is disabled!',
            invalidQuery: 'The provided equation is invalid!',
            othersMessage: 'Only <@{{author}}> can use the buttons!'
        });
    }
};
