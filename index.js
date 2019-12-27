require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, (...args) => eventHandler(client, ...args))
  })
})




client.on('ready', () => {
    var generalChannel = client.channels.get("655284700499279874") // Replace with known channel ID
    generalChannel.send("Bork!")  
})

client.on('message', msg => {
  if (msg.content === 'Heya') {
    msg.reply('Hewwo ^w^')
  }
})


client.on('ready', () => {
    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity("with bubbles")

    // Alternatively, you can set the activity to any of the following:
    // PLAYING, STREAMING, LISTENING, WATCHING
    // For example:
    // client.user.setActivity("TV", {type: "WATCHING"})
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("%")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("I don't understand the command. Try `%help` or `%multiply`, and give me some sushi.")
    }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("what is " + arguments)
    } else {
        receivedMessage.channel.send("A list of commands is as follows, mwaster!: %help, %multiply, %kick , Heya")
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("do i look like i understand that?")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("It's gwonna be " + product.toString())
}

client.on('message', msg => {
  if (msg.content === 'bubbles') {
   //var generalChannel = client.channels.get("526677269360410646") // Replace with known channel ID
    // Provide a path to a local file
    const localFileAttachment = new Discord.Attachment('C:\\Users\\lloyd\\Pictures\\72223576_956441678069177_7246411804402786941_n.jpg')
    msg.channel.send(localFileAttachment)
	msg.channel.send('Bubbles!? Where?!')
  }
})



client.login(process.env.BOT_TOKEN)