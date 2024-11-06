import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListingComponent } from './post-listing.component';

describe('PostListingComponent', () => {
  let component: PostListingComponent;
  let fixture: ComponentFixture<PostListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostListingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
