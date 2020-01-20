import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  title: string = `Welcome`;
  @ViewChild("welcomeSlides", { static: false }) welcomeSlides: IonSlides;
  activeIndex: number;
  constructor(public router: Router) {}
  slides: any = [
    {
      img: `/assets/img/slide--6mwd.png`,
      title: `6MWD`,
      subTitle: `Predicted Distance calculator for Clinicians built by a Clinician.`
    },
    {
      img: `/assets/img/slide--who-is-this-for.png`,
      title: `Who is 6MWD for?`,
      subTitle: `You do a lot of six minute walk
      tests (6MWT) for Cardiac or Pulmonary Rehabilitation .`
    },
    {
      img: `/assets/img/slide--metric-imperial.png`,
      title: `Centimetres and Feet-Inch friendly`,
      subTitle: `Whether you use the Metric or Imperial system. We've got you covered.`
    },
    {
      img: `/assets/img/slide--easy-calculation.png`,
      title: `Easy calculation`,
      subTitle: `Just add height, weight, age and gender then copy the predicted
      distance to your clipboard`
    }
  ];
  ngOnInit() {}

  async onSlideChanged(): Promise<void> {
    await this.getActiveIndex();
    console.log(this.getActiveIndex());
  }

  async getActiveIndex(): Promise<void> {
    const activeIndex: number = await this.welcomeSlides
      .getActiveIndex()
      .then((index: number) => {
        return index;
      });
    this.activeIndex = activeIndex;
  }
  getStarted() {
    this.router.navigateByUrl("/predicted-distance");
  }
  next() {
    this.welcomeSlides.slideNext();
  }
  back() {
    this.welcomeSlides.slidePrev();
  }
}
