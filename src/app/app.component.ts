import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgxMasonryComponent } from 'ngx-masonry';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('masonry', { read: NgxMasonryComponent })
  masonry: NgxMasonryComponent;
  emptyItem;
  public items: Array<any> = [
    { item: 1, size: 'normal' },
    { item: 2, size: 'normal' },
    { item: 3, size: 'normal' },
    { item: 4, size: 'full' },
    { item: 5, size: 'normal' },
    { item: 6, size: 'normal' },
    { item: 7, size: 'normal' },
    { item: 8, size: 'normal' },
    { item: 9, size: 'normal' },
    { item: 10, size: 'normal' },
    { item: 11, size: 'normal' },
  ];
  masonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    horizontalOrder: true,
    transitionDuration: '0.8s',
    stagger: 500,
  };
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.masonry.reloadItems();
    this.masonry.layout();
  }
  add() {
    this.items.push({ item: this.items.length + 1, size: 'normal' });
  }

  shuffle() {
    this.items.sort(function () {
      return 0.5 - Math.random();
    });
    this.masonry.reloadItems();
    this.masonry.layout();
  }
  onDropped(e: CdkDragDrop<any>) {
    const dragItem = e.item;
    const dragItemSourceDropList = e.item.dropContainer;
    const dropItem = e.container.getSortedItems()[0];
    const dropList = e.container;
    this.items = this.swapItemsInArray(
      this.items,
      dragItem.data,
      dropList.data
    );
    console.log(this.items);
    this.masonry.reloadItems();
    this.masonry.layout();
  }
  dragEntered(e: CdkDragEnter<number>) {
    // const dragItem = e.item;
    // const dragItemSourceDropList = e.item.dropContainer;
    // const dragIndex = e.item.data;
    // const dropItem = e.container.getSortedItems()[0];
    // const dropList = e.container;
    // const dropIndex = e.container.data;
    // const dropListElement = dropList.element.nativeElement;
    // const dropItemElement = dropItem.element.nativeElement;
    // const dragItemSourceDropListElement =
    //   dragItemSourceDropList.element.nativeElement;
    // dropListElement.removeChild(dropItemElement);
    // dragItemSourceDropListElement.appendChild(dropItemElement);
  }
  swapItemsInArray(arr, firstItem, secondItem): any[] {
    const firstIndex = arr.findIndex((a) => a === firstItem);
    const secondIndex = arr.findIndex((a) => a === secondItem);
    const first = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = first;
    return arr;
  }
}
