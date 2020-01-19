import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides, IonContent } from "@ionic/angular";

@Component({
  selector: 'app-predicted-distance',
  templateUrl: './predicted-distance.page.html',
  styleUrls: ['./predicted-distance.page.scss'],
})
export class PredictedDistancePage implements OnInit {

  title: string = `Predicted Distance`;
  @ViewChild("measurementSlides", { static: false }) slides: IonSlides;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  measurementType: string = "metric";
  slideList: string[] = ["metric", "imperial"];
  activeIndex: number;

  constructor() {}

  ngOnInit() {}

  async onSlideChanged(): Promise<void> {
    await this.getActiveIndex();
    this.measurementType = this.slideList[this.activeIndex];
    this.content.scrollToTop();
  }

  async getActiveIndex(): Promise<void> {
    const activeIndex: number = await this.slides
      .getActiveIndex()
      .then(index => {
        return index;
      });
    this.activeIndex = activeIndex;
  }

  segmentChanged(segmentButton: CustomEvent): void {
    this.slides.slideTo(this.slideList.indexOf(segmentButton.detail.value));
    this.content.scrollToTop();
  }
}
