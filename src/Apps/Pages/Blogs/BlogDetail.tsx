import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  content: string;
}

const blogs: Blog[] = [
  {
    id: 0,
    title: 'Advanced Welding Techniques for Industrial Sheds',
    excerpt: 'Discover the latest MIG/TIG welding methods that ensure structural integrity and longevity for your fabrication projects.',
    image: '/Apps/Images/Roof-shed.jpg',
    date: '2024-10-15',
    author: 'Malik Fabrication Team',
    content: '<p>In industrial shed fabrication, welding quality determines 80% of structural longevity. This article explores advanced MIG (Metal Inert Gas) and TIG (Tungsten Inert Gas) techniques optimized for heavy steel structures.</p><h2>Why Advanced Welding Matters</h2><p>Industrial sheds face extreme weather, heavy loads, and vibration. Advanced pulsed MIG with 85% Ar/15% CO2 achieves deeper penetration (12-15mm) and 40% fewer defects.</p><table><thead><tr><th>Technique</th><th>Penetration</th><th>Speed</th><th>Best For</th></tr></thead><tbody><tr><td>Pulsed MIG</td><td>15mm</td><td>2.5m/min</td><td>Main framework</td></tr><tr><td>TIG</td><td>8mm</td><td>0.8m/min</td><td>Critical joints</td></tr><tr><td>Standard MIG</td><td>10mm</td><td>1.8m/min</td><td>Secondary members</td></tr></tbody></table><h2>Material Preparation</h2><ol><li><strong>Bevel edges</strong> 30-35° V-groove</li><li><strong>Preheat</strong> 150°C for thick plates</li><li><strong>Clean</strong> with acetone</li></ol><h2>Parameters</h2><ul><li><strong>Wire:</strong> ER70S-6 1.2mm</li><li><strong>Voltage:</strong> 26-28V</li><li><strong>Current:</strong> 280-320A</li><li><strong>Speed:</strong> 45-55 cm/min</li></ul><p>Lincoln Power Wave S500. AWS D1.1 certified with ultrasonic testing. Contact for weld qualification.</p>',


  },
  {
    id: 1,
    title: 'Custom Grill Design Trends in Modern Architecture',
    excerpt: 'Explore contemporary grill and railing designs that combine security, aesthetics, and fabrication precision.',
    image: '/Apps/Images/Grill.jpg',
    date: '2024-10-10',
    author: 'Design Team',
    content: '<p>2024 grill designs favor minimalist geometric patterns with 50x50mm square hollow sections.</p><h2>Top Patterns</h2><ol><li><strong>Hexagonal matrix:</strong> 60% open, laser-cut MS</li><li><strong>Vertical slats:</strong> 30mm spacing, RAL 7016 powder coat</li><li><strong>Perforated wave:</strong> 4mm thick, 55% ventilation</li><li><strong>Diamond lattice:</strong> 40x40mm mesh, galvanized</li><li><strong>Abstract organic:</strong> CNC plasma corten</li></ol><table><thead><tr><th>Application</th><th>Material</th><th>Finish</th><th>Thickness</th></tr></thead><tbody><tr><td>Residential</td><td>MS</td><td>Powder coat</td><td>2-3mm</td></tr><tr><td>Commercial</td><td>SS304</td><td>Mirror polish</td><td>3-4mm</td></tr><tr><td>Coastal</td><td>Galvanized</td><td>Hot dip paint</td><td>4mm</td></tr></tbody></table><h2>Fabrication</h2><p>Laser cutting, TIG welding, sandblasting, dual coat painting. 12mm bolts @600mm centers for 2.5kN/m² wind load.</p><p>120+ projects delivered, 98% on-time.</p>',

  },
  {
    id: 2,
    title: 'Boundary Wall Fabrication: Materials & Best Practices',
    excerpt: 'Comprehensive guide to selecting steel grades and fabrication techniques for durable boundary solutions.',
    image: '/Apps/Images/BoundaryWall.jpg',
    date: '2024-10-05',
    author: 'Engineering Dept.',
    content: '<p>Boundary walls must withstand earth pressure, wind loads, impact. Engineering for durability:</p><table><thead><tr><th>Grade</th><th>Yield</th><th>Corrosion</th><th>Cost</th><th>Use</th></tr></thead><tbody><tr><td>IS2062 B</td><td>250 MPa</td><td>Good</td><td>$$</td><td>General</td></tr><tr><td>S355JR</td><td>355 MPa</td><td>Better</td><td>$$$</td><td>Heavy</td></tr><tr><td>C45</td><td>380 MPa</td><td>Moderate</td><td>$$$</td><td>Impact</td></tr></tbody></table><h2>Foundation</h2><p>Panel 2.4m H, posts 2.4m c/c, 100x50x5mm C-channel, 450mm PCC M20 foundation.</p><h2>Panel</h2><p>32mm TMT verticals, 50x25x3mm RHS rails, E7018 welds, zinc primer + PU finish.</p><h2>Gates</h2><p>Slide 6m track, swing 4m hydraulic, automation ready.</p><p>Load tested to 3.2 kN/m² wind (IS875). Free structural drawings with quote.</p>',

  },
  {
    id: 3,
    title: 'The Future of Metal Fabrication in Construction',
    excerpt: 'How automation and precision engineering are revolutionizing structural steel fabrication workflows.',
    image: '/Apps/Images/Workers.jpg',
    date: '2024-09-28',
    author: 'Innovation Lead',
    content: '<p>CNC automation cuts fabrication time 65%. Tech transforming workshops:</p><h2>Workflow</h2><p>Traditional: Manual → Gas cut → Grind<br/>Future: 3D model → CNC plasma → Auto grind</p><h2>Technologies</h2><ol><li><strong>Hypertherm XPR170</strong> plasma (120A, 25mm cut)</li><li><strong>Trumpf TruLaser</strong> fiber (4kW, 0.2mm)</li><li><strong>SolidWorks + Tekla</strong></li><li><strong>ABB robotic</strong> welding (ISO tolerance)</li></ol><table><thead><tr><th>Investment</th><th>Saving</th><th>Payback</th></tr></thead><tbody><tr><td>CNC Plasma</td><td>₹12L</td><td>18 months</td></tr><tr><td>Fiber Laser</td><td>₹25L</td><td>24 months</td></tr><tr><td>Robot Welder</td><td>₹35L</td><td>30 months</td></tr></tbody></table><h2>Roadmap</h2><p><strong>Phase 1:</strong> CNC plasma (done)<br/><strong>Phase 2:</strong> Robotics Q1 2025<br/><strong>Phase 3:</strong> Digital twin Q3 2025</p><p>92% material use, 3x throughput, 98% accuracy.</p>',

  },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&display=swap');
  
  :root {
    --navy: #0f1f3d;
    --blue: #1a3a6b;
    --accent: #e85d04;
    --accent-light: #ff7b2c;
    --steel: #f4f6fa;
    --border: #dde3ef;
    --text: #1a1f2e;
    --muted: #6b7280;
    --white: #ffffff;
  }

  .bd-root { font-family: 'DM Sans', sans-serif; color: var(--text); line-height: 1.7; }
  .bd-root h1, .bd-root h2, .bd-root h3 { font-family: 'Barlow Condensed', sans-serif; }

  .bd-hero-img {
    height: 65vh; width: 100%; object-fit: cover; 
    border-radius: 0 0 24px 24px;
  }
  .bd-container { max-width: 900px; margin: 0 auto; padding: 0 24px; }
  .bd-header { padding: 80px 0 40px; text-align: center; }
  .bd-meta { display: flex; gap: 24px; align-items: center; justify-content: center; color: var(--muted); font-size: 14px; font-weight: 500; margin-bottom: 24px; }
  .bd-meta svg { width: 16px; height: 16px; stroke-width: 2.5; }
  .bd-title { 
    font-size: clamp(38px, 6vw, 64px); font-weight: 800; 
    color: var(--navy); line-height: 1.15; margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
  .bd-author { font-weight: 600; color: var(--accent); }
  
  .bd-content { padding: 60px 0 80px; }
  .bd-content h2 { font-size: 28px; margin: 48px 0 24px; color: var(--navy); }
  .bd-content h3 { font-size: 22px; margin: 36px 0 20px; color: var(--blue); }
  .bd-content p { font-size: 17px; margin-bottom: 24px; color: var(--text); }
  .bd-content strong { color: var(--navy); }
  .bd-content table { 
    width: 100%; border-collapse: collapse; margin: 32px 0; 
    font-size: 15px; background: var(--white); 
    border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  }
  .bd-content th, .bd-content td { 
    padding: 16px 20px; text-align: left; border-bottom: 1px solid var(--border);
  }
  .bd-content th { background: var(--steel); font-weight: 600; color: var(--navy); }
  .bd-content tr:hover { background: #fff8f4; }
  .bd-content pre { 
    background: #1e1e1e; color: #e6edf3; padding: 24px; 
    border-radius: 12px; font-family: 'Fira Code', monospace; 
    font-size: 14px; overflow-x: auto; margin: 24px 0;
  }
  .bd-content blockquote {
    background: rgba(232,93,4,0.08); border-left: 4px solid var(--accent);
    padding: 24px 32px; margin: 36px 0; font-style: italic; color: var(--navy);
  }
  
  .bd-back { 
    display: inline-flex; align-items: center; gap: 8px; 
    color: var(--blue); font-weight: 600; font-size: 15px;
    padding: 12px 0; margin-bottom: 40px; text-decoration: none;
  }
  .bd-back:hover { color: var(--accent); gap: 12px; }

  @media (max-width: 768px) {
    .bd-container { padding: 0 20px; }
    .bd-meta { flex-direction: column; gap: 12px; }
    .bd-title { font-size: 32px; }
    .bd-content table { font-size: 14px; }
    .bd-content th, .bd-content td { padding: 12px 12px; }
  }
`;

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const blogId = id ? parseInt(id) : 0;
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) {
    return (
      <div style={{padding: '100px 24px', textAlign: 'center'}}>
        <h1 style={{fontSize: '48px', color: '#666'}}>Blog Not Found</h1>
        <Link to="/blogs" style={{color: '#e85d04', fontSize: '18px', fontWeight: 600}}>← Back to Blogs</Link>
      </div>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="bd-root">
        <img src={blog.image} alt={blog.title} className="bd-hero-img" />
        
        <div className="bd-container">
          <Link to="/blogs" className="bd-back">
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>
          
          <header className="bd-header">
            <div className="bd-meta">
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <Calendar />
                {blog.date}
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <User />
                <span className="bd-author">{blog.author}</span>
              </div>
            </div>
            <h1 className="bd-title">{blog.title}</h1>
          </header>
          
          <article className="bd-content" 
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </div>
      </div>
    </>
  );
}

