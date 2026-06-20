"use client";

import React from "react";

const toolsData = [
  {
    name: "IntelliJ IDEA",
    iconClass: "devicon-intellij-plain colored",
  },
  {
    name: "PyCharm",
    iconClass: "devicon-pycharm-plain colored",
  },
  {
    name: "Postman",
    iconClass: "devicon-postman-plain colored",
  },
];

export default function ToolsTechnologies() {
  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-8 font-sans text-gray-800">
          Tools & Technologies
        </h2>

        {/* Center-aligned Flexbox container */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          {toolsData.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-xl p-6 w-36 h-36 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 ease-in-out cursor-default"
            >
              {/* Devicon Icon */}
              <div className="flex items-center justify-center h-16 w-16 mb-3">
                <i className={`${tool.iconClass} text-5xl md:text-6xl`}></i>
              </div>
              {/* Tool Name */}
              <span className="text-sm font-semibold text-gray-700 text-center font-sans tracking-wide">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
