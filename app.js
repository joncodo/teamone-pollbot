var api = require('./lib/botApi.js');

var config = {
  apiKey: process.env.botToken || require('./config.json').botToken,
  orgId: process.env.botToken || require('./config.json').orgId
};

var currentAnswer = 2;
var questionAsked = false;

var polls = [];

function getMathQuestion () {
  var number1 = Math.floor(Math.random()*1000 + 100);
  var number2 = Math.floor(Math.random()*1000 + 100);
  currentAnswer = number1 + number2;
  return 'What is ' + number1 + ' + ' + number2 + '?';
}

api.incomingMessage = function incomingMessage (message, user) {
  console.log('The incoming message', message, user);

  if(message.match(/help/)){
    api.reply(`
      You can set up a poll by responding with something like this:

      "poll: Where are we going for lunch? mcDonalds, burgerKing, wendys"
      `);
  } else if(message.match(/poll:/)){
    // sanitize the string into an array
    var question = message.trim().match(/poll: (.*\?)/)[1];
    var answers = message.trim().match(/\?(.*)/)[1];
    console.log(answers.split(' '));
    var choices = [];
    answers.split(',').forEach(function(item) {
      if(item != ''){
        choices.push({name: item.trim(), count: 0});
      }
    });

    polls.push({question: question, choices: choices, workspaceId: user.workspaceId});

    var reply = '@all ' + question + '\n';
    choices.forEach(function(answer, index) {
      reply += index + '. ' + answer.name + '\n';
    });

    api.reply(reply);

  } else {

    var currentPoll;
    polls.forEach(function(poll) {
      if(poll.workspaceId == user.workspaceId){
        currentPoll = poll;
      }
    })

    currentPoll.choices.forEach(function(choice) {
      if(message.match('\\b' + choice.name + '\\b')){
        choice.count += 1;
      }
    });

    var reply = currentPoll.question + '\n';
    currentPoll.choices.forEach(function(choice, index) {
      reply += index + '. ' + choice.name + ' - ' + choice.count +'\n';
    });

    api.reply(reply);
  }
}

api.launchBot(config);
