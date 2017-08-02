const videoScale = '460:320'


// Child Process //
var child = require('child_process');
var cmd = 'ffplay'
var args = [
  '-f', 'avfoundation',
  '-i', '0',
  '-vf', 'scale=' + videoScale
]
var player = child.spawn(cmd, args, {stdio: 'ignore', detached: true});
player.on('exit', function (code) {
  console.log('Exit the process')
    process.exit();
});


// keyboard handler
var keypress = require('keypress');


// list
var List = require('term-list');
var exec = require('child_process').exec;

var list = new List({ marker: '\033[36m› \033[0m', markerLength: 2 });
list.add('http://google.com', 'Google');
list.add('http://yahoo.com', 'Yahoo');
list.add('http://cloudup.com', 'Cloudup');
list.add('http://github.com', 'Github');
list.start();

list.on('keypress', function(key, item){
  switch (key.name) {
    case 'return':
      child.spawn(cmd, args, {stdio: 'ignore', detached: true});
      // exec('open ' + item);
      list.stop();
      console.log('opening %s', item);
      break;
    case 'backspace':
      list.remove(list.selected);
      break;
  }
});

list.on('empty', function(){
  list.stop();
});
