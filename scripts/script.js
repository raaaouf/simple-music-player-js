new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
           name: "COEUR EN MIETTES",
          artist: "Damso",
          cover: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/img/20.jpg",
          source: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/mp3/2.mp3",
          url: "https://www.youtube.com/watch?v=1-jQo31__JQ",
          favorited: true
        },
        {
          name: "Brille",
          artist: "La Sain Ft Blanco",
          cover: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/img/22.jpg",
          source: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=1-jQo31__JQ",
          favorited: false
        },
        {
          
          name: "Video Games",
          artist: "Lana Del Rey",
          cover: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/img/13.jpg",
          source: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/mp3/3.mp3",
          url: "https://www.youtube.com/watch?v=cE6wxDqdOV0",
          favorited: true
        },
        
        {
          name: "Let Me Love You Like A Woman",
          artist: "Lana Del Rey",
          cover: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/img/2.jpg",
          source: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=Nj9QqP-ce4E",
          favorited: false
        },
        
        {
          name: "Humane",
          artist: "Rag'n'Bone Man",
          cover: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/img/9.jpg",
          source: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
          favorited: false
        },
        {
          name: "Killing me softy",
          artist: "Franck Sinatra",
          cover: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/img/8.jpg",
          source: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=8tbP3f3i03E",
          favorited: false
        },

        {
          name: "Butterflies",
          artist: "Sia",
          cover: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/img/23.jpg",
          source: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/mp3/4.mp3",
          url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
          favorited: false
        },

        {
          name: "Genius ft. Sia, Diplo, Labrinth",
          artist: "LSD",
          cover: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/img/6.jpg",
          source: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/mp3/6.mp3",
          url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
          favorited: false
        },
        {
          name: "The Comeback Kid",
          artist: "Lindi Ortega",
          cover: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/img/5.jpg",
          source: "https://raw.githubusercontent.com/raaaouf/simple-player-js/master/mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
          favorited: true
        },

      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };


  }
});
