import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagInterface } from '../types/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpClient = inject(HttpClient)
  getTags(): Observable<TagInterface[]> {
    return this.httpClient.get<TagInterface[]>('/tags')
  }
  createTag(name: string): Observable<TagInterface> {
    return this.httpClient.post<TagInterface>('/tags', { name })
  }
}