import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    displayName: 'Home',
    iconName: 'home',
    route: '/dashboard',
  },
  {
    displayName: 'Categories',
    iconName: 'mug',
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
