import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserProfile} from '../../../models/user-profile';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  findById(idUser: string) {
    return `/api/administrator/users/${idUser}`;
  }
}
