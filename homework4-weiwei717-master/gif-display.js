// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
//
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(containerElement, imgURL)
  {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.forward = containerElement.querySelector(".gif.forward");
    this.backward = containerElement.querySelector(".gif.backward");
    this.imgURL = imgURL;
    this.status = false;
    this.load(0);

    this.onkick = this.onkick.bind(this);

    document.addEventListener("kick", this.onkick);
  }
  // TODO(you): Add methods as necessary.
  load(index)
  {
    if(index < this.imgURL.length)
    {
      const image = new Image();
      image.addEventListener("load", () => {
        index++;
        console.log(index);
        this.load(index);
      });
      image.src = this.imgURL[index];
    }
    else
    {
      document.dispatchEvent(new CustomEvent("loaded"));
      this.randomGif(this.forward);
      this.randomGif(this.backward);
    }
  }
  randomGif(containerElement)
  {
    if(this.forward === containerElement)
    {
      containerElement.style.backgroundImage = 'url(' + this.imgURL[this.imgURL.length-1] + ')';
    }
    else
    {
      const index = Math.floor(Math.random() * this.imgURL.length-1);
      containerElement.style.backgroundImage = 'url(' + this.imgURL[index] + ')';
    }
  }
  onkick()
  {
    if(this.status)
    {
      this.status = false;
      this.randomGif(this.backward);
    }
    else
    {
      this.status = true;
    }
    this.containerElement.classList.toggle('show');
  }
}
