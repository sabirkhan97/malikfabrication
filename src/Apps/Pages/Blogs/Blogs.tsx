import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    title: 'Advanced Welding Techniques for Industrial Sheds',
    excerpt: 'Discover the latest MIG/TIG welding methods that ensure structural integrity and longevity for your fabrication projects.',
    image: 'https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/20221121072312-af4a8af7-1a31-4ff9-9289-f7c75564420b.jpg',
    date: '2024-10-15'
  },
  {
    title: 'Custom Grill Design Trends in Modern Architecture',
    excerpt: 'Explore contemporary grill and railing designs that combine security, aesthetics, and fabrication precision.',
    image: 'https://img500.exportersindia.com/product_images/bc-500/2023/10/12642786/ss-balcony-grill-1697288793-7131662.jpeg',
    date: '2024-10-10'
  },
  {
    title: 'Boundary Wall Fabrication: Materials & Best Practices',
    excerpt: 'Comprehensive guide to selecting steel grades and fabrication techniques for durable boundary solutions.',
    image: 'https://i.pinimg.com/236x/46/63/7e/46637e4388d60718a317c6480eca7aef.jpg',
    date: '2024-10-05'
  },
  {
    title: 'The Future of Metal Fabrication in Construction',
    excerpt: 'How automation and precision engineering are revolutionizing structural steel fabrication workflows.',
    image: 'https://cdn.thefabricator.com/a/the-talent-behind-a-successful-metal-fabricator-1582738639.jpg',
    date: '2024-09-28'
  },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600&display=swap');

  :root {
    --navy: #0f1f3d;
    --blue: #1a3a6b;
    --accent: #e85d04;
    --steel: #f4f6fa;
    --border: #dde3ef;
    --text: #1a1f2e;
    --muted: #6b7280;
    --white: #ffffff;
  }

  .bg-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .bg-root { font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--white); }
  .bg-root h1, .bg-root h2, .bg-root h3 { font-family: 'Barlow Condensed', sans-serif; }

  .bg-hero {
    min-height: 70vh; background: linear-gradient(135deg, var(--steel) 0%, #f8fafc 100%);
    display: flex; align-items: center; position: relative; overflow: hidden;
  }
  .bg-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(232,93,4,0.08) 0%, transparent 50%);
  }
  .bg-hero-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 80px 24px 60px; text-align: center; }
  .bg-hero-title { 
    font-size: clamp(42px, 5vw, 68px); font-weight: 800; color: var(--navy); 
    line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 16px; text-transform: uppercase;
  }
  .bg-hero-subtitle { font-size: 18px; color: var(--muted); max-width: 600px; margin: 0 auto 40px; line-height: 1.65; }

  .bg-section { padding: 100px 0; }
  .bg-section-steel { background: var(--steel); }
  .bg-section-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  
  .bg-tag { 
    font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; 
    color: var(--accent); margin-bottom: 16px; display: block;
  }
  .bg-title { 
    font-size: clamp(32px, 4vw, 52px); font-weight: 800; color: var(--navy); 
    text-transform: uppercase; line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 20px;
  }
  .bg-divider { width: 56px; height: 4px; background: var(--accent); border-radius: 2px; margin: 0 auto 60px; }

  .bg-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 32px; }
  .bg-card {
    background: var(--white); border-radius: 16px; overflow: hidden; 
    box-shadow: 0 8px 32px rgba(15,31,61,0.08); transition: all 0.3s ease;
  }
  .bg-card:hover {
    transform: translateY(-8px); box-shadow: 0 24px 64px rgba(15,31,61,0.15);
  }
  .bg-card-img { 
    height: 220px; width: 100%; object-fit: cover; transition: transform 0.4s ease;
  }
  .bg-card:hover .bg-card-img { transform: scale(1.05); }
  .bg-card-body { padding: 28px; }
  .bg-card-date { font-size: 12px; color: var(--muted); font-weight: 500; margin-bottom: 12px; }
  .bg-card-title { 
    font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; 
    color: var(--navy); margin-bottom: 12px; line-height: 1.3; 
  }
  .bg-card-excerpt { color: var(--muted); line-height: 1.65; margin-bottom: 20px; font-size: 14.5px; }
  .bg-read-more { 
    color: var(--accent); font-weight: 600; font-size: 14px; 
    display: inline-flex; align-items: center; gap: 6px;
  }
  .bg-read-more:hover { color: var(--accent-light); gap: 10px; }

  @media (max-width: 768px) {
    .bg-hero { min-height: 60vh; }
    .bg-section { padding: 70px 0; }
    .bg-grid { grid-template-columns: 1fr; gap: 24px; }
    .bg-hero-title { font-size: 36px; }
  }
`;

export default function Blogs() {
  return (
    <>
      <style>{CSS}</style>
      <div className="bg-root">
        {/* Hero */}
        <section className="bg-hero">
          <div className="bg-hero-inner">
            <h1 className="bg-hero-title">Fabrication Insights</h1>
            <p className="bg-hero-subtitle">
              Industry updates, technical guides, and fabrication best practices from Malik Fabrication experts.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="bg-section">
          <div className="bg-section-inner">
            <span className="bg-tag">Latest Articles</span>
            <h2 className="bg-title">Technical Blog</h2>
            <div className="bg-divider" />
            <div className="bg-grid">
              {blogs.map((blog, index) => (
                <article className="bg-card" key={index}>
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="bg-card-img"
                  />
                  <div className="bg-card-body">
                    <time className="bg-card-date">{blog.date}</time>
                    <h3 className="bg-card-title">{blog.title}</h3>
                    <p className="bg-card-excerpt">{blog.excerpt}</p>
                    <Link to="#" className="bg-read-more">
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

