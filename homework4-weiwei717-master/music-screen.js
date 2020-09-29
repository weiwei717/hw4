// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen
{
  constructor(containerElement)
  {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.gifElement = containerElement.querySelector("#gif");
    this.loadElement = document.querySelector("#loading");
    this.errorElement = document.querySelector("#error");
    this.playElement = containerElement.querySelector("#play");
    this.audioPlayer = null;
    this.gifDisplay = null;
    this.playButton = new PlayButton(this.playElement);
    this.status = false;

    this.fetch_gif = this.fetch_gif.bind(this);
    this.loaded = this.loaded.bind(this);
    this.changestatus = this.changestatus.bind(this);

    document.addEventListener("fetchgif", this.fetch_gif);
    document.addEventListener("loaded", this.loaded);
    document.addEventListener("status", this.changestatus);
  }
  // TODO(you): Add methods as necessary.
  fetch_gif(event)
  {
    this.loadElement.classList.remove('inactive');
    const URL = "https://api.giphy.com/v1/gifs/search?q=" + encodeURIComponent(event.detail.gif) + "&api_key=EwMpPNWxFyPt5OJEwp9ynclDvaag2LwV&limit=25&rating=g";
    const onJsonReady = (json) => {
      let imgURL = [];
      if(json.data.length > 2)
      {
        for(let index in json.data)
        {
          const imgurl = json.data[index].images.downsized.url;
          imgURL.push(imgurl);
        }
        this.errorElement.classList.add('inactive');
        document.dispatchEvent(new CustomEvent("menuhide"));
        this.load(imgURL, event.detail.song);
      }
      else
      {
        this.errorElement.classList.remove('inactive');
      }
    };

    fetch(URL)
      .then(response => response.json())
      .then(onJsonReady);
  }
  load(imgURL, songURL)
  {
    this.gifDisplay = new GifDisplay(this.gifElement, imgURL);
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.setSong(songURL);
    this.audioPlayer.setKickCallback( () => {
      document.dispatchEvent(new CustomEvent("kick"));
    });
  }
  loaded()
  {
    this.loadElement.classList.add('inactive');
    this.containerElement.classList.remove('inactive');
  }
  changestatus()
  {
    if(this.status)
    {
      this.status = false;
      this.audioPlayer.pause();
    }
    else
    {
      this.status = true;
      this.audioPlayer.play();
    }
  }
}
