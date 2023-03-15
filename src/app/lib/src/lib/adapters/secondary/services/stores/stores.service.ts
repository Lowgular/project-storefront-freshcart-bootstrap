import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StoreDTO} from '../../../../application/ports/secondary/dto/store.dto';

@Injectable()
export class StoresService {
  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<StoreDTO[]> {
    return this._httpClient.get<StoreDTO[]>(
      `https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-stores`
    );
  }

  getOne(id: string): Observable<StoreDTO[]> {
    return this._httpClient.get<StoreDTO[]>(
      `ttps://6384fca14ce192ac60696c4b.mockapi.io/freshcart-stores/${id}`
    );
  }
}
