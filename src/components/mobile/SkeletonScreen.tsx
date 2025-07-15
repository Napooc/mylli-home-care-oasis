// Ultra-fast skeleton screens for mobile
import { cn } from "@/lib/utils";

interface SkeletonScreenProps {
  type?: 'card' | 'text' | 'hero' | 'service';
  className?: string;
}

export const SkeletonScreen = ({ type = 'card', className }: SkeletonScreenProps) => {
  const baseClasses = "animate-pulse bg-gray-200 rounded";
  
  switch (type) {
    case 'hero':
      return (
        <div className={cn("w-full h-screen flex flex-col justify-center items-center space-y-4", className)}>
          <div className={cn(baseClasses, "w-32 h-32 rounded-full")} />
          <div className={cn(baseClasses, "w-80 h-8")} />
          <div className={cn(baseClasses, "w-64 h-6")} />
          <div className={cn(baseClasses, "w-48 h-12 rounded-full")} />
        </div>
      );
    
    case 'service':
      return (
        <div className={cn("space-y-3", className)}>
          <div className={cn(baseClasses, "w-16 h-16 rounded-full")} />
          <div className={cn(baseClasses, "w-full h-6")} />
          <div className={cn(baseClasses, "w-3/4 h-4")} />
          <div className={cn(baseClasses, "w-1/2 h-4")} />
        </div>
      );
    
    case 'text':
      return (
        <div className={cn("space-y-2", className)}>
          <div className={cn(baseClasses, "w-full h-4")} />
          <div className={cn(baseClasses, "w-5/6 h-4")} />
          <div className={cn(baseClasses, "w-4/6 h-4")} />
        </div>
      );
    
    default:
      return (
        <div className={cn("space-y-4 p-4", className)}>
          <div className={cn(baseClasses, "w-full h-48")} />
          <div className={cn(baseClasses, "w-3/4 h-6")} />
          <div className={cn(baseClasses, "w-1/2 h-4")} />
        </div>
      );
  }
};