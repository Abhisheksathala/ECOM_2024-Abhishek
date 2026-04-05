import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { backendURL } = useContext(ShopContext);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`${backendURL}/api/blog/${id}`);
        const data = await response.json();
        if (data.success) {
          setPost(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-accent text-lg">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-accent text-lg">Article not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </button>

        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-accent">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-accent">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-accent leading-relaxed">{post.excerpt}</p>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/1200x600?text=No+Image";
            }}
          />
        </div>

        {/* Blog Content - You can add more content fields to your model */}
        <div className="prose prose-lg max-w-none">
          <p className="text-accent leading-relaxed">
            {/* This is where full blog content would go. 
                You might want to add a 'content' field to your BlogPost model */}
            Full article content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
