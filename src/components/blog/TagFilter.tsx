
import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagClear: () => void;
}

export function TagFilter({ tags, selectedTags, onTagSelect, onTagClear }: TagFilterProps) {
  const [expanded, setExpanded] = useState(false);
  const displayLimit = 10;
  
  const displayTags = expanded ? tags : tags.slice(0, displayLimit);
  const hasMoreTags = tags.length > displayLimit;
  
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium">Filter by tag</h3>
        {selectedTags.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onTagClear}
            className="h-8 px-2 text-xs"
          >
            <X className="mr-1 h-3 w-3" />
            Clear filters
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          
          return (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary/50 hover:bg-primary/10"
              }`}
            >
              {isSelected && <Check className="mr-1 inline-block h-3 w-3" />}
              {tag}
            </button>
          );
        })}
        
        {hasMoreTags && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="h-7 px-2 text-xs"
          >
            {expanded ? "Show less" : `+${tags.length - displayLimit} more`}
          </Button>
        )}
      </div>
    </div>
  );
}
