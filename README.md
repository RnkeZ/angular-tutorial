# Angular tutorial - DocumentWeb
DocumentWeb projekt je kreiran u sklopu kvartalnog cilja 1Q2018. 
Ideja kvartalnog cilja je bila prijenos znanja o [Angular Framework-u](https://angular.io/) te opis sadašnjih praksi u razvoju frontend-a.
Autor: Matej Kern


Dokumentacija za projekt će biti odvojena u nekoliko cjelina:
  * [1. Uvod](#1)
  * [2. Angular arhitektura](#2)
  * [3. Postavljanje razvojne okoline](#3)
  * [4. Kreiranje Angular projekta](#4)
  * [5. Pisanje aplikacije](#5)
  * [6. Pokretanje i build aplikacije](#6)

Svaka od navedenih cjelina sadržavati će isječke koda (ukoliko je to potrebno) gdje će biti opisane najvažnije linije.
Prolaskom kroz cjeline savjetujem da se paralelno programira radi boljeg razumijevanja.


## 1. Uvod <a id="1"></a>
Angular je [TypeScript](https://en.wikipedia.org/wiki/TypeScript)-baziran open-source front-end web framework i aplikacijska platforma. Kreiran je od strane Angular tima u Google-u i open-source zajednice.
Angular je kompletni "rewrite" [AngularJS-a](https://en.wikipedia.org/wiki/AngularJS). Angular je usko vezan sa [Angular Material-om](https://material.angular.io). Točnije razvija ga isti tim.

### Razlike između Angular-a i AngularJS-a
Angular nema koncept "scope-a" ili "kontrolera", umjesto toga koristi hijerarhiju komponenti kao primarnu arhitekturnu karakteristiku. Angular koristi drugačiju sintaksu za određene izraze, 
koristi "[ ]" za povezivanje svojstava i "( )" za povezivanje "event-a". Naspram AnguarJS-a većina "core funkcionalnosti" je prebačena u zasebne module. Angular savjetuje korištenje [TypeScript](https://en.wikipedia.org/wiki/TypeScript) jezika koji donosi između ostalog sljedeće značajke:
- Class-bazirano objektno orijentirano programiranje
- Static type checking tj. forsiranje provjere tipova objekta.
- Generics tj. generičko programiranje, generička paradigma je pristup da se temeljne potrebe za tipovima podataka apstrahiraju od konkretnih primjera algoritama i struktura podataka te da se formaliziraju kao koncepti, analogno apstraktnoj algebri. 

[TypeScript](https://en.wikipedia.org/wiki/TypeScript) je superset [ECMAScript 6 (ES6)](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015) te je kompatibilan sa [ECMAScript 5 (ES5)](https://en.wikipedia.org/wiki/ECMAScript#5th_Edition) donosi između ostalog:
- Lambdas
- Iterators
- For/Of loops
- Python-style generators
- Reflection

Angular omogućuje dinamičko učitavanje biblioteka, asinkronu kompilaciju template-a, zamjenjuje `$scope` sa komponentama i direktivama (komponenta je direktiva sa html-om). 

### Naziv i verzioniranje
Originalan naziv je bio Angular 2 no to je dovelo do zbunjenosti između developera. Tim je odlučio da se Angular 1.x preimenuje u AngularJS a sve verzije iznad 1.x će se zvati Angular.
Koristi se Semantic  verzioniranje gdje je brojevi označavaju: MAJOR.MINOR.PATCH. 
- MAJOR su nekompatibilne promjene u API-u.
- MINOR su kompatibilne promjene u API-u koje proširuju funkcionalnost.
- PATCH su kompatibilne promjene u API-u u svrhu ispravka.

### Material Design
Angular Material je skup gotovih komponenti nad kojima se zasnivaju naše aplikacije. Angular Material je Angular implementacija [Material Design-a](https://material.io/). [Material Design](https://material.io/) je dizajnerski jezik razvijen 2014 od strane Google-a. Omogućuje kreiranje lijepih aplikacija sa modularnim i prilagodljiv UI komponentama.

## 2. Angular arhitektura <a id="2"></a>
![Angular arhitektura](https://upload.wikimedia.org/wikipedia/commons/d/d1/Architecture_of_an_Angular_2_application.png)

Osnovni blokovi Angular aplikacije su NgModules (u daljnjem tekstu moduli).
Komponente definiraju "view-ove" koji su set vizualnih elemenata između kojih angular može birati i modificirati ih ovisno o programskoj logici.
Komponente koriste "services" (u daljnjem tekstu servisi), koji pružaju funkcionalnosti ne direktno vezane za "view-ove". Servisi mogu biti ubrizgani u komponente kao "dependencies" što nam pruža dodatnu modularnost i efikasnost.

Komponente i servisi su obične klase sa dekoratorima koji označavaju njihov tip, pružaju meta podatke te govore Angularu kako da ih koristi.

Meta podaci komponente povezuju komponentu sa "template-om" koji definira "view". "Template" kombinira običan HTML sa Angular-ovim direktivama što u konačnici omogućuje Angularu da modificira HTML prije nego što ga predstavi na ekranu.
Metapodaci servisa pruža informacije potrebne Angularu da bi omogućio da servis bude dostupan komponentama.
Aplikacija obično ima mnogo "view-ova" koji imaju svoju hijerarhiju. Angular pruža "Router" servis koji nam pomaže da definiramo puteve navigacije između raznih "view-ova". Router pruža sofisticirane navigacijske sposobnosti.

### Moduli
Angular moduli definiraju kompilacijski kontekst za set komponenti posvećenih aplikacijskoj domeni, određenom workflow-u ili uže povezanom setu mogućnosti. 
Modul može asocirati svoje komponente sa potrebnim kodom poput servisa da se formiraju funkcionalne cjeline.
Svaka Angular aplikacija ima root modul koji se zove AppModule. AppModule pruža bootstrap mehanizam koji pokreće aplikaciju. Aplikacija tipično sadrži više modula
Svaka komponenta mora pripadati samo jednom određenom modulu. Na module se može gledati kao na organizatore strukture aplikacije. Modul može importati druge module te da bi mogao koristiti komponente iz importanog modula potrebno je u importanom modulu exportati željenu komponentu. 
Pimjer app modula:
```typescript
@NgModule({
  declarations: [
    AppComponent    // Deklaracije tj. lista komponenti koje su kreirane unutar modula
  ],
  imports: [    // Importi drugih modula u AppModule
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,    // Modul za korištenje Angular formi
    ReactiveFormsModule,  // Modul za korištenje Angular formi
    HttpModule,  // Modul za izvršavanje HTTP poziva
    IRadModule,  // Modul koji definira dio aplikacije
    AppRoutingModule, // Modul koji definira rute unutar aplikacije
    SharedModule    // Zajednički modul
  ],
  providers: [ConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
Organiziranje koda u posebne funkcionalne module pomaže u razvoju kompleksnih aplikacija te povećava iskoristivost koda. Dodatno ova tehnika omogućuje iskorištavanje prednosti "lazy-loadinga" tj. učitavanje modula po potrebi da bi se smanjila količina koda koji je potrebno učitati na startup-u.

### Komponente
Svaka Angular aplikacija ima barem jednu komponentu, to je root komponenta ona povezuje hijerarhiju komponenata sa DOM-om.
Document Object Model (DOM) je cross-platform i neovisno o programskom jeziku sučelje programiranja aplikacija koje tretira HTML, XHTML ili XML dokument kao "tree" strukturu gdje je svako čvorište objekt koji predstavlja dio dokumenta. Svaka komponenta definira klasu koja sadrži podatke i logiku, te je povezana sa HTML "template-om" koji definira view koji se prikazuje u ciljanom okruženju.
Kreiranje komponenti se vrši koristeći [Angular CLI](https://cli.angular.io/). Ukoliko se komponenta kreira koristeći navedeni alat biti automatski importana prvi vertikalno najbliži modul.
Angular CLI  komponenta se sastoji od template-a (.html), typescript datoteke u kojem se definira komponenta (.ts), spec.ts datoteke u kojoj se nalazi unit test i css datoteke u kojoj se može definirati stil. Komunikacija iz komponente (.ts) u template (.html) se vrši preko svojstava dok obrnuta komunikacija se vrši preko event-a. 
Primjer definicije App komponente:
```typescript
import { Component, OnInit } from '@angular/core'; // Importi

@Component({ // Definira prvu klasu ispod dekoratora kao komponentu te povezuje template i metapodatke.
  selector: 'app-root', // Selektor komponente
  templateUrl: './app.component.html', // Lokacija template-a
  styleUrls: ['./app.component.css'] // Lokacija stila
})
export class AppComponent implements OnInit { // Naziv komponente
  constructor() { // Konstruktor

  }

  ngOnInit(): void { // Lifecycle hook komponente
   
  }
}
```
Komponente su zasebne i uglavnom neovisne cjeline. Muđusobna komunikacija između komponenti se može obaviti na više načina ovisno u vertikalnoj i horizontalnoj lokaciji u hijerarhiji.
Na primjer komponente su u parent-child ovisnosti tj. ako jedna komponenta sadrži unutar svog template-a selektor na neku drugu komponentu.
Parent-child komuniciranje je najjednostavniji primjer komunikacije. Može se obaviti ovisno o potrebi kroz template ili kroz klasu parent komponente.
Na primjer:
```html
<div>
  <app-datum #dateofcreation [disabled]="disabled" [dateFormControl]="iRadForm.controls.dateofcreation"
    [placeholder]="'Datum kreiranja'"></app-datum>
</div>
```
Ovdje vidimo da u "template-u" parent komponente imamo selektor na "app-datum" child komponentu. Unutar selektora child komponente se nalazi prosljeđivanje svojstava u child komponentu. Svojstvo "[disabled]" mora biti definirano u child komponenti kao ulaz "@Input() disabled;" ukoliko nije aplikacija će javiti grešku. Dinamičkim mjenjanjem svojstva "disabled" u parent komponenti svojstvo se automatski prosljeđuje child komponenti.
Drugi primjer je kroz klasu parent komponente:
```typescript
@ViewChild('dateofcreation') dateofcreationComponent: DatumComponent;
  
  ngOnInit() {
    this.dateofcreationComponent.disabled = true;
  }
```
Ovdje vidimo da smo koristeći dekorator "@ViewChild" dobili kontekst komponente te smo joj promjenili stanje svojstva "disabled".
Postoji mnogo različitih načina međusobne komunikacije o tome ćemo više u aplikaciji.

### Templates, direktive i povezivanje 
Template kombinira HTML sa Angular markup-om koji može modificirati HTML elmenet prije nego su prikazani na ekranu. Template direktive pružaju programsku logiku a markup vezivanja povezuje podatke aplikacije sa DOM-om.
Povezivanje preko eventa omogućuje da aplikacija reagira na korisnički input u ciljani dio aplikacije tako što izmjenjuje prikazane podatke. Povezivanje preko svojstava omogućuje interpoliranje vrijednosti koje su izračunate u aplikaciji u HTML. Prije nego se "view" prikaže Angular provjerava direktive i rješava povezivanje u "template-u" da se modificiraju HTML elementi i DOM, ovisno o programskim podacima i logici. Angular podržava dvosmjerno povezivanje podataka, što znači da promjene u DOM-u kao što su korisnički izbori, se reflektiraju nazad u programske podatke.

"Template-i" mogu koristiti "pipes" da bi se poboljšalo korisničko iskustvo tako što se transformiraju vrijednosti za prikaz. "Pipe-ovi" se mogu koristit na primjer da se datumi i iznosi prikažu na način koji odgovara "locale-u". Angular pruža predefinirane "pipes". Primjer:
```html
<div>
  {{ value | date:'dd. MM. yyyy.'}}
</div>
```


### Servisi
Za logiku koja nije povezana sa "view-ovima" i koju želimo koristiti i djelati sa više komponenti koristimo servisne klase. Definiciji servisne klase prethodi "@Injectable" dekorator. Dekorator pruža meta podatke koji omogućuju da servis bude ubrizgan u komponente kao dependancy. Omogućuju nam na primjer da klasa komponente ne mora direktno dohvaćati podatke sa servera ili validirati korisnički unos. Primjer servisa:
```typescript
@Injectable() // Dekorator
export class DataService {
  url = '';
  constructor(private http: HttpService) {

  }
  // Metoda dohvaća podatke 
  public getEmployeeByEmail(email: string): Observable<any> { 
    this.url = 'emplyoees?email=' + email;
    const result = this.http
      .get(this.url)
      .map((response: Response) => <any>response.json());
    return result;
  }
}
```

### Routanje
Angular router je servis koji omogućuje definiranje navigacijskih putanja unutar aplikacije. Router mapira putanje poput URL-a sa "view-ovima" umjesto sa stranicama. Kada korisnik klikne na link to bi inače učitalo novu stranicu, router presreće takvo ponašanje browsera te skriva ili prikazuje hijerarhiju "view-ova".
Router presreće linkove ovisno o našoj definiciji. Primjer definicije ruta:
```typescript
export const APP_ROUTES: Routes = [
  {
    path: 'login', // Adresa
    data: { // Dodatni podaci
      breadcrumb: 'Login',
    },
    component: LoginComponent // Naziv komponente
  },
  {
    path: 'home',
    data: {
      breadcrumb: 'Početna',
    },
    component: HomeComponent
  },
];
```
## 3. Postavljanje razvojne okoline <a id="3"></a>
Kao razvojni alat primarno se koristi [Visual Studio Code](https://code.visualstudio.com/) ali mogu se koristiti i drugi. Angular koristi npm za dohvaćanje dependancy-ja.
Npm je upravitelj paketa za JavaScript programski jezik. Zadani je upravitelj paketa za javascript runtime environment [Node.js](https://nodejs.org/en/). Npm se sastoji od klijenta na komandnoj liniji te online baze javnih i privatnih paketa, poznate kao npm registry. Da bi smo mogli razvijati Angular aplikaciju potrebno je prvo napraviti nekoliko koraka.
1. Instalacija [Visual Studio Code](https://code.visualstudio.com/)
2. Instalacija [Node.js](https://nodejs.org/en/)
3. Podešavanje mrežnih postavki
4. Instalacija [Angular CLI](https://cli.angular.io/) alata

### 1. Instalacija [Visual Studio Code](https://code.visualstudio.com/)
Preuzeti instalaciju sa sljedećeg linka [Visual Studio Code](https://code.visualstudio.com/). Nakon toga je potrebno pratiti upute instalacijskog čarobnjaka.

### 2. Instalacija [Node.js](https://nodejs.org/en/)
Preuzeti instalaciju sa sljedećeg linka [Node.js](https://nodejs.org/en/). Nakon toga je potrebno pratiti upute instalacijskog čarobnjaka  

### 3. Podešavanje mrežnih postavki
Zbog sistemskih razloga potrebno je definirati adresu proxy-a da bi se npm klijent mogao spajati na npm registry i dohvaćati pakete.
Ukoliko se prvi put instalirao npm datoteka neće postojati pa ju je potrebno kreirati. Potrebno je otići u C:\Users\<user> unutar direktorija potrebno je kreirati datoteku bez imena sa ekstenzijom .npmrc. Ponekad windows ne dopušta kreiranje datoteke bez imena. Zaobilazno rješenje je otvaranje komandne linije u direktoriju te pokretanje sljedeće naredbe: 
```
echo testing > .npmrc
```
Potrebno izmijeniti sadržaj sa sljedećim:
```
proxy=http://10.0.205.101/
https-proxy=http://10.0.205.101/
strict-ssl=false
```

### 4. Instalacija [Angular CLI](https://cli.angular.io/) alata
Angular CLI se instalira koristeći npm. Potrebno je otvoriti komandnu liniju te upisati sljedeću naredbu:
```
npm install -g @angular/cli
```
"-g" paremetar označava da se instalira globalno na operacijski sustav.
Angular CLI alat nam omogućuje između ostalog i generiranje sljedećih djelova aplikacije:

Generira  | Naredba
---       | ---
Komponenta | `ng g component my-new-component`
Direktiva | `ng g directive my-new-directive`
"Pipe"       | `ng g pipe my-new-pipe`
Servis    | `ng g service my-new-service`
Klasa        | `ng g class my-new-class`
"Guard"        | `ng g guard my-new-guard`
"Interface" | `ng g interface my-new-interface`
Enum         | `ng g enum my-new-enum`
Modul      | `ng g module my-module`

Skraćeno se može pisati na primjer:
```
ng g c moja-komponenta
```
## 4. Kreiranje angular projekta <a id="4"></a>
Kreiranje osnove projekta vrši se koristeći Angular CLI. 
Potrebno je navigirati u direktorij gdje želimo kreirati projekt.
Otvaramo komandnu liniju u direktoriju i koristimo sljedeću naredbu:
```
  ng new document-web
```
"ng" označava Angular CLI, "new" označava kreiranje projekta, "document-web" je ime projekta.
Nakon toga alat vrši kreiranje datoteka potrebnih za projekt te poziva npm repozitoriji i dohvaća potrebne pakete za rad.
Dobije se sljedeća struktura:
```
document-web:
            │   .angular-cli.json // Angular CLI konfiguracija
            │   .editorconfig
            │   .gitignore
            │   karma.conf.js // Konfiguracija za Karma automatsko testiranje 
            │   package.json  // Defincija potrebnih vanjskih modula za aplikaciju
            │   protractor.conf.js // Protractor konfiguracija
            │   README.md
            │   tsconfig.json // Kompilacijske opcije 
            │   tslint.json // Konfiguracija za TS lint Visual Studio Code ekstenziju
            │   
            ├───e2e // end-to-end testovi
            │       app.e2e-spec.ts
            │       app.po.ts
            │       tsconfig.e2e.json
            │       
            ├───node_modules  // Potrebni paketi za razvoj aplikacije
            │                 // Struktura je poprilično velika pa se ne prikazuje
            └───src // Kod naše aplikacije
                │   favicon.ico
                │   index.html
                │   main.ts
                │   polyfills.ts
                │   styles.css
                │   test.ts
                │   tsconfig.app.json
                │   tsconfig.spec.json
                │   typings.d.ts
                │   
                ├───app // root komponenta
                │       app.component.css
                │       app.component.html
                │       app.component.spec.ts
                │       app.component.ts
                │       app.module.ts
                │       
                ├───assets
                │       .gitkeep
                │       
                └───environments 
                        environment.prod.ts
                        environment.ts
```

Savjetuje se korištenje [TSLint](https://github.com/Microsoft/vscode-tslint) Visual Studio Code ekstenzije zbog pisanja čitkijeg koda. Ekstenzija podržava automatsko ispravljanje koda. Da bi se instalirala ekstenzija potrebno je odabrati sa desne strane opciju "Extensions" te potražiti TSLint i odabrati install. Definiranje automatskog ispravljanja koda se vrši na sljedeći način:
File > Preferences > Keyboard shortcuts; Tu se može potražiti TSLint ili odabrati opcija "For advanced customizations open and edit keybindings.json". Ako se otvori konfiguracijska datoteka može se zalijepiti sljedeće:
```
  // Place your key bindings in this file to overwrite the defaults
[
    {
        "key": "ctrl+t", // Kombinacija tipki koja će pokrenuti autofix datoteke koju pregledavamo.
        "command": "tslint.fixAllProblems"
    },
    // Opcijonalno ukoliko se koristi JSON to TS ekstenzija
    {
        "key": "shift+alt+v", 
        "command": "jsonToTs.fromClipboard"
    },
    {
        "key": "ctrl+alt+v",
        "command": "-jsonToTs.fromClipboard"
    }
]
```
Po želji može se koristiti i [JSON to TS](https://github.com/MariusAlch/vscode-json-to-ts) ekstenzija. Omogućuje da iz JSON responsa sa backend-a dobijemo interface/klasu koja odgovara zaprimljenom sadržaju.


## 5. Pisanje aplikacije <a id="5"></a>
Pisanje se razdvaja u nekoliko elementarnih cjelina:
1. Dodavanje dodatnih paketa
2. Kreiranje modula tj. strukture aplikacije
3. Kreiranje zajedničkih komponenti
4. Implementacija značajki aplikacije
Prije svega treba otvoriti Visual Studio Code ako ga još nismo otvorili te odabrati opciju "Add folder to workspace" i odabrati "document-web".

### 1. Dodavanje dodatnih paketa
Dodavanje se vrši kroz package.json datoteku.
```JSON
{
  "name": "document-web",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build --prod",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^5.2.0",
    "@angular/common": "^5.2.0",
    "@angular/compiler": "^5.2.0",
    "@angular/core": "^5.2.0",
    "@angular/forms": "^5.2.0",
    "@angular/http": "^5.2.0",
    "@angular/platform-browser": "^5.2.0",
    "@angular/platform-browser-dynamic": "^5.2.0",
    "@angular/router": "^5.2.0",
    "core-js": "^2.4.1",
    "rxjs": "^5.5.6",
    "zone.js": "^0.8.19"
  },
  "devDependencies": {
    "@angular/cli": "~1.7.4",
    "@angular/compiler-cli": "^5.2.0",
    "@angular/language-service": "^5.2.0",
    "@types/jasmine": "~2.8.3",
    "@types/jasminewd2": "~2.0.2",
    "@types/node": "~6.0.60",
    "codelyzer": "^4.0.1",
    "jasmine-core": "~2.8.0",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~2.0.0",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "^1.2.1",
    "karma-jasmine": "~1.1.0",
    "karma-jasmine-html-reporter": "^0.2.2",
    "protractor": "~5.1.2",
    "ts-node": "~4.1.0",
    "tslint": "~5.9.1",
    "typescript": "~2.5.3"
  }
}
```
Trenutno naša aplikacija sadrži samo osnovne pakete, no mi želimo da naša aplikacija malo kompleksnija da bi ispunila korisničke potrebe.
Dodati ćemo još nekoliko paketa. 
```JSON
  "dependencies": {
    //...
    "@angular/flex-layout": "^5.0.0-beta.13", // Omogućuje korištenje flex layout-a
    "@angular/material": "^5.2.4", // Omogućuje korištenje Angular Material komponenti i direktiva
    "@swimlane/ngx-datatable": "^11.2.0", // Omogućuje korištenje robustnog besplatnog paketa za tablice
    "hammerjs": "^2.0.8", // Potreban paket za Material-ove animacije i geste
    "lodash": "^4.17.5" // Potreban paket za npr. duboko kloniranje objekata
    //...
  },
  "devDependencies": {
    //...
    "@compodoc/compodoc": "^1.0.9", // developerski paket za kreiranje dokumentacije
    "@angular/cdk": "^5.2.4"  // paket koji omogućuje kreiranje komponent koje nisu direktno vezane za Material
    //...
  }
```
Nakon što smo proširili datoteku sa gore navedenim sadržajem potrebno je pokrenuti dohvaćanje paketa sa registry-a.
Možemo u Visual Studio Code-u odabrati izbornik "View". Unutar izbornika odaberemo opciju "Integrated terminal". Time dobivamo komandnu liniju unutar VS Code-a gdje možemo pokrenuti sljedeću naredbu.
```
npm install
```
Ukoliko se je sve uspješno dohvatilo potrebno je promijeniti .angular-cli.json datoteku, točnije zamijeniti redak "scripts": [] sa: 
```JSON
"scripts": [
        "../node_modules/hammerjs/hammer.min.js"
      ],
```

Možemo pokrenuti aplikaciju da vidimo ako je sve u redu.
```
ng serve
```
Ako je sve dobro ispisuje se sljedeće:
```
** NG Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
Date: 2018-04-20T09:55:08.682Z
Hash: 01133b611ecceada788b
Time: 4811ms
chunk {inline} inline.bundle.js (inline) 3.85 kB [entry] [rendered]
chunk {main} main.bundle.js (main) 18 kB [initial] [rendered]
chunk {polyfills} polyfills.bundle.js (polyfills) 554 kB [initial] [rendered]
chunk {scripts} scripts.bundle.js (scripts) 20.8 kB [initial] [rendered]
chunk {styles} styles.bundle.js (styles) 41.5 kB [initial] [rendered]
chunk {vendor} vendor.bundle.js (vendor) 7.43 MB [initial] [rendered]

webpack: Compiled successfully.
```
Navigacijom na http://localhost:4200/ možemo vidjeti našu aplikaciju.


## 2. Kreiranje modula tj. strukture aplikacije
Module ćemo kreirati koristeći Angular CLI. Prvo moramo otvoriti novu komandnu liniju, to možemo jednostavno izvesti sa opcijom "split-terminal" u desnom kutu trenutne komandne linije. U novoj komandnoj liniji navigiramo do app direktorija.
```
cd src
cd app
```
Možemo koristiti tab na tipkovnici da si smanjimo posao.

Kad se nalazimo u app direktoriju možemo krenuti. Prvo ćemo kreriati zajednički modul. Unutar zajedničkog modula biti će definirane zajedničke funkcije, komponente ili servisi naše aplikacije. Pokrećemo sljedeću naredbu:
```
ng g m shared
```
Time se je izgenerirala shared.module.ts datoteka.
```
app
  │   app.component.css
  │   app.component.html
  │   app.component.spec.ts
  │   app.component.ts
  │   app.module.ts
  │   
  └───shared
          shared.module.ts
```

Unutar aplikacije želimo koristiti Materialove komponte stoga da bi smo ukolonili potrebu da importamo u svaki budući aplikacijiski modul Material-ove komponente kreirati ćemo novi modul unutar shared modula koji je imortati sve postojeće Material-ove komponte. Tako će biti dovoljno da imporatmo shared modul u neki budući aplikacijiski modul i nasljedimo sve komponente i značajke Material-a. Pokrećemo sljedeće:
```
cd shared  
ng g m material
```
Time se je izgenerirala material.module.ts datoteka unutar shared direktorija.
```
app
  │   app.component.css
  │   app.component.html
  │   app.component.spec.ts
  │   app.component.ts
  │   app.module.ts
  │   tree.txt
  │   
  └───shared
      │   shared.module.ts
      │   
      └───material
              material.module.ts
```
Kreiran material modul trenutno definira samo osnovne importe:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class MaterialModule { }
```

Proširiti ćemo ga sa potrebnim importima za sve Material-ove module:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatDividerModule,
  MatNativeDateModule,
  MatRippleModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: []
})
export class MaterialsModule { }
```
Primjećujemo da smo export-ali sve importane module.
Nakon toga vraćamo se u shared.module.ts te tamo definiramo import na prije toga kreirani material modul.
Također ga export-amo da bi bio dostupan ostatku aplikacije.
```typescript
@NgModule({
  imports: [
    CommonModule,
    MaterialsModule
  ],
  declarations: [],
  exports: [
    MaterialsModule
  ]
})
export class SharedModule { }
```
Sada možemo dodati još neke Angular module koje ćemo koristiti u ostatku aplikacije:
```typescript
@NgModule({
  imports: [
    CommonModule,
    FormsModule,  // Modul koji nam omogućuje korištenje formi
    MaterialsModule,
    ReactiveFormsModule, // Modul koji nam omogućuje korištenje formi
  ],
  declarations: [],
  exports: [
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
  ]
})
```

Nakon toga se možemo vratiti u shared direktorij:
```
cd ..
```

### 3. Kreiranje zajedničkih komponenti

Kreirati ćemo našu prvu zajedničku komponentu koja će apstrahirati Material-ovu date-picker komponentu te ju proširiti sa dodatnim mogućnostima. Pokrećemo sljedeće:
```
ng g c datum
```
Struktura se je proširila na sljedeći način:
```
app
  │   app.component.css
  │   app.component.html
  │   app.component.spec.ts
  │   app.component.ts
  │   app.module.ts
  │   tree.txt
  │   
  └───shared
      │   shared.module.ts
      │   
      ├───datum
      │       datum.component.css
      │       datum.component.html
      │       datum.component.spec.ts
      │       datum.component.ts
      │       
      └───material
              material.module.ts
```

Osnovni djelovi komponte us kreirani te je shared modul porširen sa deklaracijom nove komponente.
Ulazimo u datum.component.ts datoteku te ćemo definirati ulazne varijable:
```typescript
  @Output() datumPicked: EventEmitter<any> = new EventEmitter<any>(); // event koji će komponenta slati parent komponenti kad sa odaber datum
  @Input() disabled = false; // parametar koji zabranjuje unos datuma
  @Input() placeholder; // label na unosu datuma
  @Input() floatPlaceholder = 'always'; // parametar koji definira stanje label-a
  @Input() dateFormControl: FormControl; // ulazna kontrola
```
Nakon toga idemo proširiti konstruktor sa adapterom koji dinamički postavlja local:

```typescript
   constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('hr-HR');
  }
```

Nakon toga dodajemo metode koje želimo da pokreće sam Angular:
```typescript
  ngOnInit() {
    if (this.dateFormControl === undefined) {
      this.dateFormControl = new FormControl([{ value: '', disabled: this.disabled }]);
    }
  }

  ngOnChanges() {
    console.log('DateForm: ', this.dateFormControl);
  }
```
Nakon što se kreira komponenta pozivom njezinog konstruktora Angular poziva "lifecycle hook" metode u sljedećem redoslijedu.

Hook | Svrha
--- | ---
ngOnChanges() | Poziva se kad Angular izmjeni neku od ulaznih varijabli komponente
ngOnInit()  | Inicijalizira komponentu nakon što se prvi put postave ulazne varijable.
ngDoCheck() | Detektira promjene koje Angular ne može ili e želi detektirati sam. Poziva se nakon bilo kakve izmjene.
ngAfterContentInit()  | Izvršava se kad Angular pošalje podatke komponente u njezin "view".
ngAfterContentChecked() | Poziva se u petlji gdje Angular provjerava sadržaj u "view-u".
ngAfterViewInit() |  Poziva se kada Angular inicijalizira "view" komponente i sve "view-ove" child komponenti ako postoje.
ngAfterViewChecked()  | Poziva se u petlji nakon što angular provjeri "view" komponente i sve "view-ovi" child komponenti.
ngOnDestroy() | Poziva se prije nego što Angular uništi komponentu.

Mi smo koristili "ngOnInit" da definiramo kontrolu ako nije zaprimljena u prvom postavljanju ulaznih varijabli, te ngOnChanges() da si logiramo promjene ulaznih varijabli.

Na kraju smo dodali metodu koja šalje event izvan komponente ukoliko se odabere datum:
```typescript
   onChange(event) {
    this.datumPicked.emit(event);
  }
```
Sada možemo definirati "view". Otvaramo datum.component.html datoteku:
```html
<p>
  datum works!
</p>
```
Trenutno ne sadrži mnogo. Dodajemo potreban kod: 
```html
<mat-form-field [floatPlaceholder]="floatPlaceholder">
  <input (ngModelChange)="onChange($event)" matInput maxlength="13" [matDatepicker]="datepicker" 
  [placeholder]="placeholder"
    [formControl]="dateFormControl">
  <mat-error *ngIf="dateFormControl.hasError('required')">
    Polje je obavezno!
  </mat-error>
  <mat-datepicker-toggle [disabled]="disabled" matSuffix [for]="datepicker"></mat-datepicker-toggle>
  <mat-datepicker #datepicker></mat-datepicker>
</mat-form-field>
```
Pošto se radi o Material inputu običan input mora bit obuhvaćen sa "mat-form-field" tagom. 
Povezujemo naš ulazni parametar "floatPlaceholder" sa Materialovim. Dodajemo u input "(ngModelChange)" event koji vraća Angular ukoliko se dogodi promjena na podacima. Ukoliko se dogodi promjena poziva se metoda "onChange" koju smo definirali u klasi.
"matInput" je direktiva kojom Materijal mijenja izgled i funkcionalnost običnog HTML inputa.
"maxLenght" definira maksimalnu duljinu polja. "form-control" postavlja našu kontrolu na input.
"matDatepicker" definira iz kojeg će se date pickera prepisati podaci u input.
```html
<mat-error *ngIf="dateFormControl.hasError('required')">
  Polje je obavezno!
</mat-error>
```
"mat-error" nam omogućuje da prikažemo korisniku greške ukoliko validacija ne prođe.
```html
<mat-datepicker-toggle [disabled]="disabled" matSuffix [for]="datepicker"></mat-datepicker-toggle>
<mat-datepicker #datepicker></mat-datepicker>
```
"mat-datepicker-toggle" definira gumb koji će otvarati date picker.
"mat-datepicker" instancira komponentu date picker-a.
Time smo završili našu prvu komponentu.

Idemo još kreirati nekakva općeniti error dialog i template za tablice.
Pokrećemo sljedeće:
```
ng g c error 
ng g c ng-templates
```
U error direktorij ćemo dodati još jedan html file sa obzirom da želimo zapravo imati dvije komponente jedna koja otvara dialog i drugu koja se prikazuje u dialogu.
Iz razloga što želimo da sa error komponentom možemo komunicirati iz bilo kojeg djela aplikacije kreirati ćemo servis koji će omogućiti takvu komunikaciju.
Pokrećemo sljedeće:
```
cd ..
mkdir services
cd services
ng g s communication
```
Nije nužno kreirati novi direktorij no lakše je tako ukoliko planiramo koristiti istu klasu servisa za više funkcija.
Struktura se je promijenila na sljedeći način:
```
app
  │   app.component.css
  │   app.component.html
  │   app.component.spec.ts
  │   app.component.ts
  │   app.module.ts
  │   tree.txt
  │   
  ├───services
  │       communication.service.spec.ts
  │       communication.service.ts
  │       
  └───shared
      │   shared.module.ts
      │   
      ├───datum
      │       datum.component.css
      │       datum.component.html
      │       datum.component.spec.ts
      │       datum.component.ts
      │       
      ├───error
      │       error-dialog.component.html
      │       error.component.css
      │       error.component.html
      │       error.component.spec.ts
      │       error.component.ts
      │       
      ├───material
      │       material.module.ts
      │       
      └───ng-templates
              ng-templates.component.css
              ng-templates.component.html
              ng-templates.component.spec.ts
              ng-templates.component.ts

```
Prvo ćemo dodati komunikacijske metode u novo generirani servis. Otvoriti ćemo communication.service.ts te proširiti klasu sa sljedećim:
```typescript
  private refresh = new Subject<boolean>();
  private error = new Subject<string>();
  // Observable streams
  refresh$ = this.refresh.asObservable();
  error$ = this.error.asObservable();

  publishDataRefresh(state: boolean) {
    this.refresh.next(state);
  }

  publishDataError(data: string) {
    this.error.next(data);
  }
```
Odmah ćemo dodati i metodu pokretanje osvježavanja.
Svrha metode "publishDataError" je da ako ju pozovemo iz bilo koje komponente i proslijedimo joj poruku ta poruka će se prikazati u error dialogu, no da bi se dogodilo moramo podesiti neke stvari u error kompomnenti.

Otvoriti ćemo error.component.ts klasu te izmjeniti njezin sadžaj sa sljedećim:
```typescript
export class ErrorComponent implements OnInit {
  description: string;
  subscription: Subscription;
  constructor(private communicationService: CommunicationService, public dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.communicationService.error$
      .subscribe(
        (data) => {
          this.description = data;
          this.openDialog(this.description);
        });
  }

  openDialog(description?: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, { disableClose: true });
    dialogRef.componentInstance.description = description;
    dialogRef.afterClosed().subscribe(result => {
      description = result;
    });
  }

}
@Component({
  selector: 'app-error-dialog',
  templateUrl: 'error-dialog.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorDialogComponent {
  description: string;
  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>) { }
}
```

Odvije vidimo da smo definirali dvije komponente unutar jedne klase što je u redu jer funkcioniraju kao jedna cjelina. U prvoj komponenti smo u konstruktoru inicijalizirali novi komunikacijski servis. Na taj servis smo se pretplatili na sljedeći način:
```typescript
ngOnInit() {
  this.subscription = this.communicationService.error$
    .subscribe(
      (data) => {
        this.description = data;
        this.openDialog(this.description);
      });
}
```
Vrijednost u servisu "error" je tipa observable te stoga možemo detektirati njezine promjene. Pozivom metode u servisu "publishDataError" kreiramo promjenu. Sadržaj promjene spremamo u "descirption" varijablu te ju šaljemo u metodu koja otvara dialog.

Metoda "openDialog" definira, otvara dialog i prosljeđuje mu vrijednost.
```typescript
openDialog(description?: string) {
  const dialogRef = this.dialog.open(ErrorDialogComponent, { disableClose: true });
  dialogRef.componentInstance.description = description;
  dialogRef.afterClosed().subscribe(result => {
    description = result;
  });
}
```
Ovdje definiramo komponentu koja će se inicijalizirati u dialogu.
```typescript
this.dialog.open(ErrorDialogComponent, { disableClose: true });
```
To je druga komponenta u klasi te ona ima i svoj template dok prva nema template.
U template druge komponente error-dialog.component.html proširujemo sa sljedećim:
```html
<h1 mat-dialog-title>Greška</h1>
<mat-dialog-content style="padding-top: 20px; min-width: 300px;">
    <div align="center">
        {{description}}
    </div>
</mat-dialog-content>
<mat-dialog-actions align="center">
    <button mat-button [matDialogClose]="true" (click)="dialogRef.close()" color="primary">U redu</button>
</mat-dialog-actions>
```
Time smo završili error komponentu. Povezali smo ju sa servisom te ju sada možemo ubaciti u root aplikacije iz razloga što nema template te samo poziva dialog. Proširujemo sadržaj app.component.html sa:
```html
<app-error></app-error>
```
Iduća komponenta je ng-templates komponenta koja nije ništa više nego skup template-a koji u sebi imaju predefinirane "pipes" i određene stilove. Proširujemo template sa:
```html
<ng-template #templateLeft let-row="row" let-value="value" let-i="index">
  <div style="text-align: left; padding-left: 3px;">
    {{value}}
  </div>
</ng-template>
<ng-template #templateRight let-row="row" let-value="value" let-i="index">
  <div style="text-align: right; padding-right: 3px;">
    {{value}}
  </div>
</ng-template>
<ng-template #templateImage let-row="row" let-value="value" let-i="index">
  <div>
    <mat-icon svgIcon="{{value}}"></mat-icon>
  </div>
</ng-template>
<ng-template #templateDate let-row="row" let-value="value" let-i="index">
  <div style="text-align: center; padding-right: 3px;">
    {{ value | date:'dd. MM. yyyy.'}}
  </div>
</ng-template>
<ng-template #templatePercent let-row="row" let-value="value" let-i="index">
  <div style="text-align: right; padding-right: 3px;">
    {{value | percent:'1.2-2'}}
  </div>
</ng-template>
```

Klasu komponente proširujemo sa sljedećim:
```typescript
@ViewChild('templateLeft') public templateLeft: TemplateRef<any>;
@ViewChild('templateRight') public templateRight: TemplateRef<any>;
@ViewChild('templateImage') public templateImage: TemplateRef<any>;
@ViewChild('templateDate') public templateDate: TemplateRef<any>;
@ViewChild('templatePercent') public templatePercent: TemplateRef<any>;
```
Sada kad imamo ovu komponentu možemo dinamički definirati template tablica.

### 4. Implementacija značajki aplikacije
Aplikacija je relativno jednostavna pa nema potrebe za odvojenim aplikacijskim modulima izuzev router modula i i-rad modula. Kreirati ćemo prvo login komponentu koja će nam služiti kao početni ekran aplikacije, po loginu ulazimo u ostatak aplikacije. Ostatak aplikacije će se sastojati od home komponente koja u sebi sadrži i-rad komponentu. Home komponenta nije obavezna ali povećava modularnost aplikacije. U i-rad komponenti imati ćemo tablicu koju ćemo učitati iz vanjskog modula te toolbar koji će otvarati unos-i-rad komponentu preko koje ćemo unositi ili pregledavati podatke. 

Prvo moramo podesiti Material temu projekta. Kreirali smo svoju sa određenom paletom boja. Odmah ćemo ubaciti Material ikone i Roboto font u aplikaciju. Potrebno je kreirati theme.scss datoteku unutar src direktorija. Nakon što ju kreiramo moramo ju proširiti sa sljedećim sadržajem:
```scss
@import '~@angular/material/theming';
// ikone
@import url('https://fonts.googleapis.com/css?family=Material+Icons');
// font
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
// tema tablice
@import '~@swimlane/ngx-datatable/release/index.css';
@import '~@swimlane/ngx-datatable/release/themes/material.css';
@import '~@swimlane/ngx-datatable/release/assets/icons.css';
@include mat-core();
// Definicija palete boja
$hbor-primary: mat-palette($mat-blue-grey);
$hbor-accent: mat-palette($mat-blue-grey, 600);
$hbor-warn: mat-palette($mat-red);
$mat-light-theme-background: ( status-bar: map_get($mat-grey, 300), app-bar: map_get($mat-grey, 100), background: map_get($mat-grey, 200), hover: rgba(black, 0.04), card: map_get($mat-grey, 200), dialog: map_get($mat-grey, 200), disabled-button: $black-12-opacity, raised-button: white, focused-button: $black-6-opacity, selected-button: map_get($mat-grey, 300), selected-disabled-button: map_get($mat-grey, 400), disabled-button-toggle: map_get($mat-grey, 200), unselected-chip: map_get($mat-grey, 300), disabled-list-option: map_get($mat-grey, 200), );
$hbor-theme: mat-light-theme($hbor-primary, $hbor-accent, $hbor-warn);

@include angular-material-theme($hbor-theme);
$hbor-typography: mat-typography-config( $font-family: 'Roboto, "Helvetica Neue", sans-serif', $display-4: mat-typography-level(112px, 112px, 300), $display-3: mat-typography-level(56px, 56px, 400), $display-2: mat-typography-level(45px, 48px, 400), $display-1: mat-typography-level(34px, 40px, 400), $headline: mat-typography-level(22px, 28px, 400), $title: mat-typography-level(18px, 26px, 500), $subheading-2: mat-typography-level(14px, 28px, 400), $subheading-1: mat-typography-level(12px, 18px, 400), $body-2: mat-typography-level(14px, 24px, 500), $body-1: mat-typography-level(14px, 20px, 400), $caption: mat-typography-level(12px, 20px, 400), $button: mat-typography-level(14px, 14px, 500), $input: mat-typography-level(14px, 1.125, 400));

// tipografija
@include mat-base-typography($hbor-typography);
@include angular-material-typography($hbor-typography);

.ngx-datatable.material:not(.cell-selection) .datatable-body-row:hover .datatable-row-group {
    background-color: #90afc5;
    transition-property: background;
    transition-duration: .3s;
    transition-timing-function: linear;
    cursor: pointer;
}

.ngx-datatable.material.single-selection .datatable-body-row.active {
    background-color: aliceblue !important;
    color: #ffffff !important;
}

.ngx-datatable.material.single-selection .datatable-body-row.active .datatable-row-group {
    background-color: #90afc5;
    transition-property: background;
    transition-duration: .3s;
    transition-timing-function: linear;
}

.ngx-datatable.material.single-selection .datatable-body-row.active:hover {
    background-color: #90afc5;
    transition-property: background;
    transition-duration: .3s;
    transition-timing-function: linear;
    cursor: pointer;
}

.datatable-body-row.active:hover .datatable-row-group {
    background-color: #90afc5;
    transition-property: background;
    transition-duration: .3s;
    transition-timing-function: linear;
}

.ngx-datatable.material.single-selection .datatable-body-row.active:hover {
    background-color: #90afc5;
    transition-property: background;
    transition-duration: .3s;
    transition-timing-function: linear;
}

.ngx-datatable.material.single-selection .datatable-body-row.active:hover {
    background-color: #90afc5;
    transition-property: background;
    transition-duration: .3s;
    transition-timing-function: linear;
}

.ngx-datatable.material.single-selection .datatable-body-row.active:hover .datatable-row-group {
    background-color: #739ebc;
    transition-property: background;
    transition-duration: .3s;
    transition-timing-function: linear
}
```
Unutar theme smo definiriali i tipografiju te određene stilove za tablicu. Da bi aplikacija učitala themu potrebno je proširiti angular-cli.json sa sljedećim:
```JSON
styles": [
        "styles.css",
        "theme.scss"
      ],
```

Proširiti ćemo i style.css sa određenim stilovima:

```css
body,
html {
    box-sizing: border-box;
    height: 100%;
    overflow-y: hidden;
    min-height: 100%;
    margin: 0;
}

* {
    font-family: 'Roboto';
}

.spacer {
    flex: 1 1 auto;
}

.flex-toolbar {
    display: flex;
}
```

Sada možemo kreirati potrebne komponente i servise za logiku aplikacije.
Pokrećemo sljedeće naredbe iz app direktorija:
```
mkdir http
cd http
ng g s http // Generiramo http servis koji će služiti kao presretač svih http poziva
cd ..
ng g c home // Generiranom home komponentu
ng g c login // Generiramo login komponentu
ng g m app-routing // Generiramo router modul koji definira rute unutar aplikacije
ng g c i-rad // Generiramo i-rad komponentu
ng g m i-rad // Generiramo i-rad modul
cd i-rad
ng g c unos-i-rad // Generiramo unos-i-rad komponentu
cd ..
cd services
ng g s data // Generiramo servis koji će dohvaćati podatke
cd ..
mkdir configuration
cd configuration
ng g s configuration // Generiramo konfiguracijski servis
```

Nakon što izvršimo sve naredbe aplikacija bi trebalo izgledati ovako: 
```
app
  │   app.component.css
  │   app.component.html
  │   app.component.spec.ts
  │   app.component.ts
  │   app.module.ts
  │   
  ├───app-routing
  │       app-routing.module.ts
  │
  ├───configuration
  │       configuration.service.spec.ts
  │       configuration.service.ts
  │       
  ├───home
  │       home.component.css
  │       home.component.html
  │       home.component.spec.ts
  │       home.component.ts
  │
  ├───http
  │       http.service.spec.ts
  │       http.service.ts
  │       
  ├───i-rad
  │   │   i-rad.component.css
  │   │   i-rad.component.html
  │   │   i-rad.component.spec.ts
  │   │   i-rad.component.ts
  │   │   i-rad.module.ts
  │   │   
  │   └───unos-i-rad
  │           unos-i-rad.component.css
  │           unos-i-rad.component.html
  │           unos-i-rad.component.spec.ts
  │           unos-i-rad.component.ts
  │           
  ├───login
  │       login.component.css
  │       login.component.html
  │       login.component.spec.ts
  │       login.component.ts
  │       
  ├───services
  │       communication.service.spec.ts
  │       communication.service.ts
  │       data.service.spec.ts
  │       data.service.ts
  │       
  └───shared
      │   shared.module.ts
      │   
      ├───datum
      │       datum.component.css
      │       datum.component.html
      │       datum.component.spec.ts
      │       datum.component.ts
      │       
      ├───error
      │       error-dialog.component.html
      │       error.component.css
      │       error.component.html
      │       error.component.spec.ts
      │       error.component.ts
      │       
      ├───material
      │       material.module.ts
      │       
      └───ng-templates
              ng-templates.component.css
              ng-templates.component.html
              ng-templates.component.spec.ts
              ng-templates.component.ts
```

Prvo ćemo dodati definirati rute naše aplikacije. Otvaramo app-routing.module.ts i proširujemo ga sa sljedećim. Prvo ćemo dodati definirati rute naše aplikacije. Otvaramo app-routing.module.ts i izmjenjujemo ga sa sljedećim:
```typescript
export const APP_ROUTES: Routes = [
  {
    path: 'login',
    data: {
      breadcrumb: 'Login',
    },
    component: LoginComponent
  },
  {
    path: 'home',
    data: {
      breadcrumb: 'Početna',
    },
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
Dodali smo dvije nove rute 'login' i 'home'. Sada možemo definirati da se na učitavanju aplikacije prvo prikaže login. Otvaramo app.componente.ts klasu te izmjenjujemo sadržaj sa sljedećim:
```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.navigate(['/login'], { skipLocationChange: true });
  }
}
```
Možemo odmah definirati sadržaj app.component.ts: 
```html
<div class="mat-typography">
  <router-outlet></router-outlet>
  <app-error></app-error>
</div>
```

Idući korak proširivanje environment datoteke. Otvaramo environment.ts datoteku i dodajemo link na server:
 ```typescript
export const environment = {
  production: false,
  reportingServer: 'http://sql2014-razvoj',
  server: 'http://localhost:8081/',
};
 ```

 Nakon toga moramo proširiti konfiguracijski servis. Otvaramo configuration.service.ts dodajemo sljedeće:
 ```typescript
const { version: appVersion } = require('../../../package.json');
declare function require(moduleName: string): any;
@Injectable()
export class ConfigurationService {

  static dateLocale = 'hr-HR';
  static serviceDatePattern = 'en-EN';
  // SSRS
  static reportingServer = environment.reportingServer;

  appVersion = appVersion;
  server = environment.server;
}
```
Ovdje se vidi da čitamo link za server iz environmenta.

Idući korak je Dodavanje logike http servis. Otvaramo http.service.ts te dodajemo sljedeće:
```typescript
@Injectable()
export class HttpService extends Http {
  headers: Headers;

  constructor(private http: Http, backend: XHRBackend, options: RequestOptions) {
    super(backend, options);
  }

  request(url: Request, requestOptions?: RequestOptions): Observable<Response> {
    const urlInfo = url.url;
    if (!url.url.includes('http')) {
      url.url = this.configurationService.server + url.url;
    }
    url.withCredentials = false;
    return super.request(url).finally(() => {
    }).catch(this.handleError);
  }

  handleError = (error: any) => {
    this.commmunicationService.publishDataError('Dogodila se HTTP greška');
    return Observable.throw(error);
  }
}
```
Primjećujemo da imamo grešku na ".finally()" metodi. To možemo riješiti tako da bilo gdje unutar aplikacije importamo rxJs operator. Obično ih se dodaje u root aplikacije. Otvaramo app.module.ts i dodajemo sljedeće:
```typescript
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
```
Odmah možemo i dodati naše module:
```typescript
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IRadModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [ConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Kreirati ćemo direktorij model u kojem ćemo definirati naš model.
```
mkdir model
cd model
ng g class gender
ng g class person
ng g class working-position
ng g class department
ng g class employee
ng g class type-of-absence
ng g class working-time
ng g class i-rad
```
Otvoriti ćemo klasu pod nazivom gender.ts te ju proširiti sa sljedećim sadržajem:
```typescript
export class Gender {
    genderid: number;
    abbreviation: string;
    description: string;
}
```
Otvoriti ćemo klasu pod nazivom person.ts te ju proširiti sa sljedećim sadržajem:
```typescript
import { Gender } from './gender';

export class Person {
    personid: number;
    firstname: string;
    middlename?: string;
    lastname: string;
    dateofbirth: number;
    genderid: number;
    gender: Gender;
}
```
Otvoriti ćemo klasu pod nazivom working-position.ts te ju proširiti sa sljedećim sadržajem:
```typescript
export class WorkingPosition {
    workingpositionid: number;
    abbreviation: string;
    description: string;
}
```
Otvoriti ćemo klasu pod nazivom department.ts te ju proširiti sa sljedećim sadržajem:
```typescript
export class Department {
    departmentid: number;
    code: string;
    name: string;
    description: string;
}
```
Otvoriti ćemo klasu pod nazivom employee.ts te ju proširiti sa sljedećim sadržajem:
```typescript
import { Person } from './person';
import { WorkingPosition } from './working-position';
import { Department } from './department';

export class Employee {
    employeeid: number;
    personid: number;
    epid: string;
    departmentworkingpositionid: number;
    dateofemployment: number;
    title: string;
    email: string;
    telephonenumber: string;
    active: boolean;
    digitalsignature?: any;
    person: Person;
    workingPosition: WorkingPosition;
    department: Department;
    isManager: boolean;
}
```
Otvoriti ćemo klasu pod nazivom type-of-absence.ts te ju proširiti sa sljedećim sadržajem:
```typescript
export class TypeOfAbsence {
    checked: any;
    typeofabsenceid: number;
    abbreviation: string;
    description: string;
}
```
Otvoriti ćemo klasu pod nazivom working-position.ts te ju proširiti sa sljedećim sadržajem:
```typescript
export class WorkingPosition {
    workingpositionid: number;
    abbreviation: string;
    description: string;
}
```
Otvoriti ćemo klasu pod nazivom i-rad.ts te ju proširiti sa sljedećim sadržajem:
```typescript
import { TypeOfAbsence } from './type-of-absence';
import { WorkingTime } from './working-time';

export class IRad {
  iradid: number;
  employeeid: number;
  documentid: number;
  absencedatestart: any;
  absencedateend: any;
  reason: string;
  departmentmanagerid: number;
  dateofcreation: number;
  signatureemplyoee: string;
  signaturemanager: string;
  validated: boolean;
  typeOfAbsences: TypeOfAbsence[];
  workingTimes: WorkingTime[];
  manager: Manager;
}
```
Iduće moramo ažurirati data servis te communication servis.
Otvaramo data.service.ts i dodajemo sljedeće:
```typescript
export class DataService {
  url = '';
  constructor(private http: HttpService) {

  }

  public getEmployeeByEmail(email: string): Observable<any> {
    this.url = 'emplyoees?email=' + email;
    const result = this.http
      .get(this.url)
      .map((response: Response) => <any>response.json());
    return result;
  }

  public getManagerByDepartmentCode(departmentCode: string, isManager: boolean): Observable<any> {
    this.url = 'emplyoees?departmentCode=' + departmentCode + '&isManager=' + isManager;
    const result = this.http
      .get(this.url)
      .map((response: Response) => <any>response.json());
    return result;
  }

  public getIRadsByEmployeeId(employeeId: any): Observable<any> {
    this.url = 'documents/irads?employeeId=' + employeeId;
    const result = this.http
      .get(this.url)
      .map((response: Response) => <any>response.json());
    return result;
  }

  public postIRad(object: IRad): Observable<any> {
    this.url = 'documents/irads/';
    const result = this.http
      .post(this.url, object)
      .map((response: Response) => <any>response);
    return result;
  }

  public putIRad(object: IRad): Observable<any> {
    this.url = 'documents/irads/';
    const result = this.http
      .put(this.url + object.iradid, object)
      .map((response: Response) => <any>response);
    return result;
  }

  public deleteIRad(iradid: number): Observable<any> {
    this.url = 'documents/irads/' + iradid;
    const result = this.http
      .delete(this.url)
      .map((response: Response) => <any>response);
    return result;
  }

  public getTypesOfAbsence(): Observable<any> {
    this.url = 'absences/types';
    const result = this.http
      .get(this.url)
      .map((response: Response) => <any>response.json());
    return result;
  }
```
Tu smo definirali metode koje ćemo koristiti za komunikaciju sa serverom.

Otvaramo communication.service.ts i dodajemo sljedeće:
```typescript
static employeeRaw: Employee;
static managerRaw: Employee;
private employee = new Subject<Employee>();
private manager = new Subject<Employee>();
private refresh = new Subject<boolean>();
private error = new Subject<string>();

// Observable streams
employee$ = this.employee.asObservable();
manager$ = this.manager.asObservable();
refresh$ = this.refresh.asObservable();
error$ = this.error.asObservable();

// Service message commands
publishDataEmployee(state: Employee) {
  CommunicationService.employeeRaw = state;
  this.employee.next(state);
}

publishDataManager(state: Employee) {
  CommunicationService.managerRaw = state;
  this.employee.next(state);
}

publishDataRefresh(state: boolean) {
  this.refresh.next(state);
}

publishDataError(data: string) {
  this.error.next(data);
}
```
Dodali smo još dvije metode "publishDataEmployee" i "publishDataManager" sa kojima pohranjujemo u memoriju dohvaćene podatke.

Idući je korak dorada login komponente. Otvaramo login.component.ts te dodajemo sljedeće:
```typescript
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataService, HttpService]
})
export class LoginComponent implements OnInit {
  emailFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router,
  private communicationService: CommunicationService,private dataService: DataService) {

  }

  ngOnInit(): void {
    this.emailFormGroup = this.formBuilder.group({
      email: ['', Validators.required]
    });
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.emailFormGroup.valid && this.passwordFormGroup.valid) {
      this.dataService
        .getEmployeeByEmail(this.emailFormGroup.controls.email.value)
        .subscribe(
          (response) => {
            this.communicationService.publishDataEmployee(response.data[0]);
          },
          error => console.log(<any>error),
          (() => {
            this.dataService
              .getManagerByDepartmentCode(CommunicationService.employeeRaw.department.code, true)
              .subscribe(
                (response) => {
                  this.communicationService.publishDataManager(response.data[0]);
                },
                error => console.log(<any>error),
                (() => {
                  this.router.navigate(['/home'], { skipLocationChange: true });
                }));
          }));
    } else {
      this.communicationService.publishDataError('Niste popunili sva polja!');
    }
  }
}
```
Ovdje vidimo da kada korisnik pošalje forme one se validiraju te se dohvaća employee i njegov manager. Ako je sve uredu podaci se spreme i router aplikacije na odvede na home komponentu.

Dodajemo template login komponente. Otvaramo login.component.html i dodajemo sljedeće:
```html
<div class="card centered">
  <mat-card>
    <img src="assets/logos/hbor-square.png">
    <mat-card-header>
      <mat-card-title>Prijava</mat-card-title>
      <mat-card-subtitle>Prijavite se da bi ste mogli koristiti aplikaciju</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <mat-horizontal-stepper [linear]="true" #stepper="matHorizontalStepper">
        <mat-step [stepControl]="emailFormGroup">
          <form [formGroup]="emailFormGroup">
            <ng-template matStepLabel>Unesite email adresu</ng-template>
            <mat-form-field>
              <input matInput placeholder="Email adresa" formControlName="email" required>
            </mat-form-field>
            <div>
              <button mat-raised-button color="primary" matStepperNext>Dalje</button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="passwordFormGroup">
          <form [formGroup]="passwordFormGroup">
            <ng-template matStepLabel>Unesite zaporku</ng-template>
            <mat-form-field>
              <input matInput placeholder="Zaporka" formControlName="password" required>
            </mat-form-field>
            <div>
              <button mat-button matStepperPrevious>Nazad</button>
              <button mat-raised-button type="button" color="primary" (click)="submit()">Podnesi</button>
            </div>
          </form>
        </mat-step>
      </mat-horizontal-stepper>
    </mat-card-content>
    <mat-card-actions>
    </mat-card-actions>
  </mat-card>
</div>
```
Komponenta koristi sliku pa ju moramo ubaciti u assets direktorij.
Moramo proširiti i .css login komponente:
```css
.card {
    height: 300px;
    width: 500px;
}

.centered {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -300px;
    margin-left: -250px;
}
```

Idući je korak proširivanje home komponente. Otvaramo klasu home.component.ts te dodajemo sljedeće:
```typescript
export class HomeComponent implements OnInit {
  employee: any;
  constructor(private communicationService: CommunicationService) {
    this.employee = CommunicationService.employeeRaw;
  }
```
Ovdje se samo vežemo na communication servis i povlačimo podatke o korisniku koji su tamo pohranjeni da ih možemo prikazati u template-u komponente:
```html
<mat-toolbar color="primary">
  <mat-toolbar-row>
    <span>Automatizacija I-Rad obrazaca</span>
    <span class="spacer"></span>
    <span *ngIf="employee">
      <span *ngIf="employee.person.gender.abbreviation === 'M'">
        Dobrodošli don {{employee.person.firstname}} {{employee.person.lastname}}
      </span>
      <span *ngIf="employee.person.gender.abbreviation === 'Ž'">
        Dobrodošli gđa {{employee.person.firstname}} {{employee.person.lastname}}
      </span>
    </span>
    <mat-icon class="icon">verified_user</mat-icon>
  </mat-toolbar-row>
</mat-toolbar>
<div style="padding: 20px;">
  <app-i-rad></app-i-rad>
</div>
```
Dodali smo uvijet koji detektira spol iz employee objekta te ovisno o spolu prikazuje različit tekst.
Također smo pozvali i-rad komponentu. I-rad komponenta će u sebi sadržavati tablicu te gumbe koji će omogućiti unos ili čitanje podatkaka iz tablice. Idemo prvo proširiti i-rad.module.ts tako da možemo koristiti komponente koje smo definirali u zajedničkom modulu:
```typescript
@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [IRadComponent, UnosIRadComponent],
  exports: [IRadComponent, UnosIRadComponent],
  entryComponents: [UnosIRadComponent],
  providers: [CommunicationService]
})
export class IRadModule { }
```
Nakon toga možemo izmjeniti i-rad.component.ts:
```typescript
@Component({
  selector: 'app-i-rad',
  templateUrl: './i-rad.component.html',
  styleUrls: ['./i-rad.component.css'],
  providers: [DataService, HttpService]
})
export class IRadComponent implements OnInit, OnDestroy {
  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input() searchPlaceholder = 'Unesite razlog I-Rad obrasca za pretragu...';
  @Input() rows: IRad[];
  @Input() selected: IRad;
  @Input() columns: any[];
  @Input() temp = [];
  @Input() height;
  @Input() hideSearch = false;
  @Input() headerHeight = 50;
  @Input() limit: number;
  @Input() columnMode = 'standard';
  @Input() searchProp = 'reason';
  subscriptionRefresh: Subscription;
  dataLoaded = false;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(NgTemplatesComponent) templates: NgTemplatesComponent;

  constructor(private communicationService: CommunicationService, private dataService: DataService,
    public dialog: MatDialog) {
    this.subscriptionRefresh = this.communicationService.refresh$.subscribe(
      data => {
        console.log('refresh');
        if (data) {
          this.getData();
          this.selected = null;
        }
      });
  }

  ngOnInit() {
    this.columns = [
      { name: 'Datum kreiranja', prop: 'dateofcreation', width: 150, cellTemplate: this.templates.templateDate },
      { name: 'Datum ispravka Od', prop: 'absencedatestart', width: 150, cellTemplate: this.templates.templateDate },
      { name: 'Datum ispravka Do', prop: 'absencedateend', width: 150, cellTemplate: this.templates.templateDate },
      { name: 'Razlog', prop: 'reason', width: 150 },
      { name: 'Potvrđen', prop: 'validated', width: 150 },
      { name: 'Nadređeni', prop: 'manager.person.fullname', width: 150 },
      { name: 'Radno mjesto nadređenog', prop: 'manager.title', width: 300 },
      { name: 'Telefon nadređenog', prop: 'manager.telephonenumber', width: 150 },
      { name: 'Email nadređenog', prop: 'manager.email', width: 150 },
    ];
    this.getData();
  }

  ngOnDestroy() {
    this.subscriptionRefresh.unsubscribe();
  }

  getData() {
    this.dataService.getIRadsByEmployeeId(CommunicationService.employeeRaw.employeeid).subscribe(
      (response) => {
        this.rows = this.formatRows(response.data);
        this.temp = [...this.rows];
      },
      error => console.log(<any>error),
      (() => {
        this.dataLoaded = true;
      })
    );
  }

  formatRows(rows: any): any {
    rows.forEach(element => {
      element.manager.person.fullname =
        element.manager.person.firstname + ' '
        + (element.manager.person.middlename != null ? element.manager.person.middlename : '') + ' ' + element.manager.person.lastname;
    });
    return rows;
  }

  updateFilter(event) {
    let val;
    let temp = [];
    val = event.target.value.toLowerCase();
    if (this.searchProp != null) {
      temp = this.temp.filter(row => row[this.searchProp].toString().toLowerCase().indexOf(val) !== -1 || !val);
    }
    this.rows = temp;
    this.table.offset = 0;
  }


  onSelect(event) {
    this.selected = event.selected[0];
    console.log(this.selected);
    this.itemSelected.emit(this.selected);
  }

  createIRad() {
    const dialogRef = this.dialog.open(UnosIRadComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.getData();
      }
    });
  }

  editIRad() {
    const dialogRef = this.dialog.open(UnosIRadComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.row = this.selected;
    dialogRef.componentInstance.title = 'Izmjena I-Rad-a';
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  viewIRad() {
    const dialogRef = this.dialog.open(UnosIRadComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.row = this.selected;
    dialogRef.componentInstance.title = 'Pregled I-Rad-a';
    dialogRef.componentInstance.disabled = true;
  }

  deleteIRad() {
    if (this.selected.iradid) {
      this.dataService.deleteIRad(this.selected.iradid).subscribe(
        (response) => {

        },
        error => console.log(<any>error),
        (() => {
          this.communicationService.publishDataRefresh(true);
        }));
    }
  }
```
Ovdje smo napravili više toga, u konstruktoru smo kreirali supskripciju na refresh observable objekt. Promjenom stanja pokrenuti će se dohvat podataka što će efektivno ažurirati tablicu.
```typescript
constructor(private communicationService: CommunicationService, private dataService: DataService,
  public dialog: MatDialog) {
  this.subscriptionRefresh = this.communicationService.refresh$.subscribe(
    data => {
      console.log('refresh');
      if (data) {
        this.getData();
        this.selected = null;
      }
    });
}
```
U ngOnInit metodi smo definirali kolone i njihove template ako je to bilo potrebno te smo pozvali dohvat podataka za tablicu
```typescript
ngOnInit() {
    this.columns = [
      { name: 'Datum kreiranja', prop: 'dateofcreation', width: 150, cellTemplate: this.templates.templateDate },
      { name: 'Datum ispravka Od', prop: 'absencedatestart', width: 150, cellTemplate: this.templates.templateDate },
      { name: 'Datum ispravka Do', prop: 'absencedateend', width: 150, cellTemplate: this.templates.templateDate },
      { name: 'Razlog', prop: 'reason', width: 150 },
      { name: 'Potvrđen', prop: 'validated', width: 150 },
      { name: 'Nadređeni', prop: 'manager.person.fullname', width: 150 },
      { name: 'Radno mjesto nadređenog', prop: 'manager.title', width: 300 },
      { name: 'Telefon nadređenog', prop: 'manager.telephonenumber', width: 150 },
      { name: 'Email nadređenog', prop: 'manager.email', width: 150 },
    ];
    this.getData();
  }
  ```
  Metoda getData poziva data servis koji dohvaća podatke, po završetku dohvata dataLoaded varijabla se setira na true što onda potvrđuje uvjet u template-u koji je inicijalno sprječavao prikaz tablice. Metoda formatRows obogaćuje podatke:
  ```typescript
  getData() {
    this.dataService.getIRadsByEmployeeId(CommunicationService.employeeRaw.employeeid).subscribe(
      (response) => {
        this.rows = this.formatRows(response.data);
        this.temp = [...this.rows];
      },
      error => console.log(<any>error),
      (() => {
        this.dataLoaded = true;
      })
    );
  }

  formatRows(rows: any): any {
    rows.forEach(element => {
      element.manager.person.fullname =
        element.manager.person.firstname + ' '
        + (element.manager.person.middlename != null ? element.manager.person.middlename : '') + ' ' + element.manager.person.lastname;
    });
    return rows;
  }
}
```
Na tablicu smo dodali i tražilicu pa smo napravili i metodu koja filtrira redove po određenom parametru:
```typescript
updateFilter(event) {
  let val;
  let temp = [];
  val = event.target.value.toLowerCase();
  if (this.searchProp != null) {
    temp = this.temp.filter(row => row[this.searchProp].toString().toLowerCase().indexOf(val) !== -1 || !val);
  }
  this.rows = temp;
  this.table.offset = 0;
}
```
Metoda onSelect pohranjuje u varijablu redak na koji se odabere u tablici:
```typescript
onSelect(event) {
  this.selected = event.selected[0];
  console.log(this.selected);
  this.itemSelected.emit(this.selected);
}
```
Metoda createIRad se poziva ukoliko odaberemo novi unos:
```typescript
createIRad() {
  const dialogRef = this.dialog.open(UnosIRadComponent, {
    disableClose: true
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if (result) {
      this.getData();
    }
  });
}
```
Metoda editIRad se poziva ukoliko odaberemo izmjenu:
```typescript
  editIRad() {
    const dialogRef = this.dialog.open(UnosIRadComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.row = this.selected;
    dialogRef.componentInstance.title = 'Izmjena I-Rad-a';
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }
```
Metoda viewIRad se poziva ukoliko odaberemo pregled:
```typescript
viewIRad() {
  const dialogRef = this.dialog.open(UnosIRadComponent, {
    disableClose: true
  });
  dialogRef.componentInstance.row = this.selected;
  dialogRef.componentInstance.title = 'Pregled I-Rad-a';
  dialogRef.componentInstance.disabled = true;
}
```
Metoda deleteIRad se poziva ukoliko odaberemo brisanje:
```typescript
deleteIRad() {
  if (this.selected.iradid) {
    this.dataService.deleteIRad(this.selected.iradid).subscribe(
      (response) => {

      },
      error => console.log(<any>error),
      (() => {
        this.communicationService.publishDataRefresh(true);
      }));
  }
}
```
Template komponente moramo proširiti sa toolbarom, tablicom i tražilicom:
```html
<app-ng-templates></app-ng-templates>
<div class="flex-toolbar" style="padding-bottom: 20px">
  <div style="padding: 10px;">
    <button color="primary" mat-raised-button (click)="createIRad()">Novi</button>
  </div>
  <div style="padding: 10px;">
    <button color="primary" mat-raised-button (click)="editIRad()">Izmjena</button>
  </div>
  <div style="padding: 10px;">
    <button color="primary" mat-raised-button (click)="viewIRad()">Pregled</button>
  </div>
  <span class="spacer"></span>
  <div style="padding: 10px;">
    <button color="primary" mat-raised-button (click)="deleteIRad()">Brisanje</button>
  </div>
</div>
<div *ngIf="dataLoaded">
  <mat-form-field style="min-width: 400px">
    <input matInput [placeholder]="searchPlaceholder" (input)='updateFilter($event)'>
    <button *ngIf="inputTekst" mat-button matSuffix mat-icon-button aria-label="Očisti" (click)="inputTekst=''; updateFilter($event, true);">
      <mat-icon>close</mat-icon>
    </button>
    <button [disabled]="true" style="width: 24px; height: 24px;" mat-button matSuffix mat-icon-button>
      <mat-icon style="width: 24px; height: 24px; line-height: 24px; font-size: 24px; color: #7d7d7d">search</mat-icon>
    </button>
  </mat-form-field>
  <div>
    <ngx-datatable #table class="material striped" [loadingIndicator]="false" [columns]="columns" [columnMode]="columnMode" [headerHeight]="headerHeight"
      [footerHeight]="50" [rowHeight]="rowHeight" [limit]="limit" [scrollbarH]="scrollbarH" [rows]='rows' [scrollbarV]="scrollbarV"
      [selectionType]="'single'" (select)='onSelect($event)' (page)="onPage($event)" [messages]="{emptyMessage: 'Nema podataka',  totalMessage: 'Ukupno'}">
    </ngx-datatable>
  </div>
</div>
```
Preostalo nam je proširivanje unos-i-rad komponente. Moramo dodati polja u koja će korisnik unositi podatke, dodati određenu validaciju polja te kreirati metodu koja će slati podatke na rest servis. Znamo da ćemo imati nekoliko checkbox odabira koji će odgovarati tipu izostanka no nemamo fiksan broj tipova pa nema smisla keirati statičku komponentu nego ćemo napraviti komponentu čiji će se sadržaj kreirati ovisno o dohvaćenim podacima iz baze. Prvo moramo kreirati komponentu:
```
cd shared
ng g c tipovi-izostanka
```
Moramo ju exporati iz zajedničkog modula kako bismo ju mogli koristiti u unos-i-rad komponenti:
```typescript
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DatumComponent,
    ErrorComponent,
    NgTemplatesComponent,
    TipoviIzostankaComponent
  ],
  exports: [
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
    DatumComponent,
    ErrorComponent,
    NgTemplatesComponent,
    TipoviIzostankaComponent
  ]
})
export class SharedModule { }
```
U klasu tipovi-izostanka.ts dodajemo sljedeće:
```typescript
@Component({
  selector: 'app-tipovi-izostanka',
  templateUrl: './tipovi-izostanka.component.html',
  styleUrls: ['./tipovi-izostanka.component.css'],
  providers: [DataService, HttpService]
})
export class TipoviIzostankaComponent implements OnInit, OnChanges {
  @Output() checkedValues: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() inputTypeOfAbsences: TypeOfAbsence[];
  @Input() disabled = false;
  types: TypeOfAbsence[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTypesOfAbsence().subscribe(
      (response) => {
        this.types = response.data;
      },
      error => console.log(<any>error),
      (() => {
        this.setParentValue();
      })
    );
  }

  ngOnChanges() {
    this.setParentValue();
  }

  setParentValue() {
    if (this.types && this.inputTypeOfAbsences) {
      this.inputTypeOfAbsences.forEach(elementRecived => {
        this.types.forEach(element => {
          if (elementRecived.typeofabsenceid === element.typeofabsenceid) {
            element.checked = true;
          }
        });
      });
    }
  }

  emitValues() {
    const checkedValues: TypeOfAbsence[] = [];
    this.types.forEach(element => {
      if (element.checked) {
        checkedValues.push(element);
      }
    });
    this.checkedValues.emit(checkedValues);
  }
}
```
Kada se komponenta inicijalizira dohvati se lista mogućih tipova izostanka. Kada se komponenta koristi u svrhu prikaza podatka posljeđuje joj se lista tipova koji su odabrani te se ta lista obradi u metodi setParentValues. Metoda emitValues kreira event kojim se šalje lista odabranih tipova, te na taj način komuniciramo sa parent komponentom. Template komponente šimo sa sljedećim:
```html
<mat-card *ngIf="types">
  <mat-card-content>
    <section>
      <div *ngFor="let type of types">
        <mat-checkbox [(ngModel)]="type.checked" (change)="emitValues(type)" align="start" [disabled]="disabled">
          {{type.description}}
        </mat-checkbox>
      </div>
    </section>
  </mat-card-content>
</mat-card>
```
Koristimo *ngFor koji nam omogućuje da dinimački kreiramo dodatni html. Svaki element liste kad se klikne na njega poziva metodu emitValues te joj posljeđuje svoj tip.

Sada imamo sve potrebno za kreiranje unos-i-rad komponente. Otvaramo klasu unos-i-rad.component.ts i dodajemo sljedeće:
```typescript
@Component({
  selector: 'app-unos-i-rad',
  templateUrl: './unos-i-rad.component.html',
  styleUrls: ['./unos-i-rad.component.css'],
  providers: [DataService, HttpService]
})
export class UnosIRadComponent implements OnInit {
  iRadForm: FormGroup;
  title = 'Unos I-Rad-a';
  row: IRad = new IRad();
  workingTimes: any;
  put = false;
  disabled = false;
  checkedTypeOfAbsence: TypeOfAbsence[] = [];

  constructor(private communicationService: CommunicationService, private formBuilder: FormBuilder,
    private dataService: DataService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.iRadForm = this.formBuilder.group({
      absencedatestart: [{ value: new Date(this.row.absencedatestart), disabled: this.disabled }, [<any>Validators.required]],
      absencedateend: [{ value: new Date(this.row.absencedateend), disabled: this.disabled }, [<any>Validators.required]],
      reason: [{ value: this.row.reason, disabled: this.disabled }, [<any>Validators.required]],
      dateofcreation: [{ value: new Date(this.row.dateofcreation), disabled: this.disabled }, [<any>Validators.required]],
      workingTimes: new FormArray([])
    });
    if (this.row && this.row.workingTimes) {
      this.row.workingTimes.forEach(element => {
        this.addItem(element);
      });
    } else {
      this.addItem();
    }
    // Debug
    this.iRadForm.valueChanges.subscribe(() => {
      console.log(this.iRadForm.value);
    });
  }

  get workingTimesData() { return <FormArray>this.iRadForm.get('workingTimes'); }

  addItem(item?: WorkingTime): void {
    (this.iRadForm.get('workingTimes') as FormArray).push(this.createFormItem(item));
  }

  removeItem(index?: number): void {
    (this.iRadForm.get('workingTimes') as FormArray).removeAt(index);
  }

  createFormItem(item?: WorkingTime): FormGroup {
    let createdItem;
    if (item) {
      createdItem = this.formBuilder.group({
        date: [{ value: new Date(item.date), disabled: this.disabled }, [<any>Validators.required]],
        starttime: [{ value: this.convertMillisToTime(item.starttime), disabled: this.disabled }, [<any>Validators.required]],
        endtime: [{ value: this.convertMillisToTime(item.endtime), disabled: this.disabled }, [<any>Validators.required]],
      });
    } else {
      createdItem = this.formBuilder.group({
        date: ['', [<any>Validators.required]],
        starttime: ['', [<any>Validators.required]],
        endtime: ['', [<any>Validators.required]],
      });
    }
    return createdItem;
  }

  setCheckedValues(object: TypeOfAbsence[]) {
    this.checkedTypeOfAbsence = object;
  }

  save(model: IRad, isValid: boolean) {
    if (isValid && this.iRadForm.valid) {
      this.row = this.iRadForm.getRawValue();
      this.row.typeOfAbsences = this.checkedTypeOfAbsence;
      this.row.employeeid = CommunicationService.employeeRaw.employeeid;
      this.row.manager = CommunicationService.managerRaw;
      this.row = this.formatDates(this.row);
      if (!this.put) {
        this.dataService.postIRad(this.row).subscribe(
          (response) => {

          },
          error => console.log(<any>error),
          (() => {
            this.communicationService.publishDataRefresh(true);
            this.matDialog.closeAll();
          }));
      } else {
        this.dataService.putIRad(this.row).subscribe(
          (response) => {

          },
          error => console.log(<any>error),
          (() => {
            this.communicationService.publishDataRefresh(true);
            this.matDialog.closeAll();
          }));
      }
    } else {
      this.communicationService.publishDataError('Niste popunili sva obavezna polja!');
    }
  }

  formatDates(object: IRad): IRad {
    object.absencedatestart = new Date(object.absencedatestart).getTime();
    object.absencedateend = new Date(object.absencedateend).getTime();
    object.dateofcreation = new Date(object.dateofcreation).getTime();
    object.workingTimes.forEach(element => {
      element.date = new Date(object.dateofcreation).getTime();
      element.starttime = this.formatTimes(element.starttime);
      element.endtime = this.formatTimes(element.endtime);
    });
    return object;
  }

  formatTimes(object: string): number {
    // tslint:disable-next-line:radix
    const hours = parseInt(object.split(':')[0]);
    // tslint:disable-next-line:radix
    const minutes = parseInt(object.split(':')[1]);
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
  }

  convertMillisToTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getHours() / 10 >= 1 ? date.getHours().toString() : '0' + date.getHours().toString();
    const minutes = date.getMinutes() / 10 >= 1 ? date.getMinutes().toString() : '0' + date.getMinutes().toString();
    return hours + ':' + minutes;
  }
}
```

Budući da želimo omogućiti dodavanje više radnih vremena na primjer od 08:00 do 12:00 i 13:00 do 17:00, morali smo kreirati neke dodatne metode koje nam omogućuju dinamičko kreiranje unosnih polja. Izveli smo to na relativno jednostavna način. Prvo smo kreirali u onInit metodi grupu osnovnih kontrola:
```typescript
ngOnInit() {
    this.iRadForm = this.formBuilder.group({
      absencedatestart: [{ value: new Date(this.row.absencedatestart), disabled: this.disabled }, [<any>Validators.required]],
      absencedateend: [{ value: new Date(this.row.absencedateend), disabled: this.disabled }, [<any>Validators.required]],
      reason: [{ value: this.row.reason, disabled: this.disabled }, [<any>Validators.required]],
      dateofcreation: [{ value: new Date(this.row.dateofcreation), disabled: this.disabled }, [<any>Validators.required]],
      workingTimes: new FormArray([])
    });
    if (this.row && this.row.workingTimes) {
      this.row.workingTimes.forEach(element => {
        this.addItem(element);
      });
    } else {
      this.addItem();
    }
    // Debug
    this.iRadForm.valueChanges.subscribe(() => {
      console.log(this.iRadForm.value);
    });
  }
```
Kao što vidimo zadnji član grupe je tipa FormArray. Ako komponenta zaprimi listu workingTimes-a na primjer ako se radi o pregledu dinamički će se kreirati kontrol za svaki zaprimljeni element liste.
Dodavanje, dohvat i uklanjanje se vrši sa sljedećim metodama:
```typescript
get workingTimesData() { return <FormArray>this.iRadForm.get('workingTimes'); }

addItem(item?: WorkingTime): void {
  (this.iRadForm.get('workingTimes') as FormArray).push(this.createFormItem(item));
}

removeItem(index?: number): void {
  (this.iRadForm.get('workingTimes') as FormArray).removeAt(index);
}
```
Metoda addItem poziva metodu createFormItem koja ima opcijonalni parametar koji ako zaprimi će setirati njegove vrijednosti u sam element forme:
```typescript
createFormItem(item?: WorkingTime): FormGroup {
    let createdItem;
    if (item) {
      createdItem = this.formBuilder.group({
        date: [{ value: new Date(item.date), disabled: this.disabled }, [<any>Validators.required]],
        starttime: [{ value: this.convertMillisToTime(item.starttime), disabled: this.disabled }, [<any>Validators.required]],
        endtime: [{ value: this.convertMillisToTime(item.endtime), disabled: this.disabled }, [<any>Validators.required]],
      });
    } else {
      createdItem = this.formBuilder.group({
        date: ['', [<any>Validators.required]],
        starttime: ['', [<any>Validators.required]],
        endtime: ['', [<any>Validators.required]],
      });
    }
    return createdItem;
  }
```

Metoda setCheckedValues se poziva iz templatea kada se u komponenti tipovi-izostanka izmjeni odabir:
```typescript
setCheckedValues(object: TypeOfAbsence[]) {
  this.checkedTypeOfAbsence = object;
}
```

Metoda save validira formu te obvisno o parametru put šalje podatke u odgovarajuće metode u data servisu. Dodatno po završetku servisa šalje informaciju da je potreban refresh tablice:
```typescript
save(model: IRad, isValid: boolean) {
  if (isValid && this.iRadForm.valid) {
    this.row = this.iRadForm.getRawValue();
    this.row.typeOfAbsences = this.checkedTypeOfAbsence;
    this.row.employeeid = CommunicationService.employeeRaw.employeeid;
    this.row.manager = CommunicationService.managerRaw;
    this.row = this.formatDates(this.row);
    console.log('Save...: ', this.row);
    if (!this.put) {
      this.dataService.postIRad(this.row).subscribe(
        (response) => {

        },
        error => console.log(<any>error),
        (() => {
          this.communicationService.publishDataRefresh(true);
          this.matDialog.closeAll();
        }));
    } else {
      this.dataService.putIRad(this.row).subscribe(
        (response) => {

        },
        error => console.log(<any>error),
        (() => {
          this.communicationService.publishDataRefresh(true);
          this.matDialog.closeAll();
        }));
    }
  } else {
    this.communicationService.publishDataError('Niste popunili sva obavezna polja!');
  }
}
```
Metoda formatDates pretvara datume u odgovarajući format koji se može poslati na servis:
```typescript
formatDates(object: IRad): IRad {
  object.absencedatestart = new Date(object.absencedatestart).getTime();
  object.absencedateend = new Date(object.absencedateend).getTime();
  object.dateofcreation = new Date(object.dateofcreation).getTime();
  object.workingTimes.forEach(element => {
    element.date = new Date(object.dateofcreation).getTime();
    element.starttime = this.formatTimes(element.starttime);
    element.endtime = this.formatTimes(element.endtime);
  });
  return object;
}

formatTimes(object: string): number {
  // tslint:disable-next-line:radix
  const hours = parseInt(object.split(':')[0]);
  // tslint:disable-next-line:radix
  const minutes = parseInt(object.split(':')[1]);
  return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
}
```
Zbog toga što dinamički kreiramo djelove unosne forme template je malo kompliciraniji nego do sad:
```html
<h1 mat-dialog-title>{{title}}</h1>
<form [formGroup]="iRadForm" novalidate (submit)="save(iRadForm.value, iRadForm.valid)">
  <div mat-dialog-content>
    <div>
      <app-datum #absencedatestart [disabled]="disabled" [dateFormControl]="iRadForm.controls.absencedatestart" [placeholder]="'Datum izostanka od'"></app-datum>
      <app-datum #absencedateend [disabled]="disabled" [dateFormControl]="iRadForm.controls.absencedateend" [placeholder]="'Datum izostanka do'"></app-datum>
    </div>
    <div>
      <app-tipovi-izostanka [disabled]="disabled" [inputTypeOfAbsences]="row.typeOfAbsences" (checkedValues)="setCheckedValues($event)"></app-tipovi-izostanka>
    </div>
    <div style="padding-top: 20px;">
      <mat-form-field>
        <input matInput formControlName="reason" placeholder="Razlog">
      </mat-form-field>
    </div>
    <div formArrayName="workingTimes">
      <h3 mat-dialog-title>Trajanje radnog vremena:</h3>
      <div *ngFor="let workingTime of workingTimesData.controls; let i = index;">
        <div [formGroupName]="i">
          <app-datum [disabled]="disabled" [dateFormControl]="workingTime.controls.date" [placeholder]="'Datum izostanka od'"></app-datum>
          <mat-form-field>
            <input type="time" matInput formControlName="starttime" placeholder="Vijeme izostanka od">
          </mat-form-field>
          <mat-form-field>
            <input type="time" matInput formControlName="endtime" placeholder="Vijeme izostanka do">
          </mat-form-field>
          <button type="button" [disabled]="disabled" mat-button matSuffix mat-icon-button aria-label="Ukloni" (click)="removeItem(i)">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </div>
      <div style="padding-bottom: 15px;">
        <button type="button" [disabled]="disabled" color="primary" mat-raised-button (click)="addItem()">Dodaj novo vrijeme</button>
      </div>
    </div>
    <div>
      <app-datum #dateofcreation [disabled]="disabled" [dateFormControl]="iRadForm.controls.dateofcreation" [placeholder]="'Datum kreiranja'"></app-datum>
    </div>
  </div>
  <div mat-dialog-actions align="end">
    <button type="button" mat-button matDialogClose color="warn">Odustani</button>
    <section [hidden]="disabled">
      <button mat-button id="submit" type="submit" color="primary" cdkFocusInitial>Spremi</button>
    </section>
  </div>
</form>
```
Morali smo cijeli template obuhvatiti sa <form> anotacijom. Dio kojim korisnik proširuje unosnu form je sljedeći:
```html
<div formArrayName="workingTimes">
  <h3 mat-dialog-title>Trajanje radnog vremena:</h3>
  <div *ngFor="let workingTime of workingTimesData.controls; let i = index;">
    <div [formGroupName]="i">
      <app-datum [disabled]="disabled" [dateFormControl]="workingTime.controls.date" [placeholder]="'Datum izostanka od'"></app-datum>
      <mat-form-field>
        <input type="time" matInput formControlName="starttime" placeholder="Vijeme izostanka od">
      </mat-form-field>
      <mat-form-field>
        <input type="time" matInput formControlName="endtime" placeholder="Vijeme izostanka do">
      </mat-form-field>
      <button type="button" [disabled]="disabled" mat-button matSuffix mat-icon-button aria-label="Ukloni" (click)="removeItem(i)">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  </div>
  <div style="padding-bottom: 15px;">
    <button type="button" [disabled]="disabled" color="primary" mat-raised-button (click)="addItem()">Dodaj novo vrijeme</button>
  </div>
</div>
```
Vidimo da se koristi *ngFor="let workingTime of iRadForm.get('workingTimes').controls; let i = index;" za kreiranje samog templatea. Kad se klikne na "Dodaj novo vrijeme" pozove se metoda addItem koja proširi workingTimes formArray kroz koji iteriramo da keriramo nova polja za unos. No da bi se povezali sa tim novo krerianim poljima moramo definirati novi formGroupName koji odogovara indexu liste formArray-a.

Time smo završili aplikaciju. Konačna struktura:
```
app
  │   app.component.css
  │   app.component.html
  │   app.component.spec.ts
  │   app.component.ts
  │   app.module.ts
  │   
  ├───app-routing
  │       app-routing.module.ts
  │       
  ├───configuration
  │       configuration.service.spec.ts
  │       configuration.service.ts
  │       
  ├───home
  │       home.component.css
  │       home.component.html
  │       home.component.spec.ts
  │       home.component.ts
  │       
  ├───http
  │       http.service.spec.ts
  │       http.service.ts
  │       
  ├───i-rad
  │   │   i-rad.component.css
  │   │   i-rad.component.html
  │   │   i-rad.component.spec.ts
  │   │   i-rad.component.ts
  │   │   i-rad.module.ts
  │   │   
  │   └───unos-i-rad
  │           unos-i-rad.component.css
  │           unos-i-rad.component.html
  │           unos-i-rad.component.spec.ts
  │           unos-i-rad.component.ts
  │           
  ├───login
  │       login.component.css
  │       login.component.html
  │       login.component.spec.ts
  │       login.component.ts
  │       
  ├───model
  │       department.ts
  │       employee.ts
  │       gender.ts
  │       irad.ts
  │       person.ts
  │       type-of-absence.ts
  │       working-position.ts
  │       working-time.ts
  │       
  ├───services
  │       communication.service.spec.ts
  │       communication.service.ts
  │       data.service.spec.ts
  │       data.service.ts
  │       
  └───shared
    │   shared.module.ts
    │   
    ├───datum
    │       datum.component.css
    │       datum.component.html
    │       datum.component.spec.ts
    │       datum.component.ts
    │       
    ├───error
    │       error-dialog.component.html
    │       error.component.css
    │       error.component.html
    │       error.component.spec.ts
    │       error.component.ts
    │       
    ├───material
    │       material.module.ts
    │       
    ├───ng-templates
    │       ng-templates.component.css
    │       ng-templates.component.html
    │       ng-templates.component.spec.ts
    │       ng-templates.component.ts
    │       
    └───tipovi-izostanka
            tipovi-izostanka.component.css
            tipovi-izostanka.component.html
            tipovi-izostanka.component.spec.ts
            tipovi-izostanka.component.ts
            
```

## 6. Pokretanje i build aplikacije <a id="6"></a>
Angular aplikaciju je jednostavno pokrenuti. Dovoljno je pozvati sljedeću naredbu:
```
ng serve
```
Ukoliko imamo predefinirani environment možemo ga koristiti u sljedećem formatu:
```
ng serve --envirnoment=<name>
```
Aplikacija se izvorno poslužuje na http://localhost:4200 no to možemo promjeniti:
```
ng serve --envirnoment=<name> --port <port>
```
Dok smo imamo upaljen server svaku izmjena source koda rezultirati će novom publikacijom servera.

Za build imamo više opcija, najjedostavniji primjer je:
```
ng build
```
Naredba pokreće build aplikacije i po završetku sprema kompajliranu aplikaciju u dist direkotriji u root projekta.
Za build u produkcijskoj okolini koristi se dodatni flag --prod koji pokreće dodatne zadatke:
- Ahead-of-Time (AOT) Compilation: pre-kompajla Angular template komponenti da ih browser ne treba kompajlirat.
- Production mode: koristi produkcijski environment
- Bundling: spaja puno library datoteka u nekoliko paketa
- Minification: uklanja whitespace-ove, komentare...
- Uglification: prepiše kod tako da koristi kratka i kriptična imena varijabli i funkcija
- Dead code elimination: uklanja ne referncirane module i ne korišteni kod

```
ng build --prod
```
