import React from "react";

export default function MovieSkeletonLoader() {
  return (
    <div className="skeleton_container">
      <div className="skeleton_img"></div>
      <div className="skeleton_h4"></div>
      <div className="skeleton_p"></div>
    </div>
  );
}

// all the loader
export const MovieSkeletonLoaders = () => {
  return (
    <div className="skeleton_display">
      <MovieSkeletonLoader />
      <MovieSkeletonLoader />
      <MovieSkeletonLoader />
      <MovieSkeletonLoader />
      <MovieSkeletonLoader />
      <MovieSkeletonLoader />
      <MovieSkeletonLoader />
      <MovieSkeletonLoader />
      <MovieSkeletonLoader />
      <MovieSkeletonLoader />
      <MovieSkeletonLoader />
      <MovieSkeletonLoader />
    </div>
  );
};
