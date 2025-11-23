import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Sparkles, Send } from 'lucide-react';
import { Button } from './Button';
import { generateCreativeCaption, analyzeImageAndCaption } from '../services/geminiService';
import { Post, User } from '../types';

interface CreatePostModalProps {
  onClose: () => void;
  onCreate: (post: Post) => void;
  user: User;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onCreate, user }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateCaption = async () => {
    setIsGenerating(true);
    let generated = "";
    
    // If image exists, try to analyze it, otherwise generate from text context
    if (imagePreview) {
        generated = await analyzeImageAndCaption(imagePreview);
    } else {
        generated = await generateCreativeCaption(caption || "A beautiful moment", "mysterious and elegant");
    }
    
    if (generated) {
      setCaption(generated);
    }
    setIsGenerating(false);
  };

  const handleSubmit = () => {
    if (!imagePreview) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: user.id,
      user: user,
      imageUrl: imagePreview,
      caption: caption,
      likes: 0,
      comments: [],
      timestamp: 'Just now',
      aspectRatio: 'aspect-square' // Defaulting to square for uploaded
    };

    onCreate(newPost);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-lumina-card border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Create New Post</h2>
          <button onClick={onClose} className="text-lumina-muted hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Image Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative w-full h-64 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-white/5 ${!imagePreview ? 'bg-lumina-bg' : ''}`}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-xl" />
            ) : (
              <div className="text-center text-lumina-muted">
                <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                <p>Click to upload photo</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          {/* Caption Area */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-lumina-muted">Caption</label>
              <button 
                onClick={handleGenerateCaption}
                disabled={isGenerating || (!imagePreview && !caption)}
                className="flex items-center gap-1 text-xs font-bold text-lumina-accent hover:text-violet-300 transition-colors disabled:opacity-50"
              >
                <Sparkles size={14} />
                {isGenerating ? 'Dreaming...' : 'AI Magic'}
              </button>
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption or let AI describe your image..."
              className="w-full bg-lumina-bg border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-lumina-accent/50 min-h-[100px] resize-none"
            />
          </div>
        </div>

        <div className="p-4 border-t border-white/10 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            disabled={!imagePreview} 
            onClick={handleSubmit}
          >
            Post <Send size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};