import { useState } from 'react';
import { Bot, CheckCircle, AlertTriangle, XCircle, FileText, Activity, Zap, Play, Info } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { scenarios, ShowcaseScenario } from './data/scenarios';

// Types matching the backend schema
interface Finding {
  type: string;
  detail: string;
}

interface HealthMetrics {
  cycleTime: number;
  tokenUsage: number;
  validationScore: number;
  confidence: number;
}

interface AnalysisResult {
  status: 'Approved' | 'Revise' | 'Reject';
  explanation: string;
  findings: Finding[];
  trace: string[];
  health: HealthMetrics;
}

function App() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<ShowcaseScenario | null>(null);

  const handleScenarioSelect = (scenario: ShowcaseScenario) => {
    setInput(scenario.input);
    setSelectedScenario(scenario);
    setResult(null);
    setError(null);
  };

  const analyzeWCP = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    // If the input doesn't match the selected scenario anymore, clear the selection
    if (selectedScenario && input !== selectedScenario.input) {
      setSelectedScenario(null);
    }

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze WCP');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Revise': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Reject': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-6 h-6" />;
      case 'Revise': return <AlertTriangle className="w-6 h-6" />;
      case 'Reject': return <XCircle className="w-6 h-6" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 font-sans selection:bg-primary/20">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex items-center space-x-4 border-b border-border pb-6">
          <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)]">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              WCP Compliance Agent
            </h1>
            <p className="text-muted-foreground mt-1 text-sm font-medium">
              AI-Powered Payroll Validation & Audit System
            </p>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <section className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-semibold mb-3 text-foreground/90 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Payroll Entry
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste WCP text here (e.g., 'Role: Electrician, Hours: 45, Wage: $55.00')..."
                className="w-full h-48 bg-muted/30 border border-input rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50"
              />
              
              <div className="mt-4">
                <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wider">
                  Load Scenario
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {scenarios.map((scenario, i) => (
                    <button
                      key={i}
                      onClick={() => handleScenarioSelect(scenario)}
                      className={cn(
                        "text-left text-xs px-3 py-2 rounded-md transition-all border border-border/50 hover:border-primary/30 flex items-center justify-between group",
                        selectedScenario?.name === scenario.name 
                          ? "bg-primary/10 border-primary/40 text-primary" 
                          : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                      )}
                    >
                      <span className="truncate mr-2">{scenario.name}</span>
                      <Play className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
                {selectedScenario && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     className="mt-3 text-xs text-muted-foreground bg-muted/20 p-2 rounded border border-border/30"
                   >
                     <div className="flex items-center gap-2 mb-1">
                       <Info className="w-3 h-3 text-primary" />
                       <span className="font-semibold text-foreground">Expected: {selectedScenario.expectedStatus}</span>
                     </div>
                     <p>{selectedScenario.description}</p>
                   </motion.div>
                )}
              </div>
            </div>

            <button
              onClick={analyzeWCP}
              disabled={isLoading || !input.trim()}
              className="w-full bg-primary text-primary-foreground h-12 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  Analyzing Compliance...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  Run Compliance Check
                </>
              )}
            </button>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg flex items-center gap-3 text-sm font-medium"
                >
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Results Section */}
          <section className="space-y-6">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Status Card */}
                  <div className={cn(
                    "border rounded-xl p-6 flex items-start gap-4 shadow-sm",
                    getStatusColor(result.status)
                  )}>
                    <div className="mt-1 p-1 bg-current/10 rounded-full">
                      {getStatusIcon(result.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold tracking-tight">{result.status}</h2>
                        {/* Validation against scenario */}
                        {selectedScenario && selectedScenario.input === input && (
                           <div className={cn(
                             "text-xs font-bold px-2 py-1 rounded uppercase tracking-wider border",
                             result.status === selectedScenario.expectedStatus
                               ? "bg-green-500/20 text-green-500 border-green-500/30"
                               : "bg-red-500/20 text-red-500 border-red-500/30"
                           )}>
                             {result.status === selectedScenario.expectedStatus ? "Test Passed" : "Test Failed"}
                           </div>
                        )}
                      </div>
                      <p className="mt-1 opacity-90 text-sm leading-relaxed font-medium">
                        {result.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Health Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <MetricCard 
                      label="Confidence" 
                      value={`${(result.health.confidence * 100).toFixed(0)}%`}
                      color="text-blue-400"
                    />
                    <MetricCard 
                      label="Validation" 
                      value={`${(result.health.validationScore * 100).toFixed(0)}%`}
                      color="text-purple-400"
                    />
                    <MetricCard 
                      label="Tokens" 
                      value={result.health.tokenUsage.toString()}
                      color="text-amber-400"
                    />
                    <MetricCard 
                      label="Latency" 
                      value={`${result.health.cycleTime}ms`}
                      color="text-emerald-400"
                    />
                  </div>

                  {/* Findings */}
                  {result.findings.length > 0 && (
                    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Detected Violations
                      </h3>
                      <div className="space-y-2">
                        {result.findings.map((finding, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm bg-muted/30 p-3 rounded-lg border border-border/50">
                            <span className="font-mono text-xs font-bold text-yellow-500 uppercase tracking-wider bg-yellow-500/10 px-2 py-0.5 rounded">
                              {finding.type}
                            </span>
                            <span className="text-muted-foreground">{finding.detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Audit Trace */}
                  <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      Audit Trace
                    </h3>
                    <div className="space-y-4 relative pl-2">
                      <div className="absolute left-2 top-2 bottom-2 w-px bg-border/50" />
                      {result.trace.map((step, i) => (
                        <div key={i} className="relative flex items-start gap-4">
                          <div className="absolute left-[-5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-background border-2 border-primary ring-4 ring-background" />
                          <div className="text-sm text-muted-foreground leading-relaxed">
                            {step}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-muted-foreground bg-card/30 border border-border/50 border-dashed rounded-xl p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Ready to Analyze</h3>
                  <p className="max-w-xs text-sm">
                    Select a scenario from the left or enter payroll details manually to check for compliance.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </main>
      </div>
      <Analytics />
    </div>
  );
}

function MetricCard({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
      <div className="text-xs text-muted-foreground font-medium mb-1">{label}</div>
      <div className={cn("text-lg font-bold font-mono", color)}>{value}</div>
    </div>
  );
}

export default App;
