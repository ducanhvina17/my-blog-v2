
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function DocusaurusBlog() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const blogPath = location.pathname.replace('/blog', '');
  
  useEffect(() => {
    // In a real integration, this would load the specific Docusaurus blog content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [blogPath]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className="docusaurus-blog-wrapper">
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Blog Content</h2>
        <p className="mb-4">
          This is a placeholder for Docusaurus blog content. In a full implementation, 
          you would render the Docusaurus blog posts here for paths under <code>/blog</code>.
        </p>
        <p>
          Currently trying to access: <code>{blogPath || '/'}</code>
        </p>
        
        <div className="border rounded-lg p-6 mt-6 bg-card">
          <h3 className="font-bold mb-2">Recent Posts</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><a href="/blog/welcome-to-the-blog" className="text-primary hover:underline">Welcome to the Blog</a></li>
            {/* More blog posts would be listed here */}
          </ul>
        </div>
      </div>
    </div>
  );
}
