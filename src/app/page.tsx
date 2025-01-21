// 'use client';

// import { useState } from 'react';
// import { cn } from "@/lib/utils"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Loader2, MapPin } from 'lucide-react';

// interface ComparisonResult {
//   match: boolean;
//   confidence: number;
//   explanation: string;
// }

// export default function AddressComparisonApp() {
//   const [address1, setAddress1] = useState('');
//   const [address2, setAddress2] = useState('');
//   const [result, setResult] = useState<ComparisonResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleCompare = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch('/api/compare-addresses', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ address1, address2 }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to compare addresses');
//       }

//       const data = await response.json();
//       setResult(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
//       <div className="mx-auto max-w-2xl">
//         <Card className="border-slate-200/50 shadow-xl">
//           <CardHeader>
//             <div className="flex items-center space-x-2">
//               <MapPin className="h-6 w-6 text-slate-600" />
//               <CardTitle className="text-2xl font-bold">Address Comparison</CardTitle>
//             </div>
//             <CardDescription className="text-slate-600">
//               Compare two addresses to check if they refer to the same location
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent className="space-y-6">
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="address1" className="text-sm font-semibold">First Address</Label>
//                 <Textarea
//                   id="address1"
//                   placeholder="e.g., 123 Main Street, Suite 100, New York, NY 10001"
//                   value={address1}
//                   onChange={(e) => setAddress1(e.target.value)}
//                   className={cn(
//                     "resize-none h-24",
//                     "placeholder:text-slate-400",
//                     "focus-visible:ring-slate-400"
//                   )}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="address2" className="text-sm font-semibold">Second Address</Label>
//                 <Textarea
//                   id="address2"
//                   placeholder="e.g., 123 Main St., #100, New York, New York 10001"
//                   value={address2}
//                   onChange={(e) => setAddress2(e.target.value)}
//                   className={cn(
//                     "resize-none h-24",
//                     "placeholder:text-slate-400",
//                     "focus-visible:ring-slate-400"
//                   )}
//                 />
//               </div>

//               <Button
//                 onClick={handleCompare}
//                 disabled={loading || !address1 || !address2}
//                 className={cn(
//                   "w-full",
//                   "bg-slate-900 hover:bg-slate-800",
//                   "transition-all duration-200"
//                 )}
//               >
//                 {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 {loading ? 'Comparing Addresses...' : 'Compare Addresses'}
//               </Button>
//             </div>

//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             {result && (
//               <Card className="border-slate-200/50">
//                 <CardContent className="pt-6 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">Match Status</span>
//                     <span className={cn(
//                       "px-3 py-1 rounded-full text-sm font-medium",
//                       result.match 
//                         ? "bg-green-100 text-green-700" 
//                         : "bg-red-100 text-red-700"
//                     )}>
//                       {result.match ? 'Matched' : 'Not Matched'}
//                     </span>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span className="font-medium">Confidence Score</span>
//                       <span className="text-sm text-slate-600 font-medium">
//                         {(result.confidence * 100).toFixed(1)}%
//                       </span>
//                     </div>
//                     <div className="w-full bg-slate-100 rounded-full h-2">
//                       <div 
//                         className={cn(
//                           "bg-slate-700 h-2 rounded-full",
//                           "transition-all duration-500"
//                         )}
//                         style={{ width: `${result.confidence * 100}%` }}
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-1">
//                     <span className="font-medium">Analysis</span>
//                     <p className="text-sm text-slate-600 leading-relaxed">
//                       {result.explanation}
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </CardContent>
          
//           <CardFooter className="text-xs text-slate-500">
//             Powered by Gemini AI
//           </CardFooter>
//         </Card>
//       </div>
//     </main>
//   );
// }
'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, MapPin } from 'lucide-react';

interface ComparisonResult {
  match: boolean;
  confidence: number;
  explanation: string;
}

export default function AddressComparisonApp() {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCompare = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/compare-addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address1, address2 }),
      });

      if (!response.ok) {
        throw new Error('Failed to compare addresses');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="border-slate-200/50 shadow-xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-slate-600" />
              <CardTitle className="text-2xl font-bold">Address Comparison</CardTitle>
            </div>
            <CardDescription className="text-slate-600">
              Compare two addresses to check if they refer to the same location
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address1" className="text-sm font-semibold">First Address</Label>
                <Textarea
                  id="address1"
                  placeholder="e.g., 123 Main Street, Suite 100, New York, NY 10001"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className={cn(
                    "resize-none h-24",
                    "placeholder:text-slate-400",
                    "focus-visible:ring-slate-400"
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address2" className="text-sm font-semibold">Second Address</Label>
                <Textarea
                  id="address2"
                  placeholder="e.g., 123 Main St., #100, New York, New York 10001"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className={cn(
                    "resize-none h-24",
                    "placeholder:text-slate-400",
                    "focus-visible:ring-slate-400"
                  )}
                />
              </div>

              <Button
                onClick={handleCompare}
                disabled={loading || !address1 || !address2}
                className={cn(
                  "w-full",
                  "bg-slate-900 hover:bg-slate-800",
                  "transition-all duration-200"
                )}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Comparing Addresses...' : 'Compare Addresses'}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <Card className="border-slate-200/50">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Match Status</span>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      result.match 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    )}>
                      {result.match ? 'Matched' : 'Not Matched'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Confidence Score</span>
                      <span className="text-sm text-slate-600 font-medium">
                        {(result.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className={cn(
                          "bg-slate-700 h-2 rounded-full",
                          "transition-all duration-500"
                        )}
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-medium">Analysis</span>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>

          <CardFooter className="text-xs text-slate-500">
            Powered by Gemini AI
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
