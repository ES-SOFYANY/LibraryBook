import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HeaderPageComponent } from './header-page.component';
import {RouterLinkStubDirective} from './router-stubs'
import { BookService} from '../common/books.service';

describe('HeaderPageComponent', () => {
  let component: HeaderPageComponent;
  let fixture: ComponentFixture<HeaderPageComponent>;
  let componentHTML;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPageComponent, RouterLinkStubDirective],
      imports: [FormsModule],
      providers: [BookService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPageComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.debugElement;
    fixture.detectChanges();
  });

  it('SerachInput should be epmty  at the instantiation of component ', () => {
    expect(componentHTML.query(By.css('#SerachInput')).nativeElement.value.length).toEqual(0)
  });

  it('SerachInput should equale to "Exemple" ', fakeAsync(() => {
    component.search = "Exemple";
    fixture.detectChanges();
    tick();
    expect(componentHTML.query(By.css('#SerachInput')).nativeElement.value).toEqual('Exemple')
  }));

  it('should bind searchInput property to the displayed value', fakeAsync(() => {
    fixture.detectChanges();
    const inputEl = componentHTML.query(By.css('#SerachInput'));
    inputEl.nativeElement.value = 'abc';
    let event = new Event('input');
    inputEl.nativeElement.dispatchEvent(event);
    tick();
    expect(component.search).toEqual('abc');
  }));
});
