import React from 'react';
import { User, Post } from '../types';
import { PostCard } from './PostCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { Settings, MapPin, Link as LinkIcon } from 'lucide-react';
import { Button } from './Button';

interface ProfileProps {
  user: User;
  posts: Post[];
}

const data = [
  { name: 'Mon', engagement: 400 },
  { name: 'Tue', engagement: 300 },
  { name: 'Wed', engagement: 550 },
  { name: 'Thu', engagement: 450 },
  { name: 'Fri', engagement: 600 },
  { name: 'Sat', engagement: 800 },
  { name: 'Sun', engagement: 750 },
];

export const Profile: React.FC<ProfileProps> = ({ user, posts }) => {
  const userPosts = posts.filter(p => p.userId === user.id);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        <div className="relative group">
           <img 
             src={user.avatar} 
             alt={user.username} 
             className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-lumina-card shadow-2xl" 
           />
           <div className="absolute inset-0 rounded-full bg-black/20 hidden group-hover:block transition-all cursor-pointer"></div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
             <div>
                <h2 className="text-3xl font-bold text-white mb-1">{user.username}</h2>
                <p className="text-lumina-muted">{user.bio}</p>
             </div>
             <div className="flex gap-2">
               <Button variant="secondary">Edit Profile</Button>
               <Button variant="secondary" className="px-3"><Settings size={18} /></Button>
             </div>
          </div>

          <div className="flex gap-6 mb-6">
            <div className="text-center md:text-left">
              <span className="block text-xl font-bold text-white">{userPosts.length}</span>
              <span className="text-sm text-lumina-muted">Posts</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-xl font-bold text-white">{user.followers}</span>
              <span className="text-sm text-lumina-muted">Followers</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-xl font-bold text-white">{user.following}</span>
              <span className="text-sm text-lumina-muted">Following</span>
            </div>
          </div>

          <div className="flex gap-4 text-sm text-lumina-muted">
             <div className="flex items-center gap-1"><MapPin size={14}/> Tokyo, Japan</div>
             <div className="flex items-center gap-1"><LinkIcon size={14}/> portfolio.io</div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mb-12 bg-lumina-card/50 rounded-2xl p-6 border border-white/5">
        <h3 className="text-lg font-semibold text-white mb-6">Weekly Engagement</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#a78bfa' }}
              />
              <Area type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorEngage)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Post Grid - Masonry */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {userPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};