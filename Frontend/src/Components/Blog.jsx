import React, { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
// import { backendURL } from "../App";

const BlogSlider = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  const { backendURL } = useContext(ShopContext);

  const categories = ["All", "Style", "Care", "Trends", "Fashion", "Beauty"];

  // Fetch all blog posts
  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(`${backendURL}/api/blog/list`);
      const data = await response.json();
      if (data.success) {
        setBlogPosts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  useEffect(() => {
    if (isPaused || filteredPosts.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % filteredPosts.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, filteredPosts.length, selectedCategory]);

  const handleDotClick = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveIndex(0);
    setIsTransitioning(false);
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-accent text-lg">Loading stories...</p>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-accent text-lg">
          No posts available in this category.
        </p>
      </div>
    );
  }

  const currentPost = filteredPosts[activeIndex];

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="h-px w-16 bg-primary"></div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mx-6">
            Latest Stories
          </h2>
          <div className="h-px w-16 bg-primary"></div>
        </div>
        <p className="text-accent text-lg mt-4">
          Explore our curated collection of fashion insights
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-white rounded-full p-1.5 shadow-md">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "text-accent hover:text-primary hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Slider */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
            <div
              className={`aspect-[4/3] transition-all duration-500 ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <img
                src={currentPost.image}
                alt={currentPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x600?text=No+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute top-6 left-6">
                <span className="badge bg-white/90 backdrop-blur-sm text-primary font-semibold px-4 py-2 text-sm">
                  {currentPost.category}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            className={`transition-all duration-500 ${
              isTransitioning
                ? "opacity-0 translate-x-8"
                : "opacity-100 translate-x-0"
            }`}
          >
            <div className="glass-card p-8 lg:p-10">
              <div className="flex items-center gap-6 text-sm text-accent mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(currentPost.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{currentPost.readTime}</span>
                </div>
              </div>

              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6 leading-tight">
                {currentPost.title}
              </h3>

              <p className="text-accent text-lg leading-relaxed mb-8">
                {currentPost.excerpt}
              </p>

              <button
                onClick={() =>
                  (window.location.href = `/blog/${currentPost._id}`)
                }
                className="btn-primary group/btn"
              >
                <span className="flex items-center gap-2">
                  Read Article
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-3 mt-10">
          {filteredPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex
                  ? "w-12 h-3 bg-primary"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="sr-only">Slide {index + 1}</span>
            </button>
          ))}
        </div>

        {/* Pause Indicator */}
        {isPaused && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <span className="text-xs font-medium text-primary">Paused</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSlider;
