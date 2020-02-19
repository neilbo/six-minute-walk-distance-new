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
      alt: `Woman having blood pressure monitor`,
      title: `6MWD`,
      subTitle: `Predicted Distance calculator for Clinicians built by a Clinician.`
    },
    {
      img: `/assets/img/slide--who-is-this-for.png`,
      alt: `Anatomy models of Heart and Lungs`,
      title: `Who is 6MWD for?`,
      subTitle: `You do a lot of six minute walk
      tests (6MWT) for Cardiac or Pulmonary Rehabilitation .`
    },
    {
      img: `/assets/img/slide--metric-imperial.png`,
      alt: `3 differnt types of rulers`,
      title: `Centimetres and Feet-Inch friendly`,
      subTitle: `Whether you use the Metric or Imperial system. We've got you covered.`
    },
    {
      img: `/assets/img/slide--easy-calculation.png`,
      alt: `person sitting while using laptop computer and green stethoscope near`,
      title: `Easy calculation`,
      subTitle: `Just add height, weight, age and gender then copy the predicted
      distance to your clipboard`
    }
  ];
  atBeginning: boolean;
  ngOnInit() {}

  async ngAfterViewInit() {
    await this.getActiveIndex();
    if (this.activeIndex === 0) {
      this.atBeginning = true;
    } else {
      this.atBeginning = false;
    }
  }

  async onSlideChanged() {
    await this.getActiveIndex();
    if (this.activeIndex === 0) {
      this.atBeginning = true;
    } else {
      this.atBeginning = false;
    }
  }

  async getActiveIndex(): Promise<void> {
    const activeIndex: number = await this.welcomeSlides
      .getActiveIndex()
      .then((index: number) => {
        return index;
      });
    this.activeIndex = activeIndex;
  }

  getStarted(): void {
    this.router.navigateByUrl("/predicted-distance");
  }

  next(): void {
    if (this.activeIndex === 3) {
      this.getStarted();
    } else {
      this.welcomeSlides.slideNext();
    }
  }

  back(): void {
    this.welcomeSlides.slidePrev();
  }
}
