import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProjectComponent } from './home-project.component';

describe('HomeProjectComponent', () => {
  let component: HomeProjectComponent;
  let fixture: ComponentFixture<HomeProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
