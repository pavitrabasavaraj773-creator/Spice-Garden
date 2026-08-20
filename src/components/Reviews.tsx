import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Sparkles, Quote, CheckCircle2, MessageSquarePlus, X } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/restaurantData';
import { ReviewItem } from '../types';

export const Reviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(CUSTOMER_REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // New review form state
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    rating: 5,
    comment: '',
    dishRecommended: ''
  });

  // Carousel autoplay timer
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, reviewsList.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const item: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      location: newReview.location || 'Hubballi Resident',
      rating: newReview.rating,
      comment: newReview.comment,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
      dishRecommended: newReview.dishRecommended || 'Dum Biryani & Paneer Tikka',
      date: 'Just now',
      verified: true
    };

    setReviewsList([item, ...reviewsList]);
    setCurrentIndex(0);
    setShowReviewModal(false);
    setNewReview({ name: '', location: '', rating: 5, comment: '', dishRecommended: '' });
  };

  return (
    <section id="reviews" className="py-20 bg-[#FAF7F2] text-[#3D2B1F] relative border-b border-[#E5E0D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <Sparkles size={14} /> Guest Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F] mt-2 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-base text-[#7D6E63]">
            Real feedback and heartfelt reviews from food lovers, families, and regular diners in Hubballi.
          </p>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative mb-10">
          {/* Main Review Card */}
          <div
            id={`review-slide-${reviewsList[currentIndex].id}`}
            className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm p-6 sm:p-10 shadow-sm relative transition-all duration-500"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <Quote size={48} className="text-[#D4AF37]/20 absolute top-6 right-6" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Customer Avatar */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-sm">
                  <img
                    src={reviewsList[currentIndex].avatar}
                    alt={reviewsList[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {reviewsList[currentIndex].verified && (
                  <div className="absolute -bottom-1 -right-1 bg-green-100 border border-green-600 text-green-700 p-1 rounded-full text-[10px]" title="Verified Guest">
                    <CheckCircle2 size={14} />
                  </div>
                )}
              </div>

              {/* Review Details */}
              <div className="flex-1 text-center sm:text-left space-y-3">
                {/* Star Rating */}
                <div className="flex items-center justify-center sm:justify-start gap-1 text-[#D4AF37]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < reviewsList[currentIndex].rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#E5E0D8]'}
                    />
                  ))}
                  <span className="text-xs text-[#7D6E63] ml-2">
                    {reviewsList[currentIndex].date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-base sm:text-lg text-[#3D2B1F] font-serif italic leading-relaxed">
                  "{reviewsList[currentIndex].comment}"
                </p>

                {/* Customer Meta & Dish Recommendation */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#3D2B1F]">
                      {reviewsList[currentIndex].name}
                    </h4>
                    <span className="text-xs text-[#7D6E63]">
                      {reviewsList[currentIndex].location}
                    </span>
                  </div>

                  {reviewsList[currentIndex].dishRecommended && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#FAF7F2] border border-[#E5E0D8] text-xs text-[#3D2B1F]">
                      <span className="text-[#7D6E63]">Favorite:</span>
                      <strong className="text-[#3D2B1F]">{reviewsList[currentIndex].dishRecommended}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <button
                id="review-prev-btn"
                onClick={handlePrev}
                className="p-3 rounded-sm bg-[#FFFFFF] border border-[#E5E0D8] text-[#3D2B1F] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                id="review-next-btn"
                onClick={handleNext}
                className="p-3 rounded-sm bg-[#FFFFFF] border border-[#E5E0D8] text-[#3D2B1F] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {reviewsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-6 bg-[#3D2B1F]' : 'w-2 bg-[#E5E0D8] hover:bg-[#7D6E63]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Leave Review Trigger */}
            <button
              id="leave-review-btn"
              onClick={() => setShowReviewModal(true)}
              className="px-4 py-2 rounded-sm bg-[#3D2B1F] text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:bg-[#2C1E15] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquarePlus size={14} />
              <span>Write Review</span>
            </button>
          </div>
        </div>

        {/* 4 Static Quick Review Cards for Comprehensive Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8" id="reviews-mini-grid">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FFFFFF] p-4 rounded-sm border border-[#E5E0D8] space-y-2 hover:border-[#D4AF37] transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2">
                <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]" />
                <div>
                  <h5 className="font-serif font-bold text-xs text-[#3D2B1F]">{rev.name}</h5>
                  <div className="flex text-[#D4AF37]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={11} className="fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#7D6E63] line-clamp-3 leading-relaxed">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-[#3D2B1F]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#3D2B1F] border border-[#D4AF37] rounded-sm p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-[#F5F5F0]">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 p-2 text-[#E5E0D8] hover:text-[#D4AF37] cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-serif text-2xl font-bold text-[#F5F5F0] mb-1">
              Share Your Experience
            </h3>
            <p className="text-xs text-[#E5E0D8]/80 mb-5">
              Tell us how you enjoyed dining at Spice Garden Restaurant!
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#F5F5F0] mb-1">Rating</label>
                <div className="flex gap-2 text-[#D4AF37]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star size={22} className={star <= newReview.rating ? 'fill-[#D4AF37]' : 'text-[#7D6E63]'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#F5F5F0] mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meera Patil"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2C1E15] border border-[#4A382B] rounded-sm text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#F5F5F0] mb-1">Favorite Dish</label>
                <input
                  type="text"
                  placeholder="e.g. Butter Chicken, Sizzling Brownie"
                  value={newReview.dishRecommended}
                  onChange={(e) => setNewReview({ ...newReview, dishRecommended: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2C1E15] border border-[#4A382B] rounded-sm text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#F5F5F0] mb-1">Review Comment *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write your review here..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full p-2.5 bg-[#2C1E15] border border-[#4A382B] rounded-sm text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-sm bg-[#D4AF37] text-[#3D2B1F] font-bold text-xs uppercase tracking-widest hover:bg-[#E5C358] transition-colors cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
