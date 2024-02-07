import { DOCUMENT } from "@angular/common";
import {
	Component,
	Inject,
	ElementRef,
	OnInit,
	Renderer2,
	AfterViewInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/config/config.service";
import { AuthService } from 'src/app/authentication/core/services/auth.service'
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
const document: any = window.document;

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.sass"],
})
export class HeaderComponent
	extends UnsubscribeOnDestroyAdapter
	implements OnInit, AfterViewInit {
	public config: any = {};
	userImg: string;
	fullName: string;
	homePage: string;
	isNavbarCollapsed = true;
	flagvalue;
	countryName;
	langStoreValue: string;
	defaultFlag: string;
	isOpenSidebar: boolean;
	showKlinikHeader = false
	constructor(
		@Inject(DOCUMENT) private document: Document,
		private renderer: Renderer2,
		public elementRef: ElementRef,
		private configService: ConfigService,
		private authService: AuthService,
		private router: Router,
		// public languageService: LanguageService
	) {
		super();
	}
	listLang = [
		{ text: "English", flag: "assets/images/flags/us.svg", lang: "en" },
		{ text: "Spanish", flag: "assets/images/flags/spain.svg", lang: "es" },
		{ text: "German", flag: "assets/images/flags/germany.svg", lang: "de" },
	];
	notifications: any[] = [
		{
			message: "Please check your mail",
			time: "14 mins ago",
			icon: "mail",
			color: "nfc-green",
			status: "msg-unread",
		},
		{
			message: "New Patient Added..",
			time: "22 mins ago",
			icon: "person_add",
			color: "nfc-blue",
			status: "msg-read",
		},
		{
			message: "Your leave is approved!! ",
			time: "3 hours ago",
			icon: "event_available",
			color: "nfc-orange",
			status: "msg-read",
		},
		{
			message: "Lets break for lunch...",
			time: "5 hours ago",
			icon: "lunch_dining",
			color: "nfc-blue",
			status: "msg-read",
		},
		{
			message: "Patient report generated",
			time: "14 mins ago",
			icon: "description",
			color: "nfc-green",
			status: "msg-read",
		},
		{
			message: "Please check your mail",
			time: "22 mins ago",
			icon: "mail",
			color: "nfc-red",
			status: "msg-read",
		},
		{
			message: "Salary credited...",
			time: "3 hours ago",
			icon: "paid",
			color: "nfc-purple",
			status: "msg-read",
		},
	];
	listKlinik: any = []
	klinikActive: any = []
	ngOnInit() {
		this.config = this.configService.configData;
		const userRole = this.authService.currentUserValue.role;
		this.userImg = this.authService.currentUserValue.img;
		this.fullName = this.authService.currentUserValue.fullname;
		this.homePage = "admin/welcome";
		this.listKlinik = JSON.parse(localStorage.getItem('currentUser'))
		this.listKlinik = this.listKlinik.plant
		this.listKlinik.map((val) => {
			if (val.status == 1) {
				this.klinikActive = val
			}
		})
		this.langStoreValue = localStorage.getItem("lang");
		const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
		this.countryName = val.map((element) => element.text);
		if (val.length === 0) {
			if (this.flagvalue === undefined) {
				this.defaultFlag = "assets/images/flags/us.svg";
			}
		} else {
			this.flagvalue = val.map((element) => element.flag);
		}
	}
	switch(item) {
		this.authService.switch({ plant_code: item.kode }).subscribe((res) => {
			let data=JSON.parse(localStorage.getItem('currentUser'))
			
			data.plant.map((val)=>{
				if(val.kode==item.kode){
					val.status='1'
				}else{
					val.status='0'
				}
			})
			localStorage.setItem('currentUser',JSON.stringify(data))
			setTimeout(() => {
				window.location.href = '/#/manajemen-klinik/informasi-klinik/view'
				location.reload();
			}, 300);
			
		}, (e) => {
			console.log(e)
		})
	}
	ngAfterViewInit() {
		// set theme on startup
		if (localStorage.getItem("theme")) {
			this.renderer.removeClass(this.document.body, this.config.layout.variant);
			this.renderer.addClass(this.document.body, localStorage.getItem("theme"));
		} else {
			this.renderer.addClass(this.document.body, this.config.layout.variant);
		}

		if (localStorage.getItem("menuOption")) {
			this.renderer.addClass(
				this.document.body,
				localStorage.getItem("menuOption")
			);
		} else {
			this.renderer.addClass(
				this.document.body,
				"menu_" + this.config.layout.sidebar.backgroundColor
			);
		}

		if (localStorage.getItem("choose_logoheader")) {
			this.renderer.addClass(
				this.document.body,
				localStorage.getItem("choose_logoheader")
			);
		} else {
			this.renderer.addClass(
				this.document.body,
				"logo-" + this.config.layout.logo_bg_color
			);
		}

		if (localStorage.getItem("sidebar_status")) {
			if (localStorage.getItem("sidebar_status") === "close") {
				this.renderer.addClass(this.document.body, "side-closed");
				this.renderer.addClass(this.document.body, "submenu-closed");
			} else {
				this.renderer.removeClass(this.document.body, "side-closed");
				this.renderer.removeClass(this.document.body, "submenu-closed");
			}
		} else {
			if (this.config.layout.sidebar.collapsed === true) {
				this.renderer.addClass(this.document.body, "side-closed");
				this.renderer.addClass(this.document.body, "submenu-closed");
			}
		}
	}
	callFullscreen() {
		if (
			!document.fullscreenElement &&
			!document.mozFullScreenElement &&
			!document.webkitFullscreenElement &&
			!document.msFullscreenElement
		) {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}
	setLanguage(text: string, lang: string, flag: string) {
		this.countryName = text;
		this.flagvalue = flag;
		this.langStoreValue = lang;
	}
	mobileMenuSidebarOpen(event: any, className: string) {
		const hasClass = event.target.classList.contains(className);
		if (hasClass) {
			this.renderer.removeClass(this.document.body, className);
		} else {
			this.renderer.addClass(this.document.body, className);
		}
	}
	klinikShow(val) {
		if (val) {
			this.showKlinikHeader = !this.showKlinikHeader
			if (this.showKlinikHeader)
				$("#dropdownKlinik").addClass("show")
			else
				$("#dropdownKlinik").removeClass("show")
		} else {
			this.router.navigate(['/manajemen-klinik/informasi-klinik/view'])
		}

	}
	callSidemenuCollapse() {
		const hasClass = this.document.body.classList.contains("side-closed");
		if (hasClass) {
			this.renderer.removeClass(this.document.body, "side-closed");
			this.renderer.removeClass(this.document.body, "submenu-closed");
		} else {
			this.renderer.addClass(this.document.body, "side-closed");
			this.renderer.addClass(this.document.body, "submenu-closed");
		}
	}
	logout() {
		this.subs.sink = this.authService.logout().subscribe((res) => {

			if (!res.success) {
				this.router.navigate(["/"]);
			}
		});
	}
}
