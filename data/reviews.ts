export interface Review {
  id: string;
  serviceId: string;
  providerId: string;
  userId: string;
  userName: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: '1',
    serviceId: '1',
    providerId: '1',
    userId: 'u1',
    userName: 'Alex Thompson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 5,
    comment: 'Emma did an amazing job cleaning our apartment. Every surface was spotless and she paid attention to all the details. Would definitely hire again!',
    date: '2023-11-15',
  },
  {
    id: '2',
    serviceId: '1',
    providerId: '1',
    userId: 'u2',
    userName: 'Jessica Liu',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 4,
    comment: 'Very thorough cleaning service. My home looks and smells great! Taking off one star only because they arrived 15 minutes late.',
    date: '2023-11-02',
  },
  {
    id: '3',
    serviceId: '1',
    providerId: '1',
    userId: 'u3',
    userName: 'Marcus Johnson',
    rating: 5,
    comment: 'Exceptional service! Emma was professional, efficient, and left my house cleaner than it\'s ever been. Highly recommended!',
    date: '2023-10-20',
  },
  {
    id: '4',
    serviceId: '2',
    providerId: '2',
    userId: 'u4',
    userName: 'Sarah Williams',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 5,
    comment: 'Michael fixed our leaking shower quickly and professionally. He explained the problem clearly and gave us tips to prevent future issues.',
    date: '2023-11-10',
  },
  {
    id: '5',
    serviceId: '2',
    providerId: '2',
    userId: 'u5',
    userName: 'Robert Chen',
    rating: 4,
    comment: 'Good service. Fixed the clogged sink efficiently. Slightly more expensive than expected but the quality of work was worth it.',
    date: '2023-10-28',
  },
  {
    id: '6',
    serviceId: '3',
    providerId: '3',
    userId: 'u6',
    userName: 'Jennifer Lopez',
    avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
    rating: 5,
    comment: 'David did an excellent job upgrading our electrical panel. Very knowledgeable and professional. The work passed inspection with no issues.',
    date: '2023-11-05',
  },
  {
    id: '7',
    serviceId: '4',
    providerId: '4',
    userId: 'u7',
    userName: 'Kevin Park',
    rating: 5,
    comment: 'Sophia gave me the best haircut I\'ve had in years! She listened to what I wanted and offered great suggestions. Very happy with the results!',
    date: '2023-11-12',
  },
  {
    id: '8',
    serviceId: '5',
    providerId: '5',
    userId: 'u8',
    userName: 'Lisa Garcia',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 4,
    comment: 'James assembled our new IKEA furniture quickly and correctly. He was friendly and professional throughout.',
    date: '2023-11-08',
  },
];

export default reviews;