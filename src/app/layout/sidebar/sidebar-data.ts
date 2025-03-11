import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
  {
    displayName: 'Categories',
    iconName: 'layout-grid-add',
    children: [
      {
        displayName: 'Arabica',
        iconName: 'coffee',
        route: '/products/arabica',
      },
    ],
  },
  {
    displayName: 'About me',
    iconName: 'world',
    route: 'https://fedc.online',
    chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'external',
  },
];
