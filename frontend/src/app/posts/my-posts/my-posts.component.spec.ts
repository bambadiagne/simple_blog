import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostsComponent } from './my-posts.component';

describe('UserPostsComponent', () => {
  let component: UserPostsComponent;
  let fixture: ComponentFixture<UserPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPostsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
