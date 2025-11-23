'use client';

import { useState, useRef } from 'react';

export default function Home() {
  const [text, setText] = useState('LOGO');
  const [shape, setShape] = useState<'circle' | 'square' | 'hexagon'>('circle');
  const [color1, setColor1] = useState('#6366f1');
  const [color2, setColor2] = useState('#ec4899');
  const [fontSize, setFontSize] = useState(32);
  const [showIcon, setShowIcon] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadSVG = () => {
    if (!canvasRef.current) return;

    const svg = canvasRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'logo.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getShapePath = () => {
    switch (shape) {
      case 'circle':
        return 'M 150 50 A 100 100 0 0 1 150 250 A 100 100 0 0 1 150 50';
      case 'square':
        return 'M 50 50 L 250 50 L 250 250 L 50 250 Z';
      case 'hexagon':
        return 'M 150 50 L 225 100 L 225 200 L 150 250 L 75 200 L 75 100 Z';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Preview */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-2xl font-bold text-white">Preview</h2>
            <div
              ref={canvasRef}
              className="bg-white rounded-2xl p-8 shadow-xl flex items-center justify-center"
              style={{ width: '400px', height: '400px' }}
            >
              <svg width="300" height="300" viewBox="0 0 300 300">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={color1} />
                    <stop offset="100%" stopColor={color2} />
                  </linearGradient>
                </defs>

                {showIcon && (
                  <path
                    d={getShapePath()}
                    fill="url(#gradient)"
                    className="drop-shadow-lg"
                  />
                )}

                <text
                  x="150"
                  y="165"
                  textAnchor="middle"
                  fontSize={fontSize}
                  fontWeight="bold"
                  fill={showIcon ? "white" : "url(#gradient)"}
                  className="select-none"
                >
                  {text}
                </text>
              </svg>
            </div>
            <button
              onClick={downloadSVG}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Download SVG
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Customize Your Logo</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Logo Text
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter text"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="20"
                  max="48"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center space-x-3 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showIcon}
                    onChange={(e) => setShowIcon(e.target.checked)}
                    className="w-5 h-5 rounded accent-indigo-500"
                  />
                  <span className="text-sm font-medium">Show Icon Background</span>
                </label>
              </div>

              {showIcon && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Shape
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['circle', 'square', 'hexagon'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setShape(s)}
                        className={`px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                          shape === s
                            ? 'bg-indigo-500 text-white'
                            : 'bg-white/20 text-white/70 hover:bg-white/30'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Gradient Start Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-white/30"
                  />
                  <input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Gradient End Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-white/30"
                  />
                  <input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
