import React from "react";

interface Props {
  title: string;
  description: string;
}

export const PageHeader: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="flex flex-col h-auto items-center w-full py-14 bg-slate-100 dark:bg-gray-800">
      <div className="w-full px-4 2xl:px-0 2xl:w-2/3 h-auto">
        <h1 className="text-xl font-bold mb-2 dark:text-white">{title}</h1>
        <p className="text-gray-600 dark:text-gray-200">{description}</p>
      </div>
    </div>
  );
};
