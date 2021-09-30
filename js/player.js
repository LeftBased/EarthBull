/*!
 *  Howler.js Audio Player Demo
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

// Cache references to DOM elements.
var barWidth;
var elms = ['track', 'timer', 'duration', 'playBtn', 'pauseBtn', 'prevBtn', 'nextBtn', 'playlistBtn', 'volumeBtn', 'progress', 'bar', 'wave', 'loading', 'playlist', 'list', 'volume', 'barEmpty', 'barFull', 'sliderBtn'];
elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

/**
 * Player class containing the state of our playlist and where we are in it.
 * Includes all methods for playing, skipping, updating the display, etc.
 * @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
 */
var Player = function(playlist) {
  this.playlist = playlist;
  this.index = 0;

  // Display the title of the first track.
  track.innerHTML = '1. ' + playlist[0].title;
  // Setup the playlist display.
  playlist.forEach(function(song) {
    var div = document.createElement('div');
    div.className = 'list-song';
    div.innerHTML = song.title;
    div.onclick = function() {
      player.skipTo(playlist.indexOf(song));
    };
    list.appendChild(div);
  });
  sliderBtn.style.left = (screen.width / 16) + 'px';
};
Player.prototype = {
  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  play: function(index) {
    var self = this;
    var sound;

    index = typeof index === 'number' ? index : self.index;
    var data = self.playlist[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data.file],/* './audio/' + data.file + '.mp3' */
		
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: function() {
          // Display the duration.
          duration.innerHTML = self.formatTime(Math.round(sound.duration()));

          // Start updating the progress of the track.
          requestAnimationFrame(self.step.bind(self));

          // Start the wave animation if we have already loaded
          wave.container.style.display = 'block';
          bar.style.display = 'none';
          pauseBtn.style.display = 'block';
        },
        onload: function() {
          // Start the wave animation.
          wave.container.style.display = 'block';
          bar.style.display = 'none';
          loading.style.display = 'none';
        },
        onend: function() {
          // Stop the wave animation.
          wave.container.style.display = 'none';
          bar.style.display = 'block';
          self.skip('next');
        },
        onpause: function() {
          // Stop the wave animation.
          wave.container.style.display = 'none';
          bar.style.display = 'block';
        },
        onstop: function() {
          // Stop the wave animation.
          wave.container.style.display = 'none';
          bar.style.display = 'block';
        },
        onseek: function() {
          // Start updating the progress of the track.
          requestAnimationFrame(self.step.bind(self));
        }
      });
    }
    
    // Begin playing the sound.
	Howler.volume(0.25);
	
    sound.play();
    // Update the track display.
    track.innerHTML = (index + 1) + '. ' + data.title;

    // Show the pause button.
    if (sound.state() === 'loaded') {
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
    } else {
      loading.style.display = 'block';
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'none';
    }

    // Keep track of the index we are currently playing.
    self.index = index;
  },

  /**
   * Pause the currently playing track.
   */
  pause: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Puase the sound.
    sound.pause();

    // Show the play button.
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
  },

  /**
   * Skip to the next or previous track.
   * @param  {String} direction 'next' or 'prev'.
   */
  skip: function(direction) {
    var self = this;

    // Get the next track based on the direction of the track.
    var index = 0;
    if (direction === 'prev') {
      index = self.index - 1;
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.playlist.length) {
        index = 0;
      }
    }

    self.skipTo(index);
  },

  /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  skipTo: function(index) {
    var self = this;

    // Stop the current track.
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
    }

    // Reset progress.
    progress.style.width = '0%';

    // Play the new track.
    self.play(index);
  },

  /**
   * Set the volume and update the volume slider display.
   * @param  {Number} val Volume between 0 and 1.
   */
  volume: function(val) {
    var self = this;

    // Update the global volume (affecting all Howls).
    Howler.volume(val);

    // Update the display on the slider.
    barWidth = (val * 90) / 100;
    barFull.style.width = (barWidth * 100) + '%';
    sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25)+ 'px';
  },

  /**
   * Seek to a new position in the currently playing track.
   * @param  {Number} per Percentage through the song to skip.
   */
  seek: function(per) {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Convert the percent into a seek position.
    if (sound.playing()) {
      sound.seek(sound.duration() * per);
    }
  },

  /**
   * The step called within requestAnimationFrame to update the playback position.
   */
  step: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Determine our current seek position.
    var seek = sound.seek() || 0;
    timer.innerHTML = self.formatTime(Math.round(seek));
    progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

    // If the sound is still playing, continue stepping.
    if (sound.playing()) {
      requestAnimationFrame(self.step.bind(self));
    }
  },

  /**
   * Toggle the playlist display on/off.
   */
  togglePlaylist: function() {
    var self = this;
    var display = (playlist.style.display === 'block') ? 'none' : 'block';

    setTimeout(function() {
      playlist.style.display = display;
    }, (display === 'block') ? 0 : 500);
    playlist.className = (display === 'block') ? 'fadein' : 'fadeout';
  },

  /**
   * Toggle the volume display on/off.
   */
  toggleVolume: function() {
    var self = this;
    var display = (volume.style.display === 'block') ? 'none' : 'block';

    setTimeout(function() {
      volume.style.display = display;
    }, (display === 'block') ? 0 : 500);
    volume.className = (display === 'block') ? 'fadein' : 'fadeout';
  },

  /**
   * Format the time from seconds to M:SS.
   * @param  {Number} secs Seconds to format.
   * @return {String}      Formatted time.
   */
  formatTime: function(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
};

