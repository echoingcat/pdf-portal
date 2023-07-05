import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EventService } from 'src/app/event-service.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cleared = false;
  reduced = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.removeActive();
        if (this.router.url === '/upload') {
          this.setActiveNav(3);
        } else if (this.router.url === '/search') {
          this.setActiveNav(2);
        } else if (this.router.url === '/profile') {
          this.setActiveNav(4);
        } else if (this.router.url === '/all') {
          this.setActiveNav(1);
        } else {
          this.setActiveNav(0);
        }
      }
    });
  }

  previousScrollPosition = 0;

  /*@HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if ((currentScrollPosition > this.previousScrollPosition) && (currentScrollPosition > 70)) {
      this.onScrollDown();
    } else {
      this.onScrollUp();
    }
    this.previousScrollPosition = currentScrollPosition;
  }*/

  onScrollDown() {
    this.hideNav();
  }

  onScrollUp() {
    this.showNav();
  }

  hideNav() {
    const navItems = document.getElementsByClassName('navItem')
    for (let i = 0; i < navItems.length; i++) {
      setTimeout(function(){navItems[i].classList.add('navItemHidden');}, i*40)
    }
    //setTimeout(function(){document.getElementById('header')?.classList.add('headerHidden');}, 0)
  }

  showNav() {
    const navItems = document.getElementsByClassName('navItem')
    for (let i = 0; i < navItems.length; i++) {
      setTimeout(function(){navItems[i].classList.remove('navItemHidden');}, i*40)
    }
    //setTimeout(function(){document.getElementById('header')?.classList.remove('headerHidden');}, 0)
  }

  setActiveNav(id: number) {
    const navItems = document.getElementsByClassName('navItem')
    this.removeActive();
    navItems[id].classList.add('navItemSelected');
  }

  removeActive() {
    const navItems = document.getElementsByClassName('navItem')
    for (let i = 0; i < navItems.length; i++) {
      navItems[i].classList.remove('navItemSelected');
    }
  }

  clear() {
    document.getElementsByClassName('nav')[0].classList.add('hidden');
    this.cleared = true;
  }

  unclear() {
    document.getElementsByClassName('nav')[0].classList.remove('hidden');
    this.cleared = false;
  }

  reduce() {  
    setTimeout(this.clear, 1);
    setTimeout(function(){ document.getElementById('header')?.classList.add('headerCompact');}, 200)
    this.cleared = true;
    this.reduced = true;
  }

  expand() {
    setTimeout(function(){ document.getElementById('header')?.classList.remove('headerCompact');}, 1)
    setTimeout(this.unclear, 200)
    this.cleared = false;
    this.reduced = false;
  }

  expandClear() {
    setTimeout(function(){ document.getElementById('header')?.classList.remove('headerCompact');}, 1)
    this.reduced = false;
    setTimeout(this.unclear, 2300)
    this.cleared = false;
  }

  test() {
    this.clear();
    this.reduce();
  }

  ngOnInit() {
    this.eventService.reduceEvent$.subscribe(() => {
      this.reduce();
    });
    this.eventService.expandEvent$.subscribe(() => {
      this.expand();
    });
    this.eventService.expandClearEvent$.subscribe(() => {
      this.expandClear();
    });
    /*this.eventService.unclearEvent$.subscribe(() => {
      this.unclear();
    });*/
  }

}
