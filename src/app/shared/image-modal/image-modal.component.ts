import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss'
})
export class ImageModalComponent{
  @Input() modalHeader: String = 'Modal Header';
  @Input() imgUrl!: String;
  @Output() closeModel = new EventEmitter<boolean>()

  constructor(){

  }

  closeModelAction(){
    this.closeModel.emit(false);
  }

}
