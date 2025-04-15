
import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  fileName?: string;
}

export function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  highlightLines = [],
  fileName,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard",
      duration: 2000,
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const codeLines = code.split('\n');
  
  return (
    <div className="relative group rounded-md overflow-hidden">
      {fileName && (
        <div className="bg-muted px-4 py-1.5 text-xs font-mono text-muted-foreground border-b">
          {fileName}
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {isCopied ? (
          <CheckIcon className="h-4 w-4 text-primary" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
      </Button>
      <div className="overflow-x-auto bg-muted p-4">
        <pre className="text-sm">
          {codeLines.map((line, i) => (
            <div
              key={i}
              className={`${
                highlightLines.includes(i + 1)
                  ? "bg-primary/10 -mx-4 px-4"
                  : ""
              } ${
                showLineNumbers ? "pl-7 relative" : ""
              }`}
            >
              {showLineNumbers && (
                <span className="absolute left-0 text-muted-foreground text-xs w-5 text-right select-none">
                  {i + 1}
                </span>
              )}
              <code className="font-mono">{line || " "}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
