import React from 'react';
import { FileX } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <FileX className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
      <p className="text-muted-foreground text-center">
        You haven't created any projects yet. Start by creating your first presentation.
      </p>
    </div>
  );
};