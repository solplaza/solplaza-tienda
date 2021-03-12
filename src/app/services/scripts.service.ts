import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { ToastrService } from 'ngx-toastr';

interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  { name: 'Culqi', src: 'https://checkout.culqi.com/js/v3' }
];

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {
  private scripts: any = {};
  constructor(
  ) {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach(script => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {

      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'already loaded' });
        console.log('script ya cargado')
      } else {

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.onload = () => {
          this.scripts[name].loaded = true;
          console.log(`${name} loaded`);
          resolve({ script: name, loaded: true, status: 'loaded' });
        };
        script.onerror = (error: any) =>
          resolve({ script: name, loaded: false, status: 'loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }
}
