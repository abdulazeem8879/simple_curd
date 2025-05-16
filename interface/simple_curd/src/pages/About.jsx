import React from 'react';

const About = () => {
  return (
 <div className="w-60 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">MyApp</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link to="/about" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <Info size={20} />
          <span>About</span>
        </Link>

        <Link to="/settings" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default About;
