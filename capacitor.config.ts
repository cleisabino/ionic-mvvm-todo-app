import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.mvvm.todo.app',
  appName: 'ionic-mvvm-todo-app',
  webDir: 'www',
  
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
    }
  }
};

export default config;
