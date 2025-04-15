
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import { Command, File, Home, Info, LucideIcon, Search, Settings, User } from "lucide-react";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CommandOption {
  name: string;
  icon: LucideIcon;
  action: () => void;
  keywords?: string;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const navigate = useNavigate();
  
  const navigationOptions: CommandOption[] = [
    {
      name: "Home",
      icon: Home,
      action: () => navigate("/"),
      keywords: "homepage start landing",
    },
    {
      name: "Blog",
      icon: File,
      action: () => navigate("/blog"),
      keywords: "posts articles writings",
    },
    {
      name: "Projects",
      icon: Command,
      action: () => navigate("/projects"),
      keywords: "work portfolio showcase",
    },
    {
      name: "About",
      icon: User,
      action: () => navigate("/about"),
      keywords: "me bio information personal",
    },
  ];

  const actionOptions: CommandOption[] = [
    {
      name: "Search",
      icon: Search,
      action: () => navigate("/blog?search=true"),
      keywords: "find look query",
    },
    {
      name: "Settings",
      icon: Settings,
      action: () => alert("Settings not implemented yet"),
      keywords: "preferences configuration theme",
    },
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          {navigationOptions.map((option) => (
            <CommandItem
              key={option.name}
              onSelect={() => {
                option.action();
                onOpenChange(false);
              }}
            >
              <option.icon className="mr-2 h-4 w-4" />
              {option.name}
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Actions">
          {actionOptions.map((option) => (
            <CommandItem
              key={option.name}
              onSelect={() => {
                option.action();
                onOpenChange(false);
              }}
            >
              <option.icon className="mr-2 h-4 w-4" />
              {option.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
