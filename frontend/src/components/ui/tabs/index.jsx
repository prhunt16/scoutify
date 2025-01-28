"use client"

import React, { useState } from 'react';

const Tabs = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ className, children, activeTab, setActiveTab }) => {
  return (
    <div className={className}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsTrigger = ({ value, children, activeTab, setActiveTab, className }) => {
  return (
    <button
      className={`${className} ${activeTab === value ? 'bg-white text-gray-950' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, activeTab }) => {
  if (value !== activeTab) return null;
  return children;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };