export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  numberOfRatings: number;
  image: string;
  providerId: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'House Deep Cleaning',
    category: 'cleaning',
    description: 'Professional deep cleaning service for your entire home. Our team will clean every corner, including kitchen, bathrooms, bedrooms, and living spaces.',
    price: 120,
    rating: 4.8,
    numberOfRatings: 156,
    image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
    providerId: '1'
  },
  {
    id: '2',
    title: 'Bathroom Plumbing Repair',
    category: 'plumbing',
    description: 'Expert plumbing services for bathroom fixtures. We repair leaks, unclog drains, and fix or replace faucets, showers, and toilets.',
    price: 85,
    rating: 4.6,
    numberOfRatings: 89,
    image: 'https://images.pexels.com/photos/6000157/pexels-photo-6000157.jpeg',
    providerId: '2'
  },
  {
    id: '3',
    title: 'Electrical Panel Upgrade',
    category: 'electrical',
    description: 'Upgrade your electrical panel for improved safety and capacity. Our licensed electricians will replace your old panel with a modern one.',
    price: 1200,
    rating: 4.9,
    numberOfRatings: 67,
    image: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg',
    providerId: '3'
  },
  {
    id: '4',
    title: 'Premium Haircut & Styling',
    category: 'beauty',
    description: 'Get a professional haircut and styling at your home. Our experienced stylists will give you a fresh new look without leaving your house.',
    price: 75,
    rating: 4.7,
    numberOfRatings: 212,
    image: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg',
    providerId: '4'
  },
  {
    id: '5',
    title: 'Furniture Assembly',
    category: 'repair',
    description: 'Professional furniture assembly service. We\'ll put together any type of furniture quickly and correctly, saving you time and frustration.',
    price: 60,
    rating: 4.5,
    numberOfRatings: 178,
    image: 'https://images.pexels.com/photos/7218505/pexels-photo-7218505.jpeg',
    providerId: '5'
  },
  {
    id: '6',
    title: 'Interior Wall Painting',
    category: 'painting',
    description: 'Transform your space with professional interior painting. Our team provides color consultation, prep work, and expert painting of your walls.',
    price: 350,
    rating: 4.8,
    numberOfRatings: 94,
    image: 'https://images.pexels.com/photos/8092462/pexels-photo-8092462.jpeg',
    providerId: '6'
  },
  {
    id: '7',
    title: 'Local Moving Service',
    category: 'moving',
    description: 'Full-service local moving. Our professional movers will pack, load, transport, and unpack your belongings safely and efficiently.',
    price: 450,
    rating: 4.6,
    numberOfRatings: 132,
    image: 'https://images.pexels.com/photos/4246091/pexels-photo-4246091.jpeg',
    providerId: '7'
  },
  {
    id: '8',
    title: 'Lawn Mowing & Trimming',
    category: 'gardening',
    description: 'Professional lawn care service. We\'ll mow your lawn, trim edges, and clean up afterward, leaving your yard looking perfectly maintained.',
    price: 55,
    rating: 4.7,
    numberOfRatings: 203,
    image: 'https://images.pexels.com/photos/589/garden-gardener-grass-landscape.jpg',
    providerId: '8'
  },
];

export default services;