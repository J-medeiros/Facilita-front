import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom, Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl =
    'http://localhost/Facilita_Api/Buscar_hoteis/hoteis.php';
  protected dataSource: CustomStore;
  dataChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) {
    const that = this;
    const isNotEmpty = (value: any[]) => value !== undefined && value !== null;
    this.dataSource = new CustomStore({
      key: 'id',
      byKey: (key) => {
        return lastValueFrom(that.http.get(this.apiUrl + '?id=' + key));
      },
      async load(loadOptions: any) {
        const url = that.apiUrl;
        const paramNames = [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'filter',
          'totalSummary',
          'group',
          'groupSummary',
        ];

        let params = new HttpParams();

        paramNames
          .filter((paramName) => isNotEmpty(loadOptions[paramName]))
          .forEach((paramName) => {
            params = params.set(
              paramName,
              JSON.stringify(loadOptions[paramName])
            );
          });

        try {
          const result: any = await lastValueFrom(
            that.http.get(url, { params })
          );

          return {
            data: result.data,
            totalCount: result.totalCount,
            summary: result.summary,
            groupCount: result.groupCount,
          };
        } catch (err) {
          throw new Error('Data Loading Error');
        }
      },

      insert(values) {
        return lastValueFrom(that.http.post(that.apiUrl, values));
        that.dataChanged.emit();
      },
      update(key, values) {
        return lastValueFrom(that.http.put(that.apiUrl + '?id=' + key, values));
        that.dataChanged.emit();
      },
      remove: (key: any) => {
        return new Promise<void>((resolve, reject) => {
          that.http.delete(that.apiUrl + '?id=' + key).subscribe(
            (response) => {
              resolve();
              that.dataChanged.emit();
            },
            (error) => {
              reject(error);
            }
          );
        });
      },
    });
  }
  public get(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => data),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  getDataSource() {
    return this.dataSource;
  }

}
