import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'march2022';
  lista_materiais: string[] = [    
    "1025 Steel",
    "IM7_977-2",
    "IM7_977-3",
    "Kevlar-49_Epoxy",
    "LM Graphite_Epoxy",
    "SilEglass1200tex_MY750",
    "T300_976",
    "T300_BSL914C",
    "T300_VTM266 2x2 3K Twill Weave",
    "T700_Epoxy",
    "T800H_3900-2",
    "Ti-6Al-4v",
    "UM Graphite_Epoxy",
   "S2-Glass_Epoxy",
 "IM7_8551-7",
"HM Graphite_Epoxy",
"6061-T6 Alum",
"7740G30-500 Graphite",
"AS4_3501-6",
"AS4_3502",
"AS4_8552",
"Boron_5505",
"E-Glass_Epoxy",
"Eglass21xK43Gevetex_LY556",
"HTS150_TC250",
"IM7_5250-4",
"IM7_8552"
  ];

  lista_criterios: string[] = [    
  "Azzi-Tsai",       
"Christensen",
"Hashin",
"Hoffman",      
"Larc03",       
"Máxima Deformação",       
"Máxima Tensão",
"Puck",       
"Tsai-Hill",
"Tsai-Wu"];

onChange_criterio (event: any): void {
  console.log('setNewUserName', event.target.value)
}


onChange_material (event: any): void {
  console.log('setNewUserName', event.target.value)
}



}
