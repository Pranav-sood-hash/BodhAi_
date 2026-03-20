import { useState } from 'react';
import { Send, Code, Zap } from 'lucide-react';

interface CodeExplanation {
  lineByLine: string[];
  suggestions: string[];
}

const DEFAULT_CODE = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;

export default function CodeHelper() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = () => {
    if (!code.trim()) return;

    setLoading(true);

    // Simulate AI code analysis
    setTimeout(() => {
      const mockExplanation: CodeExplanation = {
        lineByLine: [
          'Line 1: Define a function called "fibonacci" that takes parameter "n"',
          'Line 2: Base case - if n is 0 or 1, return n immediately',
          'Line 3: Recursive case - return the sum of fibonacci(n-1) and fibonacci(n-2)',
          'Line 4: Close the function definition',
        ],
        suggestions: [
          '⚡ Performance: This recursive approach has exponential time complexity. Consider using memoization or iterative approach for better performance.',
          '💡 Optimization: For large numbers, the iterative approach would be more efficient.',
          '📝 Documentation: Add JSDoc comments to document parameters and return types.',
          '✅ Type Safety: Consider using TypeScript for type checking.',
        ],
      };

      setExplanation(mockExplanation);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Code Input */}
      <div className="space-y-3">
        <label htmlFor="code" className="block text-sm font-medium text-slate-300">
          Paste Your Code
        </label>
        <textarea
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 font-mono text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 smooth-transition resize-vertical h-48"
          placeholder="Paste your code here..."
        />
      </div>

      {/* Explain Button */}
      <button
        onClick={handleExplain}
        disabled={loading || !code.trim()}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg smooth-transition neon-glow"
      >
        <Send className="w-4 h-4" />
        {loading ? 'Analyzing Code...' : 'Explain Code'}
      </button>

      {/* Explanation Output */}
      {explanation && (
        <div className="space-y-4">
          {/* Line by Line */}
          <div className="glass-dark rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-cyan-400" />
              <h3 className="font-semibold text-slate-100">Line-by-Line Breakdown</h3>
            </div>
            <div className="space-y-3">
              {explanation.lineByLine.map((line, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-3 bg-slate-800/50 rounded border border-slate-700/30"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-900">{idx + 1}</span>
                  </div>
                  <p className="text-slate-300 text-sm flex-1">{line}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="glass-dark rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-slate-100">Suggestions & Tips</h3>
            </div>
            <div className="space-y-3">
              {explanation.suggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-slate-300 text-sm"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-800/70 smooth-transition text-sm font-medium">
              Copy Code
            </button>
            <button
              onClick={() => {
                setCode(DEFAULT_CODE);
                setExplanation(null);
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-500/50 text-purple-300 hover:from-purple-600/50 hover:to-pink-600/50 smooth-transition text-sm font-medium"
            >
              Clear & Reset
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!explanation && !loading && (
        <div className="glass-dark rounded-lg p-12 text-center space-y-3 border-dashed border-2 border-slate-700/50">
          <Code className="w-12 h-12 text-slate-500 mx-auto opacity-50" />
          <p className="text-slate-400">Paste code to get detailed explanations</p>
          <p className="text-sm text-slate-500">Understand logic, learn best practices, and get optimization tips</p>
        </div>
      )}
    </div>
  );
}
