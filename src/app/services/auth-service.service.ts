import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly USER_KEY = 'connectedUser';
  private isConnectedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private router: Router) {}

  /**
   * Stocke les informations utilisateur après la connexion.
   * @param user L'objet utilisateur à stocker.
   */
  setUser(user: any): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      this.isConnectedSubject.next(true);
      this.router.navigate(['/']);
    }
  }

  /**
   * Récupère les informations utilisateur stockées.
   * @returns L'objet utilisateur ou null si aucune information n'est stockée.
   */
  getUser(): any | null {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  /**
   * Supprime les informations utilisateur (déconnexion).
   */
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.USER_KEY);
      this.isConnectedSubject.next(false);
      this.router.navigate(['/connexion']);
    }
  }

  /**
   * Vérifie si un utilisateur est connecté.
   * @returns true si l'utilisateur est connecté, sinon false.
   */
  isAuthenticated(): boolean {
    return this.getUser() !== null;
  }

  /**
   * Retourne un observable pour suivre l'état de connexion.
   */
  getIsConnected() {
    return this.isConnectedSubject.asObservable();
  }

  /**
   * Vérifie si le code s'exécute dans le navigateur.
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}