// Setup our new audio player class and pass it the playlist.
var player = new Player([
  {
	title: 'A Time To Be So Small by INTERPOL',
	file: 'https://files.catbox.moe/cq2mir.mp3',
	howl: null
  },
  {
	title: 'Kissing Families by Silversun Pickups',
	file: 'https://files.catbox.moe/5xveeq.mp3',
    howl: null
  },
  {
	title: 'Lesser Light by Dead When I Found Her',
	file: 'https://files.catbox.moe/5229sv.mp3',
	howl: null
  },
  {
	title: 'Kerosene by Crystal Castles',
	file: 'https://files.catbox.moe/ag1tx9.mp3',
	howl: null
  },
  {
	title: 'Destroy Everything You Touch by Ladytron',
	file: 'https://files.catbox.moe/wxnzmo.mp3',
	howl: null
  },
  {
	title: 'PDA by INTERPOL',
	file: 'https://files.catbox.moe/am598t.mp3',
	howl: null
  },
  {
	title: 'Tiger By My Side by Empire of the Sun',
	file: 'https://files.catbox.moe/s3ofvc.mp3',
	howl: null
  },
  {
	title: 'Terminally Chill by NEON INDIAN',
	file: 'https://files.catbox.moe/w08lad.mp3',
	howl: null
  },
  {
	title: 'Leif Erickson by INTERPOL',
	file: 'https://files.catbox.moe/ctidya.mp3',
	howl: null
  },
  {
	title: 'Helena Beat by FOSTER THE PEOPLE',
	file: 'https://files.catbox.moe/lqvzxk.mp3',
	howl: null
  },
  {
	title: 'Celestica by Crystal Castles',
	file: 'https://files.catbox.moe/ro4wts.mp3',
	howl: null
  },
  {
	title: 'Minerva by DEFTONES',
	file: 'https://files.catbox.moe/0mdhp7.mp3',
	howl: null
  },
  {
	title: 'Young Again by PAUL BANKS',
	file: 'https://files.catbox.moe/h8srdw.mp3',
	howl: null
  },
  {
	title: 'Lamb of God by Marilyn Manson',
	file: 'https://files.catbox.moe/1w8olh.mp3',
	howl: null
  },
  {
	title: 'Polish Girl by NEON INDIAN',
	file: 'https://files.catbox.moe/eyydjf.mp3',
	howl: null
  },
  {
	title: 'Narc by INTERPOL',
	file: 'https://files.catbox.moe/il9vdf.mp3',
	howl: null
  },
  {
	title: 'Through The Hosiery by CRYSTAL CASTLES',
	file: 'https://files.catbox.moe/5fm9yy.mp3',
	howl: null
  },
  {
	title: 'Slow Hands by INTERPOL',
	file: 'https://files.catbox.moe/56xsb0.mp3',
	howl: null
  },
  {
	title: 'Houdini by FOSTER THE PEOPLE',
	file: 'https://files.catbox.moe/gnp9zr.mp3',
	howl: null
  },
  {
	title: 'Outcast by INTERLACE',
	file: 'https://files.catbox.moe/kfkc6t.mp3',
	howl: null
  },
  {
	title: 'Curtains by DEAD WHEN I FOUND HER',
	file: 'https://files.catbox.moe/zj43a6.mp3',
	howl: null
  },
  {
	title: 'Song Seven by INTERPOL',
	file: 'https://files.catbox.moe/r7m5ma.mp3',
	howl: null
  },
  {
	title: 'Descent by FEAR FACTORY',
	file: 'https://files.catbox.moe/ussvp4.mp3',
    howl: null
  },
  {
	title: 'The Last Day on Earth by Marilyn Manson',
	file: 'https://files.catbox.moe/f0skdy.mp3',
	howl: null
  },
  { title: 'Deadbeat Summer by NEON INDIAN',
    file: 'https://files.catbox.moe/h7s1fx.mp3',
	howl: null
  },
  {
	title: 'Panic Switch by SILVERSUN PICKUPS',
	file: 'https://files.catbox.moe/rzuo0q.mp3',
	howl: null
  },
  {
	title: 'Parting of the Sensory by MODEST MOUSE',
	file: 'https://files.catbox.moe/9n7nq8.mp3',
	howl: null
  }
]);

