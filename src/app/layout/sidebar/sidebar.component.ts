import { Router, NavigationEnd } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { RouteInfo } from "./sidebar.metadata";
import {
	Component,
	Inject,
	ElementRef,
	OnInit,
	Renderer2,
	HostListener,
	OnDestroy,
} from "@angular/core";
import { AuthService } from 'src/app/authentication/core/services/auth.service'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from 'src/app/authentication/core/states/auth.states';
import * as AuthActions from 'src/app/authentication/core/states/login/auth.actions';

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.sass"],
})
export class SidebarComponent implements OnInit, OnDestroy {
	public sidebarItems: any[];
	level1Menu = "";
	level2Menu = "";
	level3Menu = "";
	public innerHeight: any;
	public bodyTag: any;
	listMaxHeight: string;
	listMaxWidth: string;
	userFullName: string;
	userImg: string;
	userType: string;
	headerHeight = 60;
	currentRoute: string;
	routerObj = null;

	getState: Observable<any>;
	constructor(
		@Inject(DOCUMENT) private document: Document,
		private renderer: Renderer2,
		public elementRef: ElementRef,
		private authService: AuthService,
		private router: Router,
		private store: Store<fromApp.PublicAppState>
	) {
		const body = this.elementRef.nativeElement.closest("body");
		this.getState = this.store.select('auth');
		this.routerObj = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const currenturl = event.url.split("?")[0];
				const firstString = currenturl.split("/").slice(1)[0];
				this.renderer.removeClass(this.document.body, "overlay-open");
			}
		});
	}
	@HostListener("window:resize", ["$event"])
	windowResizecall(event) {
		this.setMenuHeight();
		this.checkStatuForResize(false);
	}
	@HostListener("document:mousedown", ["$event"])
	onGlobalClick(event): void {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.renderer.removeClass(this.document.body, "overlay-open");
		}
	}
	callLevel1Toggle(event: any, element: any) {
		if (element === this.level1Menu) {
			this.level1Menu = "0";
		} else {
			this.level1Menu = element;
		}
		const hasClass = event.target.classList.contains("toggled");
		if (hasClass) {
			this.renderer.removeClass(event.target, "toggled");
		} else {
			this.renderer.addClass(event.target, "toggled");
		}
	}
	callLevel2Toggle(event: any, element: any) {
		if (element === this.level2Menu) {
			this.level2Menu = "0";
		} else {
			this.level2Menu = element;
		}
	}
	callLevel3Toggle(event: any, element: any) {
		if (element === this.level3Menu) {
			this.level3Menu = "0";
		} else {
			this.level3Menu = element;
		}
	}
	ngOnInit() {
		if (this.authService.currentUserValue) {
			const userRole = this.authService.currentUserValue.role;
			this.userFullName =
				this.authService.currentUserValue.fullname;
			this.userImg = this.authService.currentUserValue.img;


			let listMenu: RouteInfo[] = [];
			this.authService.currentUserValue.menu.forEach((el, index) => {
				// console.log(index,el)
				listMenu.push(el)
				if (el.submenu.length > 0) {

					el.submenu.forEach(elem => {
						listMenu.push(elem)
					});
				}
			})

			listMenu = JSON.parse(JSON.stringify(listMenu))
			listMenu.forEach((element, index) => {
				if (element.groupTitle == true) {
					listMenu[index].submenu = []
					listMenu[index].groupTitle = true
				}
				if (element.iconType === null) { listMenu[index].iconType = "" }
				if (element.icon === null) { listMenu[index].icon = "" }
				if (element.badge === null) { listMenu[index].badge = "" }
				if (element.badgeClass === null) { listMenu[index].badgeClass = "" }
				if (element.moduleName === null) { listMenu[index].moduleName = "" }
				if (element.path === null) { listMenu[index].path = "" }
				if (element.badgeClass === null) { listMenu[index].badgeClass = "" }
				if (element.class === null) { listMenu[index].class = "" }

			})

			this.sidebarItems = listMenu
		}

		// this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
		this.initLeftSidebar();
		this.bodyTag = this.document.body;
	}
	ngOnDestroy() {
		this.routerObj.unsubscribe();
	}
	initLeftSidebar() {
		const _this = this;
		// Set menu height
		_this.setMenuHeight();
		_this.checkStatuForResize(true);
	}
	setMenuHeight() {
		this.innerHeight = window.innerHeight;
		const height = this.innerHeight - this.headerHeight;
		this.listMaxHeight = height + "";
		this.listMaxWidth = "500px";
	}
	isOpen() {
		return this.bodyTag.classList.contains("overlay-open");
	}
	checkStatuForResize(firstTime) {
		if (window.innerWidth < 1170) {
			this.renderer.addClass(this.document.body, "ls-closed");
		} else {
			this.renderer.removeClass(this.document.body, "ls-closed");
		}
	}
	mouseHover(e) {
		const body = this.elementRef.nativeElement.closest("body");
		if (body.classList.contains("submenu-closed")) {
			this.renderer.addClass(this.document.body, "side-closed-hover");
			this.renderer.removeClass(this.document.body, "submenu-closed");
		}
	}
	mouseOut(e) {
		const body = this.elementRef.nativeElement.closest("body");
		if (body.classList.contains("side-closed-hover")) {
			this.renderer.removeClass(this.document.body, "side-closed-hover");
			this.renderer.addClass(this.document.body, "submenu-closed");
		}
	}
	logout() {
		this.store.dispatch(
			AuthActions.logout()
		);
	}
}
