import {Injectable} from '@angular/core';
import {filter, map, Observable, Subject} from "rxjs";

interface BroadcasterObject<T> {
  key: string;
  value: T | undefined;
}

@Injectable({providedIn: 'root'})
/*
 * This service is used to broadcast events between components.
 */
export class BroadcasterService {
  private _eventBus: Subject<BroadcasterObject<any>>;

  constructor() {
    this._eventBus = new Subject<BroadcasterObject<any>>();
  }

  /**
   * Broadcast an event.
   * @param key<string>
   * @param value<T>
   */
  broadcast<T>(key: string, value?: T): void {
    this._eventBus.next({key, value});
  }

  /**
   * Listen to an event.
   * @param key<string>
   */
  on<T>(key: string): Observable<T> {
    return this._eventBus.asObservable()
      .pipe(
        filter(event => event.key === key),
        map(event => event.value)
      );
  }

  /**
   * Destroy the event bus.
   * @return {void}
   */
  unsubscribe(): void {
    this._eventBus.unsubscribe();
  }
}
