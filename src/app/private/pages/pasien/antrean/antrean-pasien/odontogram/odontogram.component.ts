import {
    AfterViewInit,
    Component,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef
  } from "@angular/core";

  import {ValidateService} from 'src/app/private/services/validate/validateService'
  import { ModalService } from 'src/app/shared/_modal';
  @Component({
    selector: "app-canvas-odontograma",
    templateUrl: "./odontogram.component.html",
    styleUrls: ["./odontogram.component.sass"]
  })
  export class CanvasOdontogramaComponent
    implements OnInit, AfterViewInit, OnChanges {
    fillColor: String = "white";
    fill;
    htmlString: string;
    nativo: any;
    @ViewChild(TemplateRef, { static: true }) odontoTemplate: TemplateRef<any>;
    @ViewChild(TemplateRef, { static: true, read: ViewContainerRef })
    odontoContainer: ViewContainerRef;
    line1=[
       [ 
        {
        number:18,
        type:1
    },
    {
        number:17,
        type:1
    },
    {
        number:16,
        type:1
    },
    {
        number:15,
        type:1
    },
    {
        number:14,
        type:1
    },
    {
        number:13,
        type:2
    },
    {
        number:12,
        type:2
    },
    {
        number:11,
        type:2
    }
  ],
  [
    {
      number:21,
      type:2
  },
  {
      number:22,
      type:2
  },
  {
      number:23,
      type:2
  },
  {
      number:24,
      type:1
  },
  {
      number:25,
      type:1
  },
  {
      number:26,
      type:1
  },
  {
      number:27,
      type:1
  },
  {
      number:28,
      type:1
  }
  ]
    ]
    line2=[
      [
        {
          number:55,
          type:1
        },
        {
          number:54,
          type:1
        },
        {
          number:53,
          type:2
        },
        {
          number:52,
          type:2
        },
        {
          number:51,
          type:2
        },
      ],
      [
        {
          number:61,
          type:2
        },
        {
          number:62,
          type:2
        },
        {
          number:63,
          type:2
        },
        {
          number:64,
          type:1
        },
        {
          number:65,
          type:1
        },
      ]
    ]
    line3=[
      [
        {
          number:85,
          type:1
        },
        {
          number:84,
          type:1
        },
        {
          number:83,
          type:2
        },
        {
          number:82,
          type:2
        },
        {
          number:81,
          type:2
        },
      ],
      [
        {
          number:71,
          type:2
        },
        {
          number:72,
          type:2
        },
        {
          number:73,
          type:2
        },
        {
          number:74,
          type:1
        },
        {
          number:75,
          type:1
        },
      ]
    ]
    line4=[
      [
        {
          number:48,
          type:1
        },
        {
          number:47,
          type:1
        },
        {
          number:46,
          type:1
        },
        {
          number:45,
          type:1
        },
        {
          number:44,
          type:1
        },
        {
          number:43,
          type:2
        },
        {
          number:42,
          type:2
        },
        {
          number:41,
          type:2
        },
      ],
      [
        {
          number:31,
          type:2
        },
        {
          number:32,
          type:2
        },
        {
          number:33,
          type:2
        },
        {
          number:34,
          type:1
        },
        {
          number:35,
          type:1
        },
        {
          number:36,
          type:1
        },
        {
          number:37,
          type:1
        },
        {
          number:38,
          type:1
        },
      ]
    ]
    ElEvent=null
    odontogramList=[this.line1,this.line2,this.line3,this.line4]
    loadingState=false
    listState=[]
    posisi=""
    posisiAngka=""
    posisiBox=""
    kondisi=""
    form={
      kondisi:""
    }
    singkatan=""
    tabPane : Array<boolean> = [true, false]
    constructor(
      private ModalService :ModalService,
      private validate:ValidateService,
    ) {}
    ngOnChanges(changes: SimpleChanges): void {
      throw new Error("Method not implemented.");
    }
  
    ngOnInit(): void {
        this.rojo()
    }

    isNumber(e){
      return this.validate.Number(e)
    }
    ngAfterViewInit() {
      this.odontoContainer.createEmbeddedView(this.odontoTemplate);
    }
  
    changeColor(number,position,event) {
      this.form.kondisi=""
      this.btnOpenModal()
      this.posisiAngka=number;
      this.posisiBox=position
      this.ElEvent=event.target || event.srcElement || event.currentTarget;
    }
    selectAll(n){
      this.form.kondisi=""
      this.btnOpenModal()
      this.posisiAngka=n;
      this.posisiBox="Semua"
    }
    save(){
      this.ElEvent.setAttribute("data",this.form.kondisi)
      this.fill = this.fillColor;
      this.ElEvent.attributes.setNamedItem(
        this.ElEvent.attributes.getNamedItem("fill")
      ).value = this.fill;
      
      this.modalClose()
    }
    amarillo() {
      this.fillColor = "yellow";
    }
    ShowTabPane(nomor : number) {
      this.tabPane.forEach((el, index) => {
        this.tabPane[index] = false
      });
      this.tabPane[nomor] = true
    }
    rojo() {
      this.fillColor = "red";
    }
    changeState(e){
      this.form.kondisi=e.kondisi
      this.fillColor=e.color
    }
    mouseEnter(number,position,event){
      this.posisi=number+"-"+position
      this.kondisi=event.target.getAttribute("data")
      this.singkatan=position[0]
      
    }
    mouseLeave(){
      this.kondisi=""
      this.posisi=""
      this.singkatan="-"
    }
    prosesSelectState(event: any, aksi: string){
      
    this.loadingState = true
		this.listState = [
      {kondisi:"Normal Baik",color:"white"},
      {kondisi:"Tambalan Amalgam",color:"#6F6F6F"},
      {kondisi:"Tambalan Composite",color:"#0F0BAB"},
      {kondisi:"Pit dan Fissure Sealant",color:"#E4BE8A"},
      {kondisi:"Gigi Non Vital",color:"#D6850B"},
      {kondisi:"Perawatan Saluran Akal",color:"#EA4335"},
      {kondisi:"Gigi Tidak ada, tidak diketahui ada atau tidak ada",color:"#7B61FF"},
      {kondisi:"Un-Erupted",color:"#FFDB59"},
      {kondisi:"Partual Erupt",color:"#FB15D6"},
      {kondisi:"Anomali",color:"#05D0A6"},
      {kondisi:"Caries=Tambalan sementara",color:"#000000"},
      {kondisi:"Tracture",color:"#007C75"},
      {kondisi:"Tambalan amalgam pada gigi non vital=root canal feeling",color:"#FFB44C"},
      {kondisi:"Tambalan Composite pada gigi non vital=root canal feeling",color:"#F08C01"},
      {kondisi:"Full metal crown pada gigi vital",color:"#2E9000"},
      {kondisi:"Full metal crown pada gigi Non vital",color:"#2E9000"},
      {kondisi:"Percelaan crow pada gigi vital",color:"#42CB01"},
      {kondisi:"Sisa Akar",color:"#CB0101"},
      {kondisi:"Gigi Hilang",color:"#4C2AFB"},
      {kondisi:"Implaint + Percelaian crown",color:"#51FF77"},
      {kondisi:"Full metal bridge 3 units",color:"#E7E7E7"},
      {kondisi:"Full metal bridge 4 units",color:"#1A2A3F"},
      {kondisi:"Full metal cantlever bridge",color:"#3BBC57"},
      {kondisi:"Partal Denturel full denture",color:"#BD6E00"},
      {kondisi:"Migrasi/Version/Rotasi dibuat panah sesuai arah",color:"#D97E00"},
      {kondisi:"Luksasi",color:"#007C75"},
      {kondisi:"Persitensi",color:"#05A483"},
    ]
		if (aksi == 'search') {
			let arr = []
			this.listState.map((val) => {
				if (val.name.search(event)) {
					arr.push(val)
				}
			})
			this.listState = arr
		}
		this.loadingState = false
	}
  
    guardarOdonto() {
      // this.htmlString = odonto.innerHTML;
      // this.htmlString = odonto.innerHTML;
      this.nativo = this.odontoTemplate;
      const svgElements: NodeList = this.nativo.elementRef.nativeElement.ownerDocument.querySelectorAll(
        "svg"
      ) as NodeList;
      let toStore = "";
      svgElements.forEach(
        (node: SVGElement) => (toStore = "<div>" + node.innerHTML + "</div>")
      );
      console.log(toStore);
      localStorage.setItem("html", toStore);
    }
    cargarOdonto() {
      this.odontoTemplate = this.nativo;
    }
    btnOpenModal() {
      this.ModalService.open("modalFormContent");
    }
  
    modalClose() {
      this.ModalService.close("modalFormContent")
  
    }
  }
  