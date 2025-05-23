export interface Provider {
  id: string;
  name: string;
  avatar: string;
  profession: string;
  description: string;
  rating: number;
  totalJobs: number;
  location: string;
  services: string[];
}

const providers: Provider[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    avatar: '',
    profession: 'Professional Cleaner',
    description: 'Experienced cleaner with over 5 years in residential and commercial cleaning. Specializing in deep cleaning and organization.',
    rating: 4.8,
    totalJobs: 156,
    location: 'Brooklyn, NY',
    services: ['1']
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    avatar: './assets/images/plumbing.png',
    profession: 'Master Plumber',
    description: 'Licensed plumber with 10+ years experience handling all types of plumbing issues. Specializing in bathroom and kitchen repairs.',
    rating: 4.6,
    totalJobs: 89,
    location: 'Queens, NY',
    services: ['2']
  },
  {
    id: '3',
    name: 'David Chen',
    avatar: '',
    profession: 'Licensed Electrician',
    description: 'Certified electrician with expertise in residential and commercial electrical systems. Focusing on safety and quality workmanship.',
    rating: 4.9,
    totalJobs: 67,
    location: 'Manhattan, NY',
    services: ['3']
  },
  {
    id: '4',
    name: 'Sophia Martinez',
    avatar: '',
    profession: 'Hair Stylist',
    description: 'Professional hair stylist with 7 years of salon experience. Specializing in cuts, color, and styling for all hair types.',
    rating: 4.7,
    totalJobs: 212,
    location: 'Brooklyn, NY',
    services: ['4']
  },
  {
    id: '5',
    name: 'James Wilson',
    avatar: '',
    profession: 'Furniture Specialist',
    description: 'Skilled furniture assembly and repair specialist. Experienced with all major furniture brands and styles.',
    rating: 4.5,
    totalJobs: 178,
    location: 'Bronx, NY',
    services: ['5']
  },
  {
    id: '6',
    name: 'Olivia Brown',
    avatar: '',
    profession: 'Professional Painter',
    description: 'Experienced painter specializing in interior and exterior painting. Providing color consultation and premium finishes.',
    rating: 4.8,
    totalJobs: 94,
    location: 'Staten Island, NY',
    services: ['6']
  },
  {
    id: '7',
    name: 'Daniel Kim',
    avatar: '',
    profession: 'Moving Specialist',
    description: 'Professional mover with a team specializing in local and long-distance moves. Focused on safe and efficient relocation services.',
    rating: 4.6,
    totalJobs: 132,
    location: 'Queens, NY',
    services: ['7']
  },
  {
    id: '8',
    name: 'Emily Taylor',
    avatar: '',
    profession: 'Landscape Gardener',
    description: 'Professional gardener with expertise in lawn care, planting, and garden design. Creating beautiful outdoor spaces for over 8 years.',
    rating: 4.7,
    totalJobs: 203,
    location: 'Brooklyn, NY',
    services: ['8']
  },
];

export default providers;