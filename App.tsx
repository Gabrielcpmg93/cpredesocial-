import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PostCard } from './components/PostCard';
import { CreatePostModal } from './components/CreatePostModal';
import { Profile } from './components/Profile';
import { ViewState, Post } from './types';
import { INITIAL_POSTS, CURRENT_USER } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.FEED);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setIsCreateModalOpen(false);
    setView(ViewState.FEED);
  };

  return (
    <div className="min-h-screen bg-lumina-bg text-lumina-text flex flex-col md:flex-row">
      <Sidebar 
        currentView={view} 
        setView={setView} 
        openCreateModal={() => setIsCreateModalOpen(true)} 
      />

      <main className="flex-1 md:ml-64 pb-20 md:pb-0 min-h-screen relative overflow-x-hidden">
        {/* Top Header - Mobile Only */}
        <div className="md:hidden sticky top-0 z-30 bg-lumina-bg/80 backdrop-blur-md p-4 border-b border-white/5 flex items-center justify-between">
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">Lumina</span>
          <img src={CURRENT_USER.avatar} className="w-8 h-8 rounded-full" alt="Profile" />
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {view === ViewState.FEED && (
            <>
              <header className="mb-8 hidden md:block">
                <h1 className="text-3xl font-bold text-white">Discover</h1>
                <p className="text-lumina-muted mt-1">Explore the visual stories of the world.</p>
              </header>
              
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}

          {view === ViewState.PROFILE && (
            <Profile user={CURRENT_USER} posts={posts} />
          )}
        </div>
      </main>

      {isCreateModalOpen && (
        <CreatePostModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onCreate={handleCreatePost}
          user={CURRENT_USER}
        />
      )}
    </div>
  );
};

export default App;