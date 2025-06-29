import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

const App = AppComponent;

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
