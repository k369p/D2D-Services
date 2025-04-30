export interface Category {
  id: string;
  title: string;
  iconName: string;
}

const categories: Category[] = [
  {
    id: 'cleaning',
    title: 'Cleaning',
    iconName: 'spraycan',
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    iconName: 'wrench',
  },
  {
    id: 'electrical',
    title: 'Electrical',
    iconName: 'zap',
  },
  {
    id: 'beauty',
    title: 'Beauty',
    iconName: 'scissors',
  },
  {
    id: 'repair',
    title: 'Repair',
    iconName: 'hammer',
  },
  {
    id: 'painting',
    title: 'Painting',
    iconName: 'paintbrush',
  },
  {
    id: 'moving',
    title: 'Moving',
    iconName: 'truck',
  },
  {
    id: 'gardening',
    title: 'Gardening',
    iconName: 'flower',
  },
];

export default categories;