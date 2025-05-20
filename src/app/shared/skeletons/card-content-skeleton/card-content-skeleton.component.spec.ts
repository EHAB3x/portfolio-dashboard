import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContentSkeletonComponent } from './card-content-skeleton.component';

describe('CardContentSkeletonComponent', () => {
  let component: CardContentSkeletonComponent;
  let fixture: ComponentFixture<CardContentSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardContentSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardContentSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
