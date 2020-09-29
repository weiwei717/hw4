// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen
{
  constructor(containerElement)
  {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.selectContainer = containerElement.querySelector('#song-selector');
    this.inputContainer = containerElement.querySelector('#query-input');
    this.formContainer = containerElement.querySelector('form');
    this.errorElement = containerElement.querySelector("#error");
    this.song = {};
    this.load();

    this.randomsubject();
    this.onsubmit();

    this.hide = this.hide.bind(this);

    document.addEventListener("menuhide", this.hide);
    this.inputContainer.addEventListener('keydown', () => {
      this.errorElement.classList.add('inactive');
    });
  }
  // TODO(you): Add methods as necessary.
  hide()
  {
    this.containerElement.classList.add('inactive');
  }
  load()
  {
    function onJsonReady(json)
    {
      this.song = json;
      //console.log(this.song);
      this.create();
    }
    function onResponse(response)
    {
      return response.json();
    }
    fetch('https://fullstackccu.github.io/homeworks/hw4/songs.json')
      .then(onResponse.bind(this))
      .then(onJsonReady.bind(this));
  }
  create()
  {
    const SONG = Object.values(this.song);
    for(let i=0; i<SONG.length; i++)
    {
      const title = SONG[i].artist + ': ' + SONG[i].title;
      this.selectContainer.options.add(new Option(title, SONG[i].songUrl));
    }
  }
  randomsubject()
  {
    const THEME = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
    const index = Math.floor(Math.random() * THEME.length);
    this.inputContainer.value = THEME[index];
  }
  onsubmit()
  {
    this.formContainer.addEventListener('submit', event => {
      event.preventDefault();
      document.dispatchEvent(new CustomEvent("fetchgif", {
        detail: {
          song: this.selectContainer.options[this.selectContainer.selectedIndex].value,
          gif: this.inputContainer.value
        }
      }));
    });
  }
}
