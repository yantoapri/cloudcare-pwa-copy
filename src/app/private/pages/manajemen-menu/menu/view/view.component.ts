import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs'
import { MenuService } from 'src/app/private/services/manajemen-menu/menu.service'
import { MenuPayload } from 'src/app/private/models/class-payload-api/manajemen-menu/menu-payload';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as MenuActions from 'src/app/private/states/manajemen-menu/menu/menu.actions'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModalService } from 'src/app/shared/_modal';
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

	getState: Observable<any>;
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};

	titleModal: string
	aksiModal: string
	isEdit: boolean
	isLoadingButton: boolean
	reloadTable: boolean
	errorMessage: any | null
	submitButton: boolean
	menu: MenuPayload = new MenuPayload
	public formTambah: FormGroup;
	listMenu: any = []
	submitted: boolean = false
	loadingParent = false
	dropDownIcon = false
	searchIcon = ""
	arrSearch = []
	arrIcon = {
		actions: [
			"3d_rotation",
			"accessibility",
			"accessible",
			"account_balance",
			"account_balance_wallet",
			"account_box",
			"account_circle",
			"add_shopping_cart",
			"alarm",
			"alarm_add",
			"alarm_off",
			"alarm_on",
			"all_out",
			"android",
			"announcement",
			"aspect_ratio",
			"assessment",
			"assignment",
			"assignment_ind",
			"assignment_late",
			"assignment_retur",
			"assignment_returned",
			"assignment_turned_in",
			"autorenew",
			"backup",
			"book",
			"bookmark",
			"bookmark_border",
			"bug_report",
			"build",
			"cached",
			"camera_enhance",
			"card_giftcard",
			"card_membership",
			"card_travel",
			"change_history",
			"check_circle",
			"chrome_reader_mode",
			"class",
			"code",
			"compare_arrows",
			"copyright",
			"credit_card",
			"dashboard",
			"date_range",
			"delete",
			"delete_forever",
			"description",
			"dns",
			"done",
			"done_all",
			"donut_large",
			"donut_small",
			"eject",
			"euro_symbol",
			"event",
			"event_seat",
			"exit_to_app",
			"explore",
			"extension",
			"face",
			"favorite",
			"favorite_border",
			"feedback",
			"find_in_page",
			"find_replace",
			"fingerprint",
			"flight_land",
			"flight_takeoff",
			"flip_to_back",
			"flip_to_front",
			"g_translate",
			"gavel",
			"get_app",
			"gif",
			"grade",
			"group_work",
			"help",
			"help_outline",
			"highlight_off",
			"history",
			"home",
			"hourglass_empty",
			"hourglass_full",
			"http",
			"https",
			"important_devices",
			"info",
			"info_outline",
			"input",
			"invert_colors",
			"label",
			"label_outline",
			"language",
			"launch",
			"lightbulb_outline",
			"line_style",
			"line_weight",
			"list",
			"lock",
			"lock_open",
			"lock_outline",
			"loyalty",
			"markunread_mailbox",
			"motorcycle",
			"note_add",
			"offline_pin",
			"opacity",
			"open_in_browser",
			"open_in_new",
			"open_with",
			"pageview",
			"pan_tool",
			"payment",
			"perm_camera_mic",
			"perm_contact_calendar",
			"perm_data_setting",
			"perm_device_information",
			"perm_identity",
			"perm_media",
			"perm_phone_msg",
			"perm_scan_wifi",
			"pets",
			"picture_in_picture",
			"picture_in_picture_alt",
			"play_for_work",
			"polymer",
			"power_settings_new",
			"pregnant_woman",
			"print",
			"query_builder",
			"question_answer",
			"receipt",
			"record_voice_over",
			"redeem",
			"remove_shopping_cart",
			"reorder",
			"report_problem",
			"restore",
			"restore_page",
			"room",
			"rounded_corner",
			"rowing",
			"schedule",
			"search",
			"settings",
			"settings_applications",
			"settings_backup_restore",
			"settings_bluetooth",
			"settings_brightness",
			"settings_cell",
			"settings_ethernet",
			"settings_input_antenna",
			"settings_input_component",
			"settings_input_composite",
			"settings_input_hdmi",
			"settings_input_svideo",
			"settings_overscan",
			"settings_phone",
			"settings_power",
			"settings_remote",
			"settings_voice",
			"shop",
			"shop_two",
			"shopping_basket",
			"shopping_cart",
			"speaker_notes",
			"speaker_notes_off",
			"spellcheck",
			"star_rate",
			"stars",
			"store",
			"subject",
			"supervisor_account",
			"swap_horiz",
			"swap_vert",
			"swap_vertical_circle",
			"system_update_alt",
			"tab",
			"tab_unselected",
			"theaters",
			"thumb_down",
			"thumb_up",
			"thumbs_up_down",
			"timeline",
			"toc",
			"today",
			"toll",
			"touch_app",
			"track_changess",
			"translate",
			"trending_down",
			"trending_flatt",
			"trending_up",
			"turned_in",
			"turned_in_not",
			"update",
			"verified_user",
			"view_agenda",
			"view_array",
			"view_carousel",
			"view_column",
			"view_day",
			"view_headlinee",
			"view_list",
			"view_module",
			"view_quilt",
			"view_stream",
			"view_week",
			"visibility",
			"visibility_off",
			"watch_later",
			"work",
			"youtube_searched_for",
			"zoom_in",
			"zoom_out",
		],
		alert: [
			"add_alert",
			"error",
			"error_outline",
			"warning",
		],
		av: [
			"add_to_queue",
			"airplay",
			"album",
			"art_track",
			"av_timer",
			"branding_watermark",
			"call_to_action",
			"closed_caption",
			"equalizer",
			"explicit",
			"fast_forward",
			"fast_rewind",
			"featured_play_list",
			"featured_video",
			"fiber_dvr",
			"fiber_manual_record",
			"fiber_new",
			"fiber_pin",
			"fiber_smart_record",
			"forward_10",
			"forward_30",
			"forward_5",
			"games",
			"hd",
			"hearing",
			"high_quality",
			"library_add",
			"library_books",
			"library_music",
			"loop",
			"mic",
			"mic_none",
			"mic_off",
			"movie",
			"music_video",
			"new_releases",
			"not_interested",
			"note",
			"pause",
			"pause_circle_filled",
			"pause_circle_outline",
			"play_arrow",
			"play_circle_filled",
			"play_circle_outline",
			"playlist_add",
			"playlist_add_check",
			"playlist_play",
			"queue",
			"queue_music",
			"queue_play_next",
			"radio",
			"recent_actors",
			"remove_from_queue",
			"repeat",
			"repeat_one",
			"replay",
			"replay_10",
			"replay_30",
			"replay_5",
			"shuffle",
			"skip_next",
			"skip_previous",
			"slow_motion_video",
			"snooze",
			"sort_by_alpha",
			"stop",
			"subscriptions",
			"subtitles",
			"surround_sound",
			"video_call",
			"video_label",
			"video_libraryy",
			"videocam",
			"videocam_off",
			"volume_down",
			"volume_mute",
			"volume_off",
			"volume_up",
			"web",
			"web_asset",
		],
		communication: [
			"business",
			"call",
			"call_end",
			"call_made",
			"call_merge",
			"call_missed",
			"call_missed_outgoing",
			"call_received",
			"call_split",
			"chat",
			"chat_bubble",
			"chat_bubble_outline",
			"clear_all",
			"comment",
			"contact_mail",
			"contact_phone",
			"contacts",
			"dialer_sip",
			"dialpad",
			"email",
			"forum",
			"import_contacts",
			"import_export",
			"invert_colors_off",
			"live_help",
			"location_off",
			"location_on",
			"mail_outlin",
			"message",
			"no_sim",
			"phone",
			"phonelink_erase",
			"phonelink_lock",
			"phonelink_ring",
			"phonelink_setup",
			"portable_wifi_off",
			"present_to_all",
			"ring_volume",
			"rss_feed",
			"screen_share",
			"speaker_phone",
			"stay_current_landscape",
			"stay_current_portrait",
			"stay_primary_landscape",
			"stay_primary_portrait",
			"stop_screen_share",
			"swap_calls",
			"textsms",
			"voicemail",
			"vpn_key",
		],
		content: [
			"add",
			"add_box",
			"add_circle",
			"add_circle_outline",
			"archive",
			"backspace",
			"block",
			"clear",
			"content_copy",
			"content_cut",
			"content_paste",
			"create",
			"delete_sweep",
			"drafts",
			"filter_list",
			"flag",
			"font_download",
			"forward",
			"gesture",
			"inbox",
			"link",
			"low_priority",
			"mail",
			"markunread",
			"move_to_inbox",
			"next_week",
			"redo",
			"remove",
			"remove_circle",
			"remove_circle_outline",
			"reply",
			"reply_all",
			"report",
			"save",
			"select_all",
			"send",
			"sort",
			"text_format",
			"unarchive",
			"undo",
			"weekend",
		],
		device: [
			"access_alarm",
			"access_alarmss",
			"access_time",
			"add_alarm",
			"airplanemode_active",
			"airplanemode_inactive",
			"battery_alert",
			"battery_charging_full",
			"battery_full",
			"battery_std",
			"battery_unknown",
			"bluetooth",
			"bluetooth_connected",
			"bluetooth_disabled",
			"bluetooth_searching",
			"brightness_auto",
			"brightness_high",
			"brightness_low",
			"brightness_medium",
			"data_usage",
			"developer_mode",
			"devices",
			"dvr",
			"gps_fixed",
			"gps_not_fixed",
			"gps_off",
			"graphic_eq",
			"location_disabled",
			"location_searching",
			"network_cell",
			"network_wifi",
			"nfc",
			"screen_lock_landscape",
			"screen_lock_portrait",
			"screen_lock_rotation",
			"screen_rotation",
			"sd_storage",
			"settings_system_daydream",
			"signal_cellular_4_bar",
			"signal_cellular_connected_no_internet_4_bar",
			"signal_cellular_no_sim",
			"signal_cellular_null",
			"signal_cellular_off",
			"signal_wifi_4_bar",
			"signal_wifi_4_bar_lock",
			"signal_wifi_off",
			"storage",
			"usb",
			"wallpaper",
			"widgets",
			"wifi_lock",
			"wifi_tethering",
		],
		editor: [
			"attach_file",
			"attach_money",
			"border_all",
			"border_bottom",
			"border_clear",
			"border_color",
			"border_horizontal",
			"border_inner",
			"border_left",
			"border_outer",
			"border_right",
			"border_style",
			"border_top",
			"border_vertical",
			"bubble_chart",
			"drag_handle",
			"format_align_center",
			"format_align_justify",
			"format_align_left",
			"format_align_right",
			"format_bold",
			"format_clear",
			"format_color_fill",
			"format_color_reset",
			"format_color_text",
			"format_indent_decrease",
			"format_indent_increase",
			"format_italic",
			"format_line_spacing",
			"format_list_bulleted",
			"format_list_numbered",
			"format_paint",
			"format_quote",
			"format_shapes",
			"format_size",
			"format_strikethrough",
			"format_textdirection_l_to_r",
			"format_textdirection_r_to_l",
			"format_underlined",
			"functions",
			"highlight",
			"insert_chart",
			"insert_comment",
			"insert_drive_file",
			"insert_emoticon",
			"insert_invitation",
			"insert_link",
			"insert_photo",
			"linear_scale",
			"merge_type",
			"mode_comment",
			"mode_edit",
			"monetization_on",
			"money_off",
			"multiline_chart",
			"pie_chart",
			"pie_chart_outlined",
			"publish",
			"short_text",
			"show_chart",
			"space_bar",
			"strikethrough_s",
			"text_fields",
			"title",
			"vertical_align_bottom",
			"vertical_align_center",
			"vertical_align_top",
			"wrap_text",
		],
		file: [
			"attachment",
			"cloud",
			"cloud_circle",
			"cloud_done",
			"cloud_download",
			"cloud_off",
			"cloud_queue",
			"cloud_upload",
			"create_new_folder",
			"file_download",
			"file_upload",
			"folder",
			"folder_open",
			"folder_shared",
		],
		hardware: [
			"cast",
			"cast_connected",
			"computer",
			"desktop_mac",
			"desktop_windows",
			"developer_board",
			"device_hub",
			"devices_other",
			"dock",
			"gamepad",
			"headset",
			"headset_mic",
			"keyboard",
			"keyboard_arrow_down",
			"keyboard_arrow_left",
			"keyboard_arrow_right",
			"keyboard_arrow_up",
			"keyboard_backspace",
			"keyboard_capslock",
			"keyboard_hide",
			"keyboard_return",
			"keyboard_tab",
			"keyboard_voice",
			"laptop",
			"laptop_chromebook",
			"laptop_mac",
			"laptop_windows",
			"memory",
			"mouse",
			"phone_android",
			"phone_iphone",
			"phonelink",
			"phonelink_off",
			"power_input",
			"router",
			"scanner",
			"security",
			"sim_card",
			"smartphone",
			"speaker",
			"speaker_group",
			"tablet",
			"tablet_android",
			"tablet_mac",
			"toys",
			"tv",
			"videogame_asset",
			"watch",
		],
		image: [
			"add_a_photo",
			"add_to_photos",
			"adjust",
			"assistant",
			"assistant_photo",
			"audiotrack",
			"blur_circular",
			"blur_linear",
			"blur_off",
			"blur_on",
			"brightness_1",
			"brightness_2",
			"brightness_3",
			"brightness_4",
			"brightness_5",
			"brightness_6",
			"brightness_7",
			"broken_image",
			"brush",
			"burst_mode",
			"camera",
			"camera_alt",
			"camera_front",
			"camera_rear",
			"camera_roll",
			"center_focus_strong",
			"center_focus_weak",
			"collections",
			"collections_bookmark",
			"color_lens",
			"colorize",
			"compare",
			"control_pointt",
			"control_point_duplicate",
			"crop",
			"crop_16_9",
			"crop_3_2",
			"crop_5_4",
			"crop_7_5",
			"crop_din",
			"crop_free",
			"crop_landscape",
			"crop_original",
			"crop_portrait",
			"crop_rotate",
			"crop_square",
			"dehaze",
			"details",
			"edit",
			"exposure",
			"exposure_neg_1",
			"exposure_neg_2",
			"exposure_plus_1",
			"exposure_plus_2",
			"exposure_zero",
			"filter",
			"filter_1",
			"filter_2",
			"filter_3",
			"filter_4",
			"filter_5",
			"filter_6",
			"filter_7",
			"filter_8",
			"filter_9",
			"filter_9_plus",
			"filter_b_and_w",
			"filter_center_focus",
			"filter_drama",
			"filter_frames",
			"filter_hdr",
			"filter_none",
			"filter_tilt_shift",
			"filter_vintage",
			"flare",
			"flash_auto",
			"flash_offf",
			"flash_on",
			"flipflip",
			"gradient",
			"grain",
			"grid_off",
			"grid_on",
			"hdr_off",
			"hdr_on",
			"hdr_strong",
			"hdr_weak",
			"healing",
			"image",
			"image_aspect_ratio",
			"iso",
			"landscape",
			"leak_add",
			"leak_remove",
			"lens",
			"linked_camera",
			"looks",
			"looks_3",
			"looks_4",
			"looks_5",
			"looks_6",
			"looks_one",
			"looks_two",
			"loupe",
			"monochrome_photos",
			"movie_creation",
			"movie_filter",
			"music_note",
			"nature",
			"nature_people",
			"navigate_before",
			"navigate_next",
			"palette",
			"panorama",
			"panorama_fish_eye",
			"panorama_horizontal",
			"panorama_vertical",
			"panorama_wide_angle",
			"photo",
			"photo_album",
			"photo_camera",
			"photo_filter",
			"photo_library",
			"photo_size_select_actual",
			"photo_size_select_large",
			"photo_size_select_small",
			"picture_as_pdf",
			"portrait",
			"remove_red_eye",
			"rotate_90_degrees_ccw",
			"rotate_left",
			"rotate_right",
			"slideshow",
			"straighten",
			"style",
			"switch_camera",
			"switch_video",
			"tag_faces",
			"texture",
			"timelapse",
			"timer",
			"timer_10",
			"timer_3",
			"timer_off",
			"tonality",
			"transform",
			"tune",
			"view_comfy",
			"view_compact",
			"vignette",
			"wb_auto",
			"wb_cloudy",
			"wb_incandescent",
			"wb_iridescent",
			"wb_sunny",
		],
		maps: [
			"add_location",
			"beenhere",
			"directions",
			"directions_bike",
			"directions_boat",
			"directions_bus",
			"directions_car",
			"directions_railway",
			"directions_run",
			"directions_subway",
			"directions_transit",
			"directions_walk",
			"edit_location",
			"ev_station",
			"flight",
			"hotel",
			"layers",
			"layers_clear",
			"local_activity",
			"local_airport",
			"local_atm",
			"local_bar",
			"local_cafe",
			"local_car_wash",
			"local_convenience_store",
			"local_dining",
			"local_drink",
			"local_florist",
			"local_gas_station",
			"local_grocery_store",
			"local_hospital",
			"local_hotel",
			"local_laundry_service",
			"local_library",
			"local_mall",
			"local_movies",
			"local_offer",
			"local_parking",
			"local_pharmacy",
			"local_phone",
			"local_pizza",
			"local_playl",
			"local_post_office",
			"local_printshop",
			"local_see",
			"local_shipping",
			"local_taxi",
			"map",
			"my_location",
			"navigation",
			"near_me",
			"person_pin",
			"person_pin_circle",
			"pin_drop",
			"place",
			"rate_review",
			"restaurant",
			"restaurant_menu",
			"satellite",
			"store_mall_directory",
			"streetview",
			"subway",
			"terrain",
			"traffic",
			"train",
			"tram",
			"transfer_within_a_station",
			"zoom_out_map",
		],
		navigation: [
			"sapps",
			"arrow_back",
			"arrow_downward",
			"arrow_drop_down",
			"arrow_drop_down_circle",
			"arrow_drop_up",
			"arrow_forward",
			"arrow_upward",
			"cancel",
			"check",
			"chevron_left",
			"chevron_right",
			"close",
			"expand_less",
			"expand_more",
			"first_page",
			"fullscreen",
			"fullscreen_exit",
			"last_page",
			"menu",
			"more_horiz",
			"more_vert",
			"refresh",
			"subdirectory_arrow_left",
			"subdirectory_arrow_right",
		],
		notification: [
			"adb",
			"airline_seat_flat",
			"airline_seat_flat_angled",
			"airline_seat_individual_suite",
			"airline_seat_legroom_extra",
			"airline_seat_legroom_normal",
			"airline_seat_legroom_reducedd",
			"airline_seat_recline_extra",
			"airline_seat_recline_normal",
			"bluetooth_audio",
			"confirmation_number",
			"disc_full",
			"do_not_disturb",
			"do_not_disturb_alt",
			"do_not_disturb_off",
			"do_not_disturb_on",
			"drive_eta",
			"enhanced_encryption",
			"event_available",
			"event_busy",
			"event_note",
			"folder_special",
			"live_tv",
			"mms",
			"more",
			"network_check",
			"network_locked",
			"no_encryption",
			"ondemand_video",
			"personal_video",
			"phone_bluetooth_speaker",
			"phone_forwarded",
			"phone_in_talk",
			"phone_locked",
			"phone_missed",
			"phone_paused",
			"power",
			"priority_high",
			"sd_card",
			"sim_card_alert",
			"sms",
			"sms_failed",
			"sync",
			"sync_disabled",
			"sync_problem",
			"system_update",
			"tap_and_play",
			"time_to_leave",
			"vibration",
			"voice_chat",
			"vpn_lock",
			"wc",
			"wifi",
		],
		place: [
			"ac_unit",
			"airport_shuttle",
			"all_inclusive",
			"beach_access",
			"business_center",
			"casino",
			"child_care",
			"child_friendly",
			"fitness_center",
			"free_breakfast",
			"golf_course",
			"hot_tubhot_tub",
			"kitchen",
			"pool",
			"room_service",
			"rv_hookup",
			"smoke_free",
			"smoking_rooms",
			"spa",
		],
		social: [
			"cake",
			"domain",
			"group",
			"group_add",
			"location_city",
			"mood",
			"mood_bad",
			"notifications",
			"notifications_active",
			"notifications_none",
			"notifications_off",
			"notifications_paused",
			"pages",
			"party_mode",
			"people",
			"people_outline",
			"person",
			"person_add",
			"person_outline",
			"plus_one",
			"poll",
			"public",
			"school",
			"sentiment_dissatisfied",
			"sentiment_neutral",
			"sentiment_satisfied",
			"sentiment_very_dissatisfied",
			"sentiment_very_satisfied",
			"share",
			"whatshot",
		],
		toggle: [
			"check_box",
			"check_box_outline_blank",
			"indeterminate_check_box",
			"radio_button_checked",
			"radio_button_unchecked",
			"star",
			"star_border",
			"star_half",
		]
	}
	tab = Object.keys(this.arrIcon)
	constructor(
		private menuService: MenuService,
		private modalService: ModalService,
		private fb: FormBuilder,
		private store: Store<fromApp.PrivateAppState>,
		private spinner : NgxSpinnerService,
		private validate:ValidateService,
	) {
		this.getState = this.store.select('manajemenMenu_menu')
		// document.addEventListener('click', this.offClickHandler.bind(this)); // bind on doc
	}

	offClickHandler(event: any) {
		let flyoutEl = document.getElementById('dropdownIcon'),
			btnIcon = document.getElementById('btnIcon'),
			targetEl = event.target; // clicked element      
		if (flyoutEl != targetEl && targetEl != btnIcon) {
			this.dropDownIcon = false
		}
	}
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	ngOnInit(): void {
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='RRMNM2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='RRMNM1')!=-1?true:false
		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}

		this.dtOptions = this.showDataTables(this.btnEdit)
		this.getState.subscribe((state) => {
			this.reloadTable = state.reloadTable
			if (this.reloadTable === true) {
				this.reLoadData()
			}
		})
		this.formTambah = this.fb.group({
			nama_menu: ["", [Validators.required]],
			parent_id: ["", [Validators.required]],
			level_menu: ["", [Validators.required]],
			no_urut: ["", [Validators.required]],
			path_url: ["", []],
			module_name: ["", []],
			icon_type: ["", []],
			icon: ["", []],
			class: ["", []],
			group_title: [null, []],
			badge: ["", []],
			badge_class: ["", []],
			status_aktif: [1, []],
		})

	}
	isNumber(e){
		return this.validate.Number(e)
	}
	setGroup(val) {
		this.formTambah.patchValue({
			group_title: val
		})
	}
	setStatus(val) {
		this.formTambah.patchValue({
			status_aktif: val
		})
	}
	setIcon(item) {
		this.formTambah.patchValue({
			icon: item
		})
	}
	SubmitForm() {
		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 300)
		if (this.formTambah.invalid) {
			return
		}
		this.spinner.show('spinner1')
		let payload = new MenuPayload
		payload.id_menu = this.menu.id_menu
		payload.nama_menu = this.formTambah.value.nama_menu
		payload.parent_id = this.formTambah.value.parent_id
		payload.level_menu = this.formTambah.value.level_menu
		payload.path = this.formTambah.value.path_url
		payload.moduleName = this.formTambah.value.module_name
		payload.iconType = this.formTambah.value.icon_type
		payload.icon = this.formTambah.value.icon
		payload.no_urut = this.formTambah.value.no_urut
		payload.class = this.formTambah.value.class
		payload.groupTitle = this.formTambah.value.group_title
		payload.badge = this.formTambah.value.badge
		payload.badgeClass = this.formTambah.value.badge_class
		payload.status_aktif = Number(this.formTambah.value.status_aktif)
		if (this.aksiModal == 'add') {
			this.store.dispatch(
				MenuActions.addMenu({ payload: payload })
			)
			setTimeout(() => {
				this.spinner.hide('spinner1')
				this.modalService.close("modalFormContent");
			}, 400);
			
		} else {
			this.store.dispatch(
				MenuActions.updateMenu({ payload: payload })
			)
			setTimeout(() => {
				this.spinner.hide('spinner1')
				this.modalService.close("modalFormContent");
			}, 400);
			
		}
	}

	cariIcon(search) {
		this.searchIcon = search
		if (this.searchIcon != '') {
			this.arrSearch = []
			this.tab.map((val) => {
				this.arrIcon[val].map((value, index) => {
					if (value.search(this.searchIcon) != -1) {
						this.arrSearch.push(value)
					}
				})
			})
		} else {
			this.arrSearch = []
		}
	}

	FormModalOpen() {
		this.modalService.open("modalFormContent");
		this.submitted = false
		this.titleModal = "Form Tambah Menu"
		this.aksiModal = 'add'
		this.formTambah.reset()
		this.store.dispatch(
			MenuActions.clearData()
		)
		this.formTambah.patchValue({
			group_title: "0",
			status_aktif: "1",
			parent_id: null,
			level_menu: ""
		})
		this.listMenu = []
	}
	modalClose() {
		this.modalService.close("modalFormContent")
	}

	prosesSelectParent(event: any, aksi: string, level_menu = "") {
		let value = this.formTambah.value.level_menu
		value = level_menu != "" ? level_menu : value
		if (value != "" || value != undefined) {
			this.loadingParent = true
			this.listMenu = []
			if (value != "") {
				if (value == '1') {
					this.listMenu = [
						{
							id_menu: '0',
							nama_menu: 'Parent 0 / Berdiri sendiri',
							level_menu: '1'
						}
					]
				} else {
					this.menuService.getMenuParent(value)
						.subscribe(async (succ) => {
							let data = succ.response
							let n = value - 1
							await data.map((val, index) => {
								if (Number(val.level_menu) != n) {
									data.splice(index, 1)
								}
							})


							this.listMenu = await data.sort((a, b) => a.nama_menu.localeCompare(b.nama_menu));
							this.listMenu.map((val, index) => {
								if (val.level_menu != (value - 1)) {
									this.listMenu.splice(index, 1)
								}
							})
							this.listMenu.map((val, index) => {
								if (val.level_menu != (value - 1)) {
									this.listMenu.splice(index, 1)
								}
							})
							if (aksi == 'search') {
								let arr = []
								this.listMenu.map((val) => {
									if (val.nama_menu.search(event.term) > -1) {
										arr.push(val)
									}
								})
								this.listMenu = arr
							}
							
						})
				}
			}
			this.loadingParent = false
		}
	}
	showDataTables(edit) {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				let req=false
				this.menuService.getDataTables(dataTablesParameters)
				.subscribe((resp: any) => {
					callback({
						draw: resp.response.draw,
						recordsTotal: resp.response.recordsTotal,
						recordsFiltered: resp.response.recordsFiltered,
						data: resp.response.data
					})
					this.spinner.hide('spinner1')

				})
			},
			columns: [
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return full.row + 1 + full.settings._iDisplayStart;
					}
				}, {
					data: 'nama_menu'
				}, {
					orderable: false,
					searchable: false,
					data: 'nama_menu_parent'
				}, {
					data: 'level_menu'
				}, {
					data: 'no_urut'
				}, {
					data: 'path_url'
				}, {
					data: 'moduleName'
				}, {
					data: 'iconType'
				}, {
					data: 'icon'
				}, {
					data: 'class'
				}, {
					data: 'groupTitle'
				}, {
					data: 'badge'
				}, {
					data: 'badgeClass'
				},
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return edit?`<div style="white-space: nowrap;">
                      <button class="btn btn-link circle-primary text-ui-primary update-data"><i class="far fa-edit"></i></button>
                      <button class="btn btn-link circle-danger text-ui-danger nonaktif-data"><i class="far fa-trash-alt"></i></button>
                    <div>`:'';
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td .update-data', row).on('click', () => {
					self.editData(data);
				});
				$('td .nonaktif-data', row).on('click', () => {
					self.nonAktif(data);
				});
				return row;
			}
		}
	}

	editData(data: any) {
		this.aksiModal = 'update'
		this.titleModal = "Form Edit Menu"
		this.menu = data
		this.submitted = false
		this.listMenu = [{
			id_menu: data.parent_id, nama_menu: data.nama_menu_parent
			, level_menu: data.parent_level
		}]
		this.formTambah.patchValue({
			nama_menu: data.nama_menu,
			parent_id: data.parent_id,
			level_menu: data.level_menu,
			path_url: data.path_url,
			no_urut: data.no_urut,
			module_name: data.moduleName,
			icon_type: data.iconType,
			icon: data.icon,
			class: data.class,
			group_title: data.groupTitle === null ? 0 : data.groupTitle,
			badge: data.badge,
			badge_class: data.badgeClass,
			status_aktif: data.status_aktif
		})
		this.modalService.open("modalFormContent");
	}
	iconShow() {
		this.dropDownIcon = !this.dropDownIcon
		this.searchIcon = ''
		this.arrSearch = []
	}
	nonAktif(data: any) {
		Swal.fire({
			title: 'Apakah anda yakin akan menghapus data ini ?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, hapus saja!',
			cancelButtonText: 'Tidak, Batalkan'
		}).then((result) => {
			if (result.value) {
				this.spinner.show('spinner1')
				this.store.dispatch(
					MenuActions.deleteMenu({ payload: { id: data.id_menu } })
				)
				setTimeout(() => {
					this.spinner.show('spinner1')
				}, 400);
			}
		})
	}

	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

}
