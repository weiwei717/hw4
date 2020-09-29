// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App
{
  constructor()
  {
    // TODO(you): Implement the constructor and add fields as necessary.
    const menu = document.querySelector("#menu");
    this.menuScreen = new MenuScreen(menu);

    const music = document.querySelector("#music");
    this.musicScreen = new MusicScreen(music);
  }
  // TODO(you): Add methods as necessary.
}
