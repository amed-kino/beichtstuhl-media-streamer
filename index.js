const videoScale = '460:320'


// Child Process //
var child = require('child_process');
var terminate = require('terminate');
var cmd = 'mplayer'
var args = [
  '-fs', 'tv://',
  '-tv', 'driver=v4l2:device=/dev/video0',
  '-xineramascreen', 1
]

// keyboard handler
var keypress = require('keypress');


// list
var List = require('term-list');
var exec = require('child_process').exec;
currentProcess = null;
var list = new List({ marker: '\033[36m› \033[0m', markerLength: 2 });

function closeProcess (handler) {
  terminate(handler.pid, function(err, done){
    if(err) {
      console.log(err.toString());
    } else {
      console.log('Done!');
    }
    console.log('.')
  });
}

list.add('1', 'Google');
list.add('30', 'Yahoo');
list.add('20', 'Cloudup');
list.add('160', 'Github');
list.start();

list.on('keypress', function(key, item){
  switch (key.name) {
    case 'return':
      if (currentProcess) {
        closeProcess(currentProcess)
      }
      var player = child.spawn(cmd, args.concat(['-vf', 'hue=' + item]), {stdio: 'ignore', detached: true});
      currentProcess = player
      break;
    case 'backspace':
      list.remove(list.selected);
      break;
  }
});

list.on('empty', function(){
  list.stop();
});
