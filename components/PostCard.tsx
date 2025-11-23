import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="break-inside-avoid mb-6 bg-lumina-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-violet-900/10 transition-all duration-300 border border-white/5 group">
      <div className="relative">
        <img 
          src={post.imageUrl} 
          alt="Post" 
          className={`w-full ${post.aspectRatio} object-cover`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
           <div className="flex items-center gap-4 text-white">
              <button onClick={handleLike} className="flex items-center gap-1 hover:text-red-400 transition-colors">
                <Heart size={20} fill={liked ? "#f87171" : "none"} className={liked ? "text-red-400" : ""} />
                <span className="text-sm font-medium">{likesCount}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                <MessageCircle size={20} />
                <span className="text-sm font-medium">{post.comments.length}</span>
              </button>
           </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src={post.user.avatar} alt={post.user.username} className="w-8 h-8 rounded-full border border-white/10" />
            <span className="text-sm font-semibold text-white">{post.user.username}</span>
          </div>
          <button className="text-lumina-muted hover:text-white">
            <MoreHorizontal size={16} />
          </button>
        </div>
        
        <p className="text-sm text-gray-300 leading-relaxed">
          {post.caption}
        </p>
        
        <div className="mt-3 flex items-center justify-between">
           <span className="text-xs text-lumina-muted">{post.timestamp}</span>
           <button className="text-lumina-muted hover:text-white">
              <Share2 size={16} />
           </button>
        </div>
      </div>
    </div>
  );
};