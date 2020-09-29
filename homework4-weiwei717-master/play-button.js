// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton
{
  constructor(containerElement)
  {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    containerElement.addEventListener('click', () => {
      containerElement.classList.toggle('pause');
      document.dispatchEvent(new CustomEvent("status"));
    });
  }
  // TODO(you): Add methods as necessary.
}
