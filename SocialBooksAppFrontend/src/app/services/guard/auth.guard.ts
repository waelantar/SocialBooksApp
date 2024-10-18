import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from "../token/token.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const tokenservice:TokenService = inject(TokenService);
  const router:Router=inject(Router);
  if(tokenservice.isTokenNotValid())
  {router.navigate(['/login']);
    return false;
  }
  return true;
};
