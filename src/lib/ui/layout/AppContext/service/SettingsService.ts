import { WebStorage } from '~/lib/module';
import { mobxService } from '~/lib/decorator';
import Settings from '../model/Settings';


@mobxService
class SettingsService {
  //
  static instanceName = 'settingsService';

  settings = WebStorage.newLocal<Settings>('settings');


  saveSettings(settings: Settings) {
    //
    this.settings.save(settings);
  }

  findSettings(): Settings | null {
    //
    return this.settings.load();
  }
}

export default SettingsService;
