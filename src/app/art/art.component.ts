import { Component } from '@angular/core';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.scss']
})
export class ArtComponent {
  landscapes = ["2012_dec.JPG", "2012_nov.JPG", "iceland1.jpg", "iceland2.jpg", "iceland3.JPG", "iceland4.JPG"]
  portraitLandscapes = ["venice_cube.jpg", "morroco.jpg"]
  portraits = ["study.jpeg","melancholy.jpg","still.jpg", "oilpainting1.jpg"]
  abstracts = ["insomnia.jpg", "flow.jpeg"]
}
