
import { environment } from './../../environments/environment';
import { Component, OnInit, NgZone } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Categoria } from './../model/categoria-model';
import { Marca } from './../model/marca-model';

import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
})

export class PesquisaPage implements OnInit {


  // Variaveis de cateoria
  categorias: Categoria[];
  categoria: Categoria;

  // Variaveis de marca
  marcas: Marca[];
  marca: Marca;

  // variavel de distnacia (1,3,5,10.etc) kl
  distancia;

  // variavel nome do produto pesquisado
  produtoPesquisado;

  // Latitude e Longitude
  latitude: any = 0;
  longitude: any = 0;
  options = { timeout: 10000, enableHighAccuracy: true, maximumAge: 3600 };

  // Usandos no request
  campo = '_embedded';
  baseUrl = environment.serveApi;
  //baseUrlPesq = "";
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  dadosLojas: Array<any> = new Array<any>();
  zoom: number = 15;

  constructor(
    private httpClient: HttpClient,
    private geolocation: Geolocation
  ) { }


  ngOnInit() {
    this.getCategoria();
    this.getMarca();
  }


  /*
  *  Recupera a localização geografica
  */
  async getCurrentCoordinates() {

    await this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

    }).catch((error) => { console.log('Error getting location', error); });

  }



  /*
  * Recupera parametros para querystring
  */
  getParameter() {

    let params = new HttpParams();
    params = params.append('latitude', this.latitude);
    params = params.append('longitude', this.longitude);

    if (this.categoria.id != null) {
      params = params.append('idCategoria', this.categoria.id.toString());
    }
    if (this.marca.id != null) {
      params = params.append('idMarca', this.marca.id.toString());
    }
    if (this.produtoPesquisado != null) {
      params = params.append('nomeProduto', this.produtoPesquisado);
    }
    if (this.distancia != null) {
      params = params.append('distanceKM', this.distancia);
    }

    return params;

  }



  /* ##################################### */
  /*    \/        Service request     \/   */
  /* ##################################### */

  /*
   *  Realiza a pesquisa
   */
  public async pesquisar() {

    await this.getCurrentCoordinates();

    const service = this.baseUrl + '/localidades';
    const resource = '#####';
    //{ params: this.getParameter() }
    const obj = {
      latitude: this.latitude,
      longitude: this.longitude,
      marca: (this.marca) ? this.marca.descricao : undefined,
      categoria: (this.categoria) ? this.categoria.descricao : undefined,
      produto: this.produtoPesquisado,
      distancia: this.distancia
    };
    this.httpClient.post<any[]>(service, obj)
      .subscribe(
        xx => {
          this.dadosLojas = xx;
          console.log(this.dadosLojas);
        }
      );
  }


  /* ========================= */
  /* Recupera todas categorias */
  /* ========================= */
  public getCategoria() {
    const service = this.baseUrl + '/categoria';
    // const resource = 'categoriaProdutoResources';

    this.httpClient.get<Categoria[]>(service)
    /*  .pipe(
        map(data => data[this.campo][resource]),
      )*/.subscribe(
      categorias => this.categorias = categorias
    );

  }


  /* ========================= */
  /* Recupera todas as marcas  */
  /* ========================= */
  public getMarca() {
    const service = this.baseUrl + '/marca';
    //const resource = 'marcaProdutoResources';

    this.httpClient.get<Marca[]>(service)
      /*.pipe(
        map(data => data[this.campo][resource])
      )*/.subscribe(
      marcas => this.marcas = marcas
    );
  }

}
