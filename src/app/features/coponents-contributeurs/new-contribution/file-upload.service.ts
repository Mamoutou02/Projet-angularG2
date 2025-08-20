import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
  if (!file) throw new Error('Aucun fichier fourni');

  const formData = new FormData();
  formData.append('file', file);

  return this.http.post('/api/upload', formData, {
    reportProgress: true,
    observe: 'events',
    responseType: 'json'
  });
}
}
