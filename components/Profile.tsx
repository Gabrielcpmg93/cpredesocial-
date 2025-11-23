import React from 'react';
import { User, Post } from '../types';
import { PostCard } from './PostCard';
import { Settings, MapPin, Link as LinkIcon } from 'lucide-react';
import { Button } from './Button';

interface ProfileProps {
  user: User;
  posts: Post[];
}

export const Profile: React.FC<ProfileProps> = ({ user, posts }) => {
  const userPosts = posts.filter(p => p.userId === user.id);

  // Mock data for the visualization
  const weeklyStats = [
    { day: 'Mon', value: 40, label: '400' },
    { day: 'Tue', value: 30, label: '300' },
    { day: 'Wed', value: 55, label: '550' },
    { day: 'Thu', value: 45, label: '450' },
    { day: 'Fri', value: 60, label: '600' },
    { day: 'Sat', value: 80, label: '800' },
    { day: 'Sun', value: 75, label: '750' },
  ];

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

      {/* Analytics Section (CSS Only) */}
      <div className="mb-12 bg-lumina-card/50 rounded-2xl p-6 border border-white/5">
        <h3 className="text-lg font-semibold text-white mb-6">Weekly Engagement</h3>
        <div className="h-48 w-full flex items-end justify-between gap-2 md:gap-4 px-2">
          {weeklyStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center gap-2 flex-1 group cursor-default">
              <div className="relative w-full bg-white/5 rounded-t-lg hover:bg-violet-500/20 transition-all duration-300 flex items-end justify-center overflow-hidden" style={{ height: '100%' }}>
                <div 
                  className="w-full bg-gradient-to-t from-violet-600 to-indigo-500 opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ height: `${stat.value}%` }}
                ></div>
                {/* Tooltip */}
                <div className="absolute -top-8 bg-lumina-card border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {stat.label} views
                </div>
              </div>
              <span className="text-xs text-lumina-muted">{stat.day}</span>
            </div>
          ))}
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