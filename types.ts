
export interface WheelOption {
  id: string;
  label: string;
  color: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
}

export enum Tab {
  WHEEL = 'wheel',
  FRIENDS = 'friends',
  SETTINGS = 'settings'
}

export interface AppSettings {
  soundEnabled: boolean;
  confettiEnabled: boolean;
  primaryColor: string;
}