// Bind our player controls.
playBtn.addEventListener('click', function() {
  player.play();
});
pauseBtn.addEventListener('click', function() {
  player.pause();
});
prevBtn.addEventListener('click', function() {
  player.skip('prev');
});
nextBtn.addEventListener('click', function() {
  player.skip('next');
});
waveform.addEventListener('click', function(event) {
  player.seek(event.clientX / window.innerWidth);
});
playlistBtn.addEventListener('click', function() {
  player.togglePlaylist();
});
playlist.addEventListener('click', function() {
  player.togglePlaylist();
});
volumeBtn.addEventListener('click', function() {
  player.toggleVolume();
});
volume.addEventListener('click', function() {
  player.toggleVolume();
});

// Setup the event listeners to enable dragging of volume slider.
barEmpty.addEventListener('click', function(event) {
  var per = event.layerX / parseFloat(barEmpty.scrollWidth);
  player.volume(per);
});
sliderBtn.addEventListener('mousedown', function() {
  window.sliderDown = true;
});
sliderBtn.addEventListener('touchstart', function() {
  window.sliderDown = true;
});
volume.addEventListener('mouseup', function() {
  window.sliderDown = false;
});
volume.addEventListener('touchend', function() {
  window.sliderDown = false;
});

var move = function(event) {
  if (window.sliderDown) {
    var x = event.clientX || event.touches[0].clientX;
    var startX = window.innerWidth * 0.05;
    var layerX = x - startX;
    var per = Math.min(1, Math.max(0, layerX / parseFloat(barEmpty.scrollWidth)));
    player.volume(per);
  }
};

volume.addEventListener('mousemove', move);
volume.addEventListener('touchmove', move);

// Setup the "waveform" animation.
var wave = new SiriWave({
  container: waveform,
  width: window.innerWidth,
  height: window.innerHeight * 0.3,
  cover: true,
  speed: 0.03,
  amplitude: 0.7,
  frequency: 2
});
wave.start();

// Update the height of the wave animation.
// These are basically some hacks to get SiriWave.js to do what we want.
var resize = function() {
  var height = window.innerHeight * 0.3;
  var width = window.innerWidth;
  wave.height = height;
  wave.height_2 = height / 2;
  wave.MAX = wave.height_2 - 4;
  wave.width = width;
  wave.width_2 = width / 2;
  wave.width_4 = width / 4;
  wave.canvas.height = height;
  wave.canvas.width = width;
  wave.container.style.margin = -(height / 2) + 'px auto';

  // Update the position of the slider.
  var sound = player.playlist[player.index].howl;
  if (sound) {
    var vol = sound.volume();
    barWidth = (vol * 0.9);
    sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
  }
};
window.addEventListener('resize', resize);
resize();