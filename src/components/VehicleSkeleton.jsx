import React from 'react';

export default function VehicleSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm animate-pulse flex flex-col h-full">
      {/* Image Skeleton */}
      <div className="h-52 bg-slate-200 w-full relative">
        <div className="absolute top-3 left-3 h-6 w-24 bg-slate-300 rounded-full" />
        <div className="absolute top-3 right-3 h-9 w-9 bg-slate-300 rounded-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-6 bg-slate-300 rounded w-1/3" />
          </div>
          <div className="h-6 bg-slate-300 rounded w-3/4 mb-4" />
          
          {/* Key specs grid skeleton */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-full" />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="h-4 bg-slate-200 rounded w-1/3" />
          <div className="h-10 bg-slate-300 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
}
