import { Observable, finalize } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export function finalizeLoading<T>(loading: BehaviorSubject<boolean>, value: boolean) {
  return (source$: Observable<T>) => {
    // loading.next(value);
    return source$.pipe(
      finalize(() => loading.next(value))
    );
  };
}
