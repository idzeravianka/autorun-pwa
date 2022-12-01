import { Directive, HostListener, Input, Self } from '@angular/core';
import { RouterLink, Router, UrlTree } from '@angular/router';

@Directive({
  selector: '[routerToggle]',
})
export class RouterToggleDirective {
  private readonly originalOnClick: () => boolean;
  private commands: any[] = [];

  constructor(@Self() private routerLink: RouterLink,
              private router: Router) {

    this.originalOnClick = this.routerLink.onClick;
    this.routerLink.onClick = () => true;
  }

  @Input() public set routerToggle(commands: any[] | string) {
    if (commands != null) {
      this.commands = Array.isArray(commands) ? commands : [commands];
    } else {
      this.commands = [];
    }
  }

  @HostListener('click') public onClick() {
    if (this.router.isActive(this.routerLink.urlTree as UrlTree, true)) {
      this.router.navigate(this.commands);

    } else {
      // Call the `originalOnClick` method within its original `routerLink` conext.
      this.originalOnClick.call(this.routerLink);
    }
  }
}
