// import { getAuth } from "firebase/auth";
import { useUser } from "@clerk/nextjs";
import React from "react";

import MainCard from "@/components/cards/submissions/MainCard";
import SideCard from "@/components/cards/submissions/SideCard";
import { useProjectSubmissions } from "@/model";

import CardSkeleton from "../utils/CardSkeleton";

const AllProjects = () => {
  const { user } = useUser();
  const { projectSubmission, isLoading, isError } = useProjectSubmissions(
    user?.id
  );

  return (
    <div className="block gap-4 md:grid md:grid-flow-row-dense md:grid-cols-4 ">
      <div className="col-span-3">
        {isError && !isLoading && (
          <div className="flex items-center justify-center text-sm font-bold">
            Kindly Check Your Internet Connection!
          </div>
        )}
        {isLoading && (
          <div className="flex items-center justify-center">
            {isLoading && <CardSkeleton number={6} />}
          </div>
        )}
        {!isError && !isLoading && (
          <MainCard submissions={projectSubmission} path="Projects" />
        )}
      </div>
      <div className="sticky top-6 hidden py-5 md:block lg:block">
        <SideCard />
      </div>
    </div>
  );
};

export default AllProjects;
