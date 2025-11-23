import { Post, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'creative_soul',
  avatar: 'https://picsum.photos/100/100?random=99',
  bio: 'Chasing light & shadows. Digital artist.',
  followers: 1240,
  following: 450
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u2',
    user: { id: 'u2', username: 'wanderlust_jen', avatar: 'https://picsum.photos/100/100?random=1', bio: '', followers: 0, following: 0 },
    imageUrl: 'https://picsum.photos/600/800?random=10',
    caption: 'Lost in the urban jungle. The city breathes differently at night. 🌃 #nightlife #cityscape',
    likes: 124,
    comments: [{ id: 'c1', username: 'dave_photo', text: 'Great composition!' }],
    timestamp: '2h ago',
    aspectRatio: 'aspect-[3/4]'
  },
  {
    id: 'p2',
    userId: 'u3',
    user: { id: 'u3', username: 'minimal_archi', avatar: 'https://picsum.photos/100/100?random=2', bio: '', followers: 0, following: 0 },
    imageUrl: 'https://picsum.photos/600/600?random=11',
    caption: 'Lines and curves. Simplicity is the ultimate sophistication.',
    likes: 89,
    comments: [],
    timestamp: '4h ago',
    aspectRatio: 'aspect-square'
  },
  {
    id: 'p3',
    userId: 'u1',
    user: CURRENT_USER,
    imageUrl: 'https://picsum.photos/800/600?random=12',
    caption: 'Golden hour at the coast. The waves whisper secrets of the deep.',
    likes: 342,
    comments: [{ id: 'c2', username: 'sea_lover', text: 'Stunning colors!' }, { id: 'c3', username: 'jenny_k', text: 'Take me there.' }],
    timestamp: '1d ago',
    aspectRatio: 'aspect-video'
  },
  {
    id: 'p4',
    userId: 'u4',
    user: { id: 'u4', username: 'coffee_addict', avatar: 'https://picsum.photos/100/100?random=3', bio: '', followers: 0, following: 0 },
    imageUrl: 'https://picsum.photos/600/900?random=13',
    caption: 'Morning brew routine. Essential fuel for the day.',
    likes: 56,
    comments: [],
    timestamp: '1d ago',
    aspectRatio: 'aspect-[3/4]'
  },
  {
    id: 'p5',
    userId: 'u5',
    user: { id: 'u5', username: 'neon_nights', avatar: 'https://picsum.photos/100/100?random=4', bio: '', followers: 0, following: 0 },
    imageUrl: 'https://picsum.photos/600/600?random=14',
    caption: 'Cyberpunk vibes.',
    likes: 230,
    comments: [],
    timestamp: '2d ago',
    aspectRatio: 'aspect-square'
  }
];