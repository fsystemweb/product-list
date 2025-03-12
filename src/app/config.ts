export interface AppSettings {
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  companyName: string;
}

export const defaults: AppSettings = {
  sidenavOpened: false,
  sidenavCollapsed: false,
  companyName: 'Premium Coffee',
};
