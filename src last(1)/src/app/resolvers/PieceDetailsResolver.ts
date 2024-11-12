import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ApiConceptsEtTravauxService } from '../services/api-concepts-et-travaux.service';

@Injectable({
  providedIn: 'root'
})
export class PieceResolver implements Resolve<any> {
  constructor(private userService: ApiConceptsEtTravauxService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id') ?? '0';
    return forkJoin({
        piece: this.userService.getPiece(parseInt(id)),
        seoDetails: this.userService.getFrontPageByTitle('pieces-details'),
        id: id
      });
  }
}